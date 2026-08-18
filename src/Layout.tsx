import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/mission", label: "Mission", end: false },
  { to: "/programs", label: "Programs", end: false },
  { to: "/assist", label: "Briefing desk", end: false },
  { to: "/resources", label: "Resources", end: false },
  { to: "/volunteer", label: "Volunteer", end: false },
  { to: "/donate", label: "Donate", end: false },
  { to: "/contact", label: "Contact", end: false },
];

export default function Layout() {
  return (
    <div className="site">
      <a className="skip" href="#main">
        Skip to main content
      </a>

      <header className="plate" aria-label="Collective Vet identification plate">
        <span className="plate-holes" aria-hidden="true" />
        <div className="plate-body">
          <p className="plate-meta">
            <span>SVC / CV-001</span>
            <span>US · VETERANS</span>
          </p>
          <div className="plate-title-row">
            <h1 className="plate-title">COLLECTIVE VET</h1>
            <p className="plate-sub">Nonprofit · by veterans, for the ones still coming home</p>
          </div>
        </div>
        <nav className="plate-nav" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? "is-active" : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <div className="deck">
        <aside className="rail" aria-hidden="true">
          <span>FOR THOSE WHO SERVED</span>
        </aside>

        <main id="main" tabIndex={-1}>
          <Outlet />
        </main>
      </div>

      <footer className="site-foot">
        <p>Collective Vet · 501(c)(3) pending · veterans nonprofit</p>
        <p>If you are in crisis, call or text 988, then press 1.</p>
      </footer>
    </div>
  );
}
