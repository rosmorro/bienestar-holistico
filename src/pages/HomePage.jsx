import Navbar from "../components/Navbar";

function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero">
          <p className="eyebrow">
            Bienestar Holístico · Colores para el Corazón
          </p>

          <h1>
            Seguimos creando
            <br />
            desde el corazón.
          </h1>

          <p className="hero-text">
            Hemos decidido bajar un poco el ritmo para dedicar tiempo a crear
            nuevos libros, recursos emocionales y experiencias de bienestar
            para niños, jóvenes y adultos.
          </p>

          <div className="hero-buttons">
            <a
              href="https://wa.me/50689327806"
              className="btn primary"
              target="_blank"
              rel="noreferrer"
            >
              Contactar por WhatsApp
            </a>

            <a href="#proyectos" className="btn secondary">
              Conocer los proyectos
            </a>
          </div>
        </section>

        <section id="proyectos" className="projects-section">
          <p className="eyebrow">Actualmente estamos trabajando en</p>

          <h2>Nuevos recursos para acompañarte</h2>

          <div className="projects-grid">
            <article className="project-card">
              <span>📖</span>
              <h3>365 Días de Ejercicios Sistémicos</h3>
              <p>
                Una colección de ejercicios para mirar tu historia, fortalecer
                tus vínculos y avanzar con mayor conciencia.
              </p>
            </article>

            <article className="project-card">
              <span>🌳</span>
              <h3>Bosque del Corazón</h3>
              <p>
                Libros y actividades para acompañar el desarrollo emocional de
                niños y familias.
              </p>
            </article>

            <article className="project-card">
              <span>💜</span>
              <h3>Descubriendo Mi Interior</h3>
              <p>
                Recursos para adolescentes que buscan comprender sus emociones
                y fortalecer su mundo interior.
              </p>
            </article>
          </div>

          <p className="coming-message">
            Muy pronto compartiremos nuevos contenidos, libros y recursos.
          </p>
        </section>

        <section id="contacto" className="contact-section">
          <p className="eyebrow">Seguimos cerca de ti</p>

          <h2>Bienestar Holístico continúa creciendo</h2>

          <p>
            Gracias por acompañarnos durante este proceso de creación.
            Seguimos trabajando con amor, intención y propósito.
          </p>

          <a
            href="https://wa.me/50689327806"
            className="btn primary"
            target="_blank"
            rel="noreferrer"
          >
            Escribir por WhatsApp
          </a>
        </section>
      </main>
    </>
  );
}

export default HomePage;