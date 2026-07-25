function Navbar() {
  return (
    <header className="navbar">
      <a href="#" className="brand">
        <span className="brand-icon">♡</span>

        <span>
          Bienestar Holístico
          <small>365 Días de Sanación Sistémica</small>
        </span>
      </a>

      <nav className="nav-links">
        <a href="#libros">Libros</a>
        <a href="#muestras-gratis">Muestras gratis</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#contacto">Contacto</a>
      </nav>

      <a
        href="https://wa.me/50689327806"
        className="nav-button"
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
    </header>
  );
}

export default Navbar;