import Navbar from "../components/Navbar";

import portadaLibro1 from "../assets/Images/portadalibro1.png";
import portadaLibro2 from "../assets/Images/portadalibro2.png";
import portadaLibro3 from "../assets/Images/portadalibro3.png";
import heroBienestar from "../assets/Images/hero-bienestar.png";
import muestraGratisPersonajes from "../assets/Images/muestragratispersonajes.png";

const whatsappNumber = "50689327806";

const books = [
  {
    id: 1,
    title: "Donde Todo Comienza",
    subtitle: "Sanando desde las raíces, elevando las alas.",
    description:
      "Una invitación a mirar tu historia personal y familiar, reconocer tus raíces y comprender los patrones que han influido en tu vida.",
    image: portadaLibro1,
    sample: "/muestras/Libro1.pdf",
  },
  {
    id: 2,
    title: "Aprender a Sostenerte",
    subtitle: "Encontrando fuerza y apoyo interno.",
    description:
      "Ejercicios para reconocer tus necesidades, fortalecer tus recursos emocionales y aprender a acompañarte con mayor amor y seguridad.",
    image: portadaLibro2,
    sample: "/muestras/Libro2.pdf",
  },
  {
    id: 3,
    title: "Soltar lo que Cargas",
    subtitle: "Liberando culpas y cargas del pasado.",
    description:
      "Un recorrido para identificar responsabilidades y cargas emocionales que ya no necesitas seguir sosteniendo.",
    image: portadaLibro3,
    sample: "/muestras/Libro3.pdf",
  },
];

const offerings = [
  {
    icon: "📖",
    title: "Libros",
    text: "Colecciones y ejercicios para acompañarte paso a paso en tu crecimiento personal.",
  },
  {
    icon: "🎁",
    title: "Recursos gratuitos",
    text: "Muestras, ejercicios y herramientas prácticas que puedes comenzar a utilizar hoy.",
  },
  {
    icon: "🌳",
    title: "Bosque del Corazón",
    text: "Actividades y recursos para acompañar el bienestar emocional de niños y familias.",
  },
  {
    icon: "💜",
    title: "Descubriendo Mi Interior",
    text: "Herramientas para adolescentes que desean comprender y fortalecer su mundo emocional.",
  },
  {
    icon: "✨",
    title: "Constelaciones familiares",
    text: "Una mirada sistémica para comprender vínculos, historias y patrones familiares.",
  },
  {
    icon: "🤖",
    title: "Orientación con Isis",
    text: "Nuestro asistente puede ayudarte a explorar los recursos disponibles y saber por dónde comenzar.",
  },
];

function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <section id="inicio" className="home-hero">
          <div className="home-hero-content">
            <p className="eyebrow">Bienestar Holístico · Rosa Mora</p>

            <h1>
              La transformación comienza cuando decides mirarte con amor.
            </h1>

            <p className="home-hero-intro">
              Creo en el poder de comprender nuestra historia, soltar aquello
              que ya no necesitamos y construir una vida con mayor paz,
              conciencia y propósito.
            </p>

            <p className="home-hero-about">
              Soy <strong>Rosa Mora</strong>, autora y creadora de Bienestar
              Holístico. Aquí encontrarás libros, ejercicios, recursos
              emocionales y experiencias diseñadas para acompañarte en tu
              camino de transformación personal y familiar.
            </p>

            <div className="hero-buttons">
              <a href="#ofrecemos" className="btn primary">
                Explorar el espacio
              </a>

              <a href="#libros" className="btn secondary">
                Conocer los libros
              </a>
            </div>

            <div className="hero-highlights">
              <span>♡ Crecimiento personal</span>
              <span>🌿 Bienestar emocional</span>
              <span>✨ Sanación sistémica</span>
            </div>
          </div>

          <div className="home-hero-visual">
            <img
              src={heroBienestar}
              alt="Mujer disfrutando un momento de calma, lectura y conexión personal"
            />

            <div className="hero-quote">
              <span>“</span>
              Sanando desde las raíces, elevando las alas.
            </div>
          </div>
        </section>

        <section id="ofrecemos" className="offerings-section">
          <div className="section-heading">
            <p className="eyebrow">Un espacio creado para acompañarte</p>

            <h2>Lo que encontrarás en Bienestar Holístico</h2>

            <p>
              Diferentes caminos y herramientas para cuidar tus emociones,
              comprender tu historia y avanzar a tu propio ritmo.
            </p>
          </div>

          <div className="offerings-grid">
            {offerings.map((offering) => (
              <article className="offering-card" key={offering.title}>
                <span className="offering-icon">{offering.icon}</span>
                <h3>{offering.title}</h3>
                <p>{offering.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="purpose-section">
          <div className="purpose-visual">
            <div className="purpose-symbol">♡</div>
          </div>

          <div className="purpose-content">
            <p className="eyebrow">Mi propósito</p>

            <h2>
              Acompañarte a recordar tu valor y elegir una vida más consciente.
            </h2>

            <p>
              No se trata de convertirte en alguien diferente. Se trata de
              comprenderte, escucharte y comenzar a soltar las cargas que te
              impiden vivir con mayor libertad.
            </p>

            <div className="purpose-values">
              <span>Transformación cotidiana</span>
              <span>Conexión contigo</span>
              <span>Herramientas prácticas</span>
              <span>Acompañamiento con amor</span>
            </div>
          </div>
        </section>

        <section id="libros" className="books-section">
          <div className="section-heading">
            <p className="eyebrow">Colección disponible</p>

            <h2>365 Días de Sanación Sistémica</h2>

            <p>
              Tres libros para comprender tus raíces, aprender a sostenerte y
              comenzar a soltar aquello que ya no necesitas cargar.
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
                    <span>Libro digital</span>
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
            <p className="eyebrow">Comienza sin costo</p>

            <h2>Lee los primeros 3 días de cada libro</h2>

            <p>
              Explora gratuitamente el enfoque y la dinámica de cada libro
              antes de decidir cuál puede acompañarte mejor.
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
                    Abrir muestra
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="bosque-del-corazon-gratis"
          className="free-resource-section"
        >
          <div className="free-resource-card">
            <div className="free-resource-content">
              <p className="eyebrow">
                Recurso gratuito para niños y familias
              </p>

              <span className="free-resource-badge">
                Mini libro gratuito
              </span>

              <h2>Conoce a mis amigos del Bosque del Corazón</h2>

              <p>
                Descubre a los personajes del Bosque del Corazón y conoce cómo
                cada uno acompaña a los niños a comprender y expresar sus
                emociones.
              </p>

              <p>
                Un recurso creado con amor para compartir en familia y comenzar
                a conversar sobre el mundo emocional de una forma cercana,
                creativa y sencilla.
              </p>

              <div className="free-resource-actions">
                <a
                  href="/muestras/ConoceMisAmigosBosquedelCorazon.pdf"
                  className="btn primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Leer mini libro gratis
                </a>

                <a
                  href="/muestras/ConoceMisAmigosBosquedelCorazon.pdf"
                  className="btn secondary"
                  download
                >
                  Descargar PDF
                </a>
              </div>
            </div>

            <div className="free-resource-visual">
              <a
                href="/muestras/ConoceMisAmigosBosquedelCorazon.pdf"
                target="_blank"
                rel="noreferrer"
                aria-label="Abrir el mini libro gratuito del Bosque del Corazón"
              >
                <img
                  src={muestraGratisPersonajes}
                  alt="Mini libro gratuito Conoce a mis amigos del Bosque del Corazón"
                  className="free-resource-image"
                />
              </a>
            </div>
          </div>
        </section>

        <section id="contacto" className="contact-section">
          <p className="eyebrow">Estamos para acompañarte</p>

          <h2>¿No sabes por dónde comenzar?</h2>

          <p>
            Puedes conversar con Lumi, nuestro asistente, o escribirnos por
            WhatsApp para conocer cuál recurso puede ser más adecuado para ti.
          </p>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              "Hola, quisiera orientación para saber con cuál recurso comenzar."
            )}`}
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