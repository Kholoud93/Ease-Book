import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import Seo from "@/components/Seo";
import DoctorCard from "@/components/DoctorCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cities, doctors, specialties } from "@/data/doctors";

const Search = () => {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const specialty = params.get("specialty") || "";
  const city = params.get("city") || "";

  const setParam = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    if (v) next.set(k, v); else next.delete(k);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return doctors.filter((d) => {
      if (specialty && d.specialty !== specialty) return false;
      if (city && d.city !== city) return false;
      if (term && !`${d.name} ${d.specialty} ${d.clinic} ${d.tags.join(" ")}`.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [q, specialty, city]);

  return (
    <PageShell>
      <Seo
        title="Find a doctor — BookEase"
        description="Search vetted specialists by name, specialty or city and book in seconds."
        canonical="/search"
      />

      <section className="bg-gradient-warm border-b border-border/60">
        <div className="container py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Discover</p>
          <h1 className="font-display text-5xl md:text-6xl mt-3 max-w-2xl">A quiet directory of trusted specialists.</h1>

          <div className="mt-10 flex flex-col md:flex-row gap-3 max-w-3xl">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => { setQ(e.target.value); setParam("q", e.target.value); }}
                placeholder="Search by name, specialty, or clinic"
                className="h-12 pl-11 rounded-full border-border bg-background"
              />
            </div>
            <Button size="lg" className="h-12 rounded-full px-8">Search</Button>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
            <SlidersHorizontal className="h-3 w-3" /> Filter
          </span>
          <FilterPill label="All specialties" active={!specialty} onClick={() => setParam("specialty", "")} />
          {specialties.map((s) => (
            <FilterPill key={s} label={s} active={specialty === s} onClick={() => setParam("specialty", s)} />
          ))}
          <span className="mx-2 h-4 w-px bg-border" />
          <FilterPill label="All cities" active={!city} onClick={() => setParam("city", "")} />
          {cities.map((c) => (
            <FilterPill key={c} label={c} active={city === c} onClick={() => setParam("city", c)} />
          ))}
        </div>

        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-2xl">{results.length} specialists</h2>
        </div>

        {results.length === 0 ? (
          <div className="py-24 text-center text-muted-foreground">No matches. Try adjusting your filters.</div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {results.map((d, i) => <DoctorCard key={d.id} doctor={d} index={i} />)}
          </div>
        )}
      </section>
    </PageShell>
  );
};

const FilterPill = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`rounded-full border px-4 py-1.5 text-sm transition ${
      active ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
    }`}
  >
    {label}
  </button>
);

export default Search;