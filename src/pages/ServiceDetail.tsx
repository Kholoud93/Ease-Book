import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addDays, format, isSameDay } from "date-fns";
import { ArrowLeft, ArrowUpRight, Award, Globe2, Heart, MapPin, Star } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { getDoctor } from "@/data/doctors";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

const SLOTS = ["09:00", "10:30", "11:15", "13:45", "15:00", "16:30", "17:45"];

const ServiceDetail = () => {
  const { id = "" } = useParams();
  const doctor = getDoctor(id);
  const navigate = useNavigate();
  const { isFavorite, toggle } = useFavorites();
  const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [slot, setSlot] = useState<string>("10:30");

  const jsonLd = useMemo(
    () =>
      doctor && {
        "@context": "https://schema.org",
        "@type": "Physician",
        name: doctor.name,
        medicalSpecialty: doctor.specialty,
        address: { "@type": "PostalAddress", addressLocality: doctor.city },
        aggregateRating: { "@type": "AggregateRating", ratingValue: doctor.rating, reviewCount: doctor.reviews },
      },
    [doctor]
  );

  if (!doctor) {
    return (
      <PageShell>
        <div className="container py-32 text-center">
          <h1 className="font-display text-4xl">Specialist not found</h1>
          <Link to="/search" className="story-link mt-6 inline-block">Return to search</Link>
        </div>
      </PageShell>
    );
  }

  const fav = isFavorite(doctor.id);

  const proceed = () => {
    if (!date || !slot) return;
    const params = new URLSearchParams({ date: date.toISOString(), time: slot });
    navigate(`/service/${doctor.id}/checkout?${params.toString()}`);
  };

  return (
    <PageShell>
      <Seo
        title={`${doctor.name} — ${doctor.specialty} | BookEase`}
        description={`Book ${doctor.name}, ${doctor.specialty} in ${doctor.city}. ${doctor.bio}`}
        canonical={`/service/${doctor.id}`}
        jsonLd={jsonLd as Record<string, unknown>}
      />

      <div className="container pt-10">
        <Link to="/search" className="inline-flex items-center gap-2 text-sm text-muted-foreground story-link">
          <ArrowLeft className="h-3 w-3" /> All specialists
        </Link>
      </div>

      <section className="container grid gap-12 lg:grid-cols-12 pt-10 pb-20">
        <div className="lg:col-span-5 animate-fade-in-up">
          <div className="relative overflow-hidden rounded-sm shadow-elegant">
            <img src={doctor.image} alt={doctor.name} className="w-full aspect-[4/5] object-cover" />
            <button
              onClick={() => toggle(doctor.id)}
              aria-label="Toggle favorite"
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:scale-110 transition"
            >
              <Heart className={cn("h-4 w-4", fav ? "fill-accent text-accent" : "text-foreground")} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 animate-fade-in-up [animation-delay:120ms]">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{doctor.specialty}</p>
          <h1 className="font-display text-5xl md:text-6xl mt-3">{doctor.name}</h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{doctor.clinic}, {doctor.city}</span>
            <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-accent text-accent" />{doctor.rating} · {doctor.reviews} reviews</span>
            <span className="inline-flex items-center gap-1.5"><Award className="h-3.5 w-3.5" />{doctor.experience} years</span>
            <span className="inline-flex items-center gap-1.5"><Globe2 className="h-3.5 w-3.5" />{doctor.languages.join(", ")}</span>
          </div>

          <p className="mt-8 text-lg leading-relaxed text-foreground/80 max-w-2xl">{doctor.bio}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {doctor.tags.map((t) => (
              <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs">{t}</span>
            ))}
          </div>

          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Education</div>
              <ul className="space-y-1 text-sm">
                {doctor.education.map((e) => <li key={e}>· {e}</li>)}
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Visit fee</div>
              <div className="font-display text-3xl">€{doctor.price}<span className="text-sm text-muted-foreground font-sans"> / consult</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="bg-secondary/40 border-y border-border/60">
        <div className="container py-20 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Calendar</p>
            <h2 className="font-display text-4xl mt-3">Choose a moment.</h2>
            <p className="mt-4 text-muted-foreground max-w-md">Available windows are revealed in real time. Pick a date, then a time that suits the rhythm of your day.</p>

            <div className="mt-8 inline-block rounded-sm border border-border bg-card shadow-soft">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                className={cn("p-3 pointer-events-auto")}
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-sm bg-card border border-border p-8 shadow-soft">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-2xl">
                  {date ? format(date, "EEEE, MMMM d") : "Select a date"}
                </h3>
                {date && isSameDay(date, new Date()) && <span className="text-xs uppercase tracking-widest text-accent">Today</span>}
              </div>

              <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-3">
                {SLOTS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSlot(s)}
                    className={cn(
                      "rounded-sm border px-4 py-3 text-sm transition",
                      slot === s
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-primary"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Total</div>
                  <div className="font-display text-3xl">€{doctor.price}</div>
                </div>
                <Button size="lg" className="rounded-full px-8 h-12" onClick={proceed} disabled={!date || !slot}>
                  Continue to checkout <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default ServiceDetail;