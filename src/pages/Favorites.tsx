import { Link } from "react-router-dom";
import PageShell from "@/components/layout/PageShell";
import Seo from "@/components/Seo";
import DoctorCard from "@/components/DoctorCard";
import { Button } from "@/components/ui/button";
import { doctors } from "@/data/doctors";
import { useFavorites } from "@/hooks/useFavorites";

const Favorites = () => {
  const { favorites } = useFavorites();
  const list = doctors.filter((d) => favorites.includes(d.id));

  return (
    <PageShell>
      <Seo title="Saved specialists — BookEase" description="Your shortlist of trusted doctors." canonical="/favorites" />

      <section className="bg-gradient-warm border-b border-border/60">
        <div className="container py-20">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Saved</p>
          <h1 className="font-display text-5xl md:text-6xl mt-3">Your shortlist.</h1>
          <p className="mt-4 text-muted-foreground max-w-xl">A quiet collection of specialists you'd like to return to.</p>
        </div>
      </section>

      <section className="container py-16">
        {list.length === 0 ? (
          <div className="border border-dashed border-border rounded-sm py-24 text-center">
            <p className="text-muted-foreground">No favorites yet. Tap the heart on any specialist to save them here.</p>
            <Button asChild className="mt-6 rounded-full">
              <Link to="/search">Discover specialists</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {list.map((d, i) => <DoctorCard key={d.id} doctor={d} index={i} />)}
          </div>
        )}
      </section>
    </PageShell>
  );
};

export default Favorites;