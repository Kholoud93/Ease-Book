import { Link } from "react-router-dom";
import { format, isFuture } from "date-fns";
import { CalendarX, ChevronRight } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { useBookings, type Booking } from "@/hooks/useBookings";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const { bookings, cancel } = useBookings();
  const upcoming = bookings.filter((b) => b.status === "confirmed" && isFuture(new Date(b.date)));
  const past = bookings.filter((b) => !(b.status === "confirmed" && isFuture(new Date(b.date))));

  return (
    <PageShell>
      <Seo title="My bookings — BookEase" description="Manage your upcoming and past appointments." canonical="/dashboard" />

      <section className="bg-gradient-warm border-b border-border/60">
        <div className="container py-20">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Your dashboard</p>
          <h1 className="font-display text-5xl md:text-6xl mt-3">A calm overview.</h1>
          <p className="mt-4 text-muted-foreground max-w-xl">Every appointment, gently arranged. Cancel up to 24 hours before with no fee.</p>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            <Stat n={upcoming.length} k="Upcoming" />
            <Stat n={past.filter((b) => b.status !== "cancelled").length} k="Completed" />
            <Stat n={past.filter((b) => b.status === "cancelled").length} k="Cancelled" />
          </div>
        </div>
      </section>

      <section className="container py-16">
        <h2 className="font-display text-3xl mb-8">Upcoming</h2>
        {upcoming.length === 0 ? (
          <Empty />
        ) : (
          <div className="space-y-4">
            {upcoming.map((b, i) => <BookingRow key={b.id} b={b} index={i} onCancel={() => cancel(b.id)} />)}
          </div>
        )}

        {past.length > 0 && (
          <>
            <h2 className="font-display text-3xl mt-20 mb-8">History</h2>
            <div className="space-y-4">
              {past.map((b, i) => <BookingRow key={b.id} b={b} index={i} muted />)}
            </div>
          </>
        )}
      </section>
    </PageShell>
  );
};

const Stat = ({ n, k }: { n: number; k: string }) => (
  <div>
    <div className="font-display text-4xl">{n}</div>
    <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{k}</div>
  </div>
);

const Empty = () => (
  <div className="border border-dashed border-border rounded-sm py-16 text-center">
    <p className="text-muted-foreground">No appointments yet.</p>
    <Button asChild className="mt-6 rounded-full">
      <Link to="/search">Find a doctor</Link>
    </Button>
  </div>
);

const BookingRow = ({ b, index, onCancel, muted }: { b: Booking; index: number; onCancel?: () => void; muted?: boolean }) => (
  <div
    className={cn(
      "group flex items-center gap-6 rounded-sm border border-border bg-card p-5 transition hover:shadow-soft animate-fade-in-up",
      muted && "opacity-70"
    )}
    style={{ animationDelay: `${index * 60}ms` }}
  >
    <div className="flex flex-col items-center w-16 shrink-0 border-r border-border pr-4">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{format(new Date(b.date), "MMM")}</span>
      <span className="font-display text-3xl">{format(new Date(b.date), "d")}</span>
      <span className="text-xs text-muted-foreground">{b.time}</span>
    </div>
    <div className="flex-1">
      <div className="font-display text-xl">{b.doctorName}</div>
      <div className="text-sm text-muted-foreground">{b.specialty} · {b.patient}</div>
    </div>
    <div className="text-right">
      <div className="font-medium">€{b.price}</div>
      <div className={cn(
        "text-[10px] uppercase tracking-widest mt-1",
        b.status === "confirmed" && "text-accent",
        b.status === "cancelled" && "text-destructive",
        b.status === "completed" && "text-muted-foreground"
      )}>{b.status}</div>
    </div>
    <div className="flex items-center gap-2">
      {onCancel && b.status === "confirmed" && (
        <Button variant="ghost" size="icon" onClick={onCancel} aria-label="Cancel">
          <CalendarX className="h-4 w-4" />
        </Button>
      )}
      <Link to={`/service/${b.doctorId}`} className="text-muted-foreground hover:text-foreground">
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  </div>
);

export default Dashboard;