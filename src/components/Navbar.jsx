const whatsappNumber = "50689327806";

function Navbar() {
  return (
    <header className="navbar">
      <a href="#inicio" className="brand" aria-label="Ir al inicio">
        <span className="brand-icon">♡</span>

        <span className="brand-text">
          <strong>Bienestar Holístico</strong>
          <small>Sanando desde las raíces, elevando las alas</small>
        </span>
      </a>

      <nav className="nav-links" aria-label="Navegación principal">
        <a href="#inicio">Inicio</a>
        <a href="#ofrecemos">Qué ofrecemos</a>
        <a href="#libros">Libros</a>
        <a href="#bosque-del-corazon">Bosque del Corazón</a>
        <a href="#recursos-gratuitos">Recursos gratis</a>
        <a href="#comunidad-bienestar">Comunidad</a>
        <a href="#contacto">Contacto</a>
      </nav>

      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          "Hola, quisiera conocer más sobre los recursos de Bienestar Holístico."
        )}`}
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