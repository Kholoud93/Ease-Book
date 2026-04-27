import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, CalendarCheck, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import DoctorCard from "@/components/DoctorCard";
import { doctors, specialties } from "@/data/doctors";
import heroImg from "@/assets/hero-clinic.jpg";

const Index = () => {
  const navigate = useNavigate();
  const featured = doctors.slice(0, 3);

  return (
    <PageShell>
      <Seo
        title="BookEase — Book trusted doctors with elegance"
        description="A refined booking platform to discover vetted specialists and confirm appointments in seconds."
        canonical="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "BookEase",
          url: "/",
          potentialAction: {
            "@type": "SearchAction",
            target: "/search?q={query}",
            "query-input": "required name=query",
          },
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-warm">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16 py-20 md:py-28 lg:py-32">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-border/80 bg-background/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground animate-fade-in">
              <Sparkles className="h-3 w-3 text-accent" />
              A quieter way to book care
            </div>
            <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] text-balance animate-fade-in-up">
              Considered care, <em className="text-primary/80">confirmed</em> in seconds.
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed animate-fade-in-up [animation-delay:120ms]">
              BookEase is an editorially curated platform of vetted doctors. Browse profiles, choose a moment that suits you, and step into a clinic that already feels familiar.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-in-up [animation-delay:240ms]">
              <Button size="lg" onClick={() => navigate("/search")} className="rounded-full px-8 h-12">
                Find a doctor <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
              <Link to="/dashboard" className="story-link text-sm">View my bookings</Link>
            </div>

            <dl className="mt-16 grid grid-cols-3 gap-6 max-w-md animate-fade-in [animation-delay:360ms]">
              {[
                { k: "Specialists", v: "120+" },
                { k: "Cities", v: "24" },
                { k: "Avg. rating", v: "4.9" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="font-display text-3xl">{s.v}</dt>
                  <dd className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.k}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-6 relative animate-scale-in [animation-delay:200ms]">
            <div className="relative rounded-sm overflow-hidden shadow-elegant">
              <img
                src={heroImg}
                alt="Serene clinic interior with emerald velvet chair and marble desk"
                width={1600}
                height={1200}
                className="w-full h-[520px] md:h-[640px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -left-6 hidden md:block bg-card border border-border/60 rounded-sm p-5 shadow-soft animate-float w-64">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CalendarCheck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">Tomorrow, 10:30</div>
                  <div className="text-xs text-muted-foreground">Dr. Laurent · Cardiology</div>
                </div>
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-widest text-accent">Confirmed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties strip */}
      <section className="border-y border-border/60 bg-card">
        <div className="container py-10 flex flex-wrap items-center justify-between gap-6">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Browse by specialty</span>
          <div className="flex flex-wrap gap-2">
            {specialties.map((s) => (
              <button
                key={s}
                onClick={() => navigate(`/search?specialty=${encodeURIComponent(s)}`)}
                className="rounded-full border border-border px-4 py-1.5 text-sm transition hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured doctors */}
      <section className="container py-24 md:py-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">The atelier</p>
            <h2 className="font-display text-4xl md:text-5xl max-w-2xl">Specialists, hand-selected.</h2>
          </div>
          <Link to="/search" className="story-link text-sm hidden md:inline">View all</Link>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((d, i) => (
            <DoctorCard key={d.id} doctor={d} index={i} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-24 md:py-32">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-foreground/60">The ritual</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3 max-w-2xl">Three quiet steps to a confirmed appointment.</h2>

          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {[
              { icon: Stethoscope, n: "01", t: "Discover", d: "Browse vetted profiles, read patient notes, and shortlist specialists who feel right." },
              { icon: CalendarCheck, n: "02", t: "Choose a moment", d: "An interactive calendar reveals available windows. Pick the one that fits your day." },
              { icon: ShieldCheck, n: "03", t: "Confirm with care", d: "A frictionless checkout, a calm confirmation, and gentle reminders before your visit." },
            ].map(({ icon: Icon, n, t, d }, i) => (
              <div key={n} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-center gap-4">
                  <span className="font-display text-3xl text-accent">{n}</span>
                  <div className="h-px flex-1 bg-primary-foreground/20" />
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-3xl mt-6">{t}</h3>
                <p className="mt-3 text-primary-foreground/70 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-24 md:py-32 text-center">
        <h2 className="font-display text-4xl md:text-6xl max-w-3xl mx-auto text-balance">
          Care, the way it should have always felt.
        </h2>
        <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
          Begin with a single search. Your next appointment is a few unhurried clicks away.
        </p>
        <Button size="lg" onClick={() => navigate("/search")} className="mt-10 rounded-full px-10 h-12">
          Start your search
        </Button>
      </section>
    </PageShell>
  );
};

export default Index;
