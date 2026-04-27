import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="mt-32 border-t border-border/60 bg-secondary/40">
    <div className="container py-16 grid gap-12 md:grid-cols-4">
      <div className="md:col-span-2 max-w-sm">
        <div className="font-display text-3xl">BookEase</div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          A quietly considered booking experience. We curate vetted specialists and craft a calm path from search to confirmation.
        </p>
      </div>
      <div className="text-sm">
        <div className="mb-4 font-medium">Platform</div>
        <ul className="space-y-2 text-muted-foreground">
          <li><Link className="story-link" to="/search">Find a doctor</Link></li>
          <li><Link className="story-link" to="/favorites">Saved specialists</Link></li>
          <li><Link className="story-link" to="/dashboard">My bookings</Link></li>
        </ul>
      </div>
      <div className="text-sm">
        <div className="mb-4 font-medium">Company</div>
        <ul className="space-y-2 text-muted-foreground">
          <li>About</li>
          <li>Editorial</li>
          <li>Press</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border/60">
      <div className="container flex flex-col md:flex-row items-center justify-between py-6 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} BookEase Platform. Crafted with care.</span>
        <span className="font-display italic">Calm, considered, confirmed.</span>
      </div>
    </div>
  </footer>
);

export default Footer;