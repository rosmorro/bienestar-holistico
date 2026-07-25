function Navbar() {
  return (
    <header className="navbar">
      <a href="#" className="brand">
        <span className="brand-icon">♡</span>

        <span>
          Bienestar Holístico
          <small>Colores para el Corazón</small>
        </span>
      </a>

      <nav className="nav-links">
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