import { Link } from "react-router-dom";
import { Heart, MapPin, Star } from "lucide-react";
import type { Doctor } from "@/data/doctors";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

const DoctorCard = ({ doctor, index = 0 }: { doctor: Doctor; index?: number }) => {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(doctor.id);

  return (
    <article
      className="group relative animate-fade-in-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Link to={`/service/${doctor.id}`} className="block">
        <div className="relative overflow-hidden rounded-sm bg-muted aspect-[4/5]">
          <img
            src={doctor.image}
            alt={`${doctor.name}, ${doctor.specialty}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-background/80">{doctor.specialty}</p>
            <h3 className="font-display text-2xl text-background mt-1">{doctor.name}</h3>
          </div>
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          toggle(doctor.id);
        }}
        aria-label={fav ? "Remove from favorites" : "Add to favorites"}
        className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur transition hover:scale-110"
      >
        <Heart className={cn("h-4 w-4 transition", fav ? "fill-accent text-accent" : "text-foreground")} />
      </button>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{doctor.clinic}, {doctor.city}</span>
          </div>
          <div className="mt-1.5 flex items-center gap-1 text-xs">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span className="font-medium">{doctor.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">· {doctor.reviews} reviews</span>
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-xl">€{doctor.price}</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">per visit</div>
        </div>
      </div>
    </article>
  );
};

export default DoctorCard;