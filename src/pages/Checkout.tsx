import { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, CheckCircle2, CreditCard, Lock, ShieldCheck } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDoctor } from "@/data/doctors";
import { useBookings } from "@/hooks/useBookings";
import { toast } from "sonner";

const Checkout = () => {
  const { id = "" } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const doctor = getDoctor(id);
  const { add } = useBookings();

  const dateISO = params.get("date") || new Date().toISOString();
  const time = params.get("time") || "10:30";
  const date = new Date(dateISO);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [done, setDone] = useState(false);

  if (!doctor) {
    return (
      <PageShell>
        <div className="container py-32 text-center">
          <h1 className="font-display text-4xl">Specialist not found</h1>
        </div>
      </PageShell>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Please complete your details.");
      return;
    }
    add({
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date: date.toISOString(),
      time,
      patient: name,
      price: doctor.price,
    });
    setDone(true);
    toast.success("Appointment confirmed.");
  };

  if (done) {
    return (
      <PageShell>
        <Seo title="Confirmed — BookEase" description="Your appointment is confirmed." />
        <section className="container py-32 text-center max-w-xl">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center animate-scale-in">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-5xl mt-8 animate-fade-in-up">Confirmed.</h1>
          <p className="mt-4 text-muted-foreground animate-fade-in-up [animation-delay:120ms]">
            A gentle reminder will be sent before your visit with {doctor.name} on {format(date, "EEEE, MMMM d")} at {time}.
          </p>
          <div className="mt-10 flex justify-center gap-4 animate-fade-in-up [animation-delay:240ms]">
            <Button onClick={() => navigate("/dashboard")} size="lg" className="rounded-full px-8">View my bookings</Button>
            <Button onClick={() => navigate("/search")} variant="outline" size="lg" className="rounded-full px-8">Browse more</Button>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Seo title={`Checkout — ${doctor.name} | BookEase`} description="Confirm your appointment." />

      <div className="container pt-10">
        <Link to={`/service/${doctor.id}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground story-link">
          <ArrowLeft className="h-3 w-3" /> Back to specialist
        </Link>
      </div>

      <section className="container grid lg:grid-cols-12 gap-12 py-16">
        <form onSubmit={submit} className="lg:col-span-7 space-y-10 animate-fade-in-up">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Step 01</p>
            <h1 className="font-display text-5xl mt-3">Your details</h1>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="h-12 bg-card" placeholder="Amelia Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 bg-card" placeholder="amelia@email.com" />
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Step 02</p>
            <h2 className="font-display text-3xl mt-3">Payment</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card">Card number</Label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="card" value={card} onChange={(e) => setCard(e.target.value)} className="h-12 pl-11 bg-card" placeholder="4242 4242 4242 4242" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input className="h-12 bg-card" placeholder="MM / YY" />
              <Input className="h-12 bg-card" placeholder="CVC" />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" />
            Encrypted, never stored. Demo only.
          </div>

          <Button type="submit" size="lg" className="rounded-full px-10 h-12 w-full md:w-auto">
            Confirm appointment · €{doctor.price}
          </Button>
        </form>

        <aside className="lg:col-span-5 animate-fade-in-up [animation-delay:120ms]">
          <div className="sticky top-24 rounded-sm border border-border bg-card p-8 shadow-soft">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Summary</p>
            <div className="mt-6 flex items-center gap-4">
              <img src={doctor.image} alt={doctor.name} className="h-16 w-16 rounded-sm object-cover" />
              <div>
                <div className="font-display text-xl">{doctor.name}</div>
                <div className="text-sm text-muted-foreground">{doctor.specialty} · {doctor.city}</div>
              </div>
            </div>

            <dl className="mt-8 space-y-3 text-sm">
              <Row k="Date" v={format(date, "EEEE, MMMM d, yyyy")} />
              <Row k="Time" v={time} />
              <Row k="Clinic" v={doctor.clinic} />
              <Row k="Duration" v="30 min" />
            </dl>

            <div className="border-t border-border mt-6 pt-6 space-y-2 text-sm">
              <Row k="Consultation" v={`€${doctor.price}`} />
              <Row k="Booking fee" v="Included" />
            </div>
            <div className="border-t border-border mt-6 pt-6 flex items-end justify-between">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Total</span>
              <span className="font-display text-3xl">€{doctor.price}</span>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3 w-3 text-primary" /> Free cancellation up to 24h before.
            </div>
          </div>
        </aside>
      </section>
    </PageShell>
  );
};

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex items-center justify-between">
    <dt className="text-muted-foreground">{k}</dt>
    <dd>{v}</dd>
  </div>
);

export default Checkout;