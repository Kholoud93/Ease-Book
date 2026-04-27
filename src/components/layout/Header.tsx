import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart, LayoutGrid, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";

const Header = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-baseline gap-1">
          <span className="font-display text-2xl tracking-tight">BookEase</span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <NavLink to="/search" className={({ isActive }) => `story-link transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            Find a doctor
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => `story-link transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            My bookings
          </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => `story-link transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            Saved
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/search")} aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate("/favorites")} aria-label="Favorites" className="relative">
            <Heart className="h-4 w-4" />
            {favorites.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-foreground">
                {favorites.length}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")} aria-label="Dashboard">
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;