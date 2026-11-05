export function Header() {
  return (
    <header className="topbar">
      <a href="/" className="brand">
        <span>
          SC2Builder
          <span className="brand-sub">STARCRAFT II · CODEX</span>
        </span>
      </a>

      <nav className="primary-nav" aria-label="Navigation principale">
        <a href="/unites">Unités</a>
        <a href="/batiments">Bâtiments</a>
        <a href="/capacites">Capacités</a>
      </nav>

      <div className="topbar-end">
        <span className="live-dot" />
        ARCHIVES DU SECTEUR
        <span className="version">01.00</span>
      </div>
    </header>
  );
}
