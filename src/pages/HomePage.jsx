import Navbar from "../components/Navbar";

import portadaLibro1 from "../assets/Images/portadalibro1.png";
import portadaLibro2 from "../assets/Images/portadalibro2.png";
import portadaLibro3 from "../assets/Images/portadalibro3.png";

const whatsappNumber = "50689327806";

const books = [
  {
    id: 1,
    title: "Donde Todo Comienza",
    subtitle: "Sanando desde las raíces, elevando las alas.",
    description:
      "Este primer libro te invita a mirar tu historia personal y familiar con mayor conciencia. A través de ejercicios sistémicos y reflexiones guiadas, podrás reconocer tus raíces, comprender patrones y comenzar un proceso de transformación desde el origen.",
    image: portadaLibro1,
    sample: "/muestras/Libro1.pdf",
  },
  {
    id: 2,
    title: "Aprender a Sostenerte",
    subtitle: "Encontrando fuerza y apoyo interno.",
    description:
      "Este libro acompaña el proceso de construir seguridad interior. Sus ejercicios están pensados para ayudarte a reconocer tus necesidades, fortalecer tu autoestima y desarrollar recursos emocionales para sostenerte con mayor confianza y amor propio.",
    image: portadaLibro2,
    sample: "/muestras/Libro2.pdf",
  },
  {
    id: 3,
    title: "Soltar lo que Cargas",
    subtitle: "Liberando culpas y cargas del pasado.",
    description:
      "Una invitación a identificar responsabilidades, culpas y cargas emocionales que quizá has llevado por mucho tiempo. Este libro te acompaña a mirar lo que no te corresponde y comenzar a soltarlo con respeto, comprensión y conciencia.",
    image: portadaLibro3,
    sample: "/muestras/Libro3.pdf",
  },
];

function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero">
          <div>
            <p className="eyebrow">
              Bienestar Holístico · 365 Días de Sanación Sistémica
            </p>

            <h1>
              Un ejercicio al día
              <br />
              puede transformar tu historia.
            </h1>

            <p className="hero-text">
              Descubre una colección creada para acompañarte en un proceso de
              autoconocimiento, sanación y crecimiento personal, a tu propio
              ritmo y desde el corazón.
            </p>

            <div className="hero-buttons">
              <a href="#libros" className="btn primary">
                Conocer los libros
              </a>

              <a href="#muestras-gratis" className="btn secondary">
                Leer muestras gratuitas
              </a>
            </div>
          </div>
        </section>

        <section id="libros" className="books-section">
          <div className="section-heading">
            <p className="eyebrow">Colección disponible</p>

            <h2>365 Días de Sanación Sistémica</h2>

            <p>
              Tres libros para acompañarte en diferentes momentos de tu camino:
              comprender tus raíces, aprender a sostenerte y soltar aquello que
              ya no necesitas seguir cargando.
            </p>
          </div>

          <div className="books-grid">
            {books.map((book) => (
              <article className="book-card" key={book.id}>
                <div className="book-cover-wrapper">
                  <img
                    src={book.image}
                    alt={`Portada del libro ${book.title}`}
                    className="book-cover"
                  />
                </div>

                <div className="book-content">
                  <p className="book-number">Libro {book.id}</p>

                  <h3>{book.title}</h3>

                  <p className="book-subtitle">{book.subtitle}</p>

                  <p className="book-description">{book.description}</p>

                  <div className="book-price">
                    <span>Precio</span>
                    <strong>USD $5</strong>
                  </div>

                  <div className="book-actions">
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        `Hola, me interesa comprar el Libro ${book.id}: ${book.title}.`
                      )}`}
                      className="btn primary"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Comprar por WhatsApp
                    </a>

                    <a
                      href={book.sample}
                      className="btn secondary"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Leer 3 días gratis
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="muestras-gratis" className="samples-section">
          <div className="section-heading">
            <p className="eyebrow">Comienza gratuitamente</p>

            <h2>Lee los primeros 3 días de cada libro</h2>

            <p>
              Conoce el enfoque de cada libro antes de comprarlo. Puedes abrir
              gratuitamente los primeros tres días de cada uno, sin registro y
              directamente desde tu navegador.
            </p>
          </div>

          <div className="samples-grid">
            {books.map((book) => (
              <article className="sample-card" key={`sample-${book.id}`}>
                <img
                  src={book.image}
                  alt={`Muestra gratuita de ${book.title}`}
                  className="sample-cover"
                />

                <div className="sample-content">
                  <span className="free-badge">3 días gratis</span>

                  <h3>{book.title}</h3>

                  <p>{book.subtitle}</p>

                  <a
                    href={book.sample}
                    className="btn primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Abrir muestra gratuita
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="samples-note">
            Las muestras son gratuitas y sirven para que conozcas el estilo,
            profundidad y dinámica de cada libro. El valor de cada libro
            completo es de USD $5.
          </p>
        </section>

        <section id="proyectos" className="projects-section">
          <p className="eyebrow">También estamos creando</p>

          <h2>Nuevos recursos para acompañarte</h2>

          <div className="projects-grid">
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

            <article className="project-card">
              <span>✨</span>
              <h3>Recursos digitales</h3>
              <p>
                Nuevas guías, ejercicios y experiencias para acompañarte en tu
                proceso de bienestar y crecimiento personal.
              </p>
            </article>
          </div>

          <p className="coming-message">
            Muy pronto compartiremos nuevos contenidos, libros y recursos.
          </p>
        </section>

        <section id="contacto" className="contact-section">
          <p className="eyebrow">Estamos para acompañarte</p>

          <h2>¿No sabes con cuál libro comenzar?</h2>

          <p>
            Escríbenos por WhatsApp y te ayudaremos a identificar cuál libro
            puede acompañarte mejor en este momento de tu proceso.
          </p>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              "Hola, quisiera orientación para saber con cuál libro comenzar."
            )}`}
            className="btn primary"
            target="_blank"
            rel="noreferrer"
          >
            Recibir orientación
          </a>
        </section>
      </main>
    </>
  );
}

export default HomePage;