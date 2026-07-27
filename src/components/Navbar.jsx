function Navbar() {
  return (
    <header className="navbar">
      <a href="#inicio" className="brand">
        <span className="brand-icon">♡</span>

        <span className="brand-text">
          <strong>Bienestar Holístico</strong>
          <small>Sanando desde las raíces, elevando las alas</small>
        </span>
      </a>

      <nav className="nav-links">
  <a href="#inicio">Inicio</a>
  <a href="#ofrecemos">Qué ofrecemos</a>
  <a href="#libros">Libros</a>
  <a href="#muestras-gratis">Recursos gratis</a>
  <a href="#comunidad-bienestar">Comunidad</a>
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