import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import portadaLibro1 from "../assets/Images/portadalibro1.png";
import portadaLibro2 from "../assets/Images/portadalibro2.png";
import portadaLibro3 from "../assets/Images/portadalibro3.png";
import heroBienestar from "../assets/Images/hero-bienestar.png";
import muestraGratisPersonajes from "../assets/Images/portada-conoce-amigos-bosque.png";
import portadaColoresPaz from "../assets/Images/portada-colores-paz-interior.png";
import portadaMiPrimerViaje from "../assets/Images/portada-mi-primer-viaje-bosque.png";

const whatsappNumber = "50689327806";

const freeFriendsBookUrl =
  "/muestras/ConoceMisAmigosBosquedelCorazon.pdf";

const peaceColorsUrl =
  "/muestras/Colores_de_Paz_Interior.pdf";

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
  const [pageVisitCount, setPageVisitCount] = useState(null);
  const [downloadCounts, setDownloadCounts] = useState({
    amigosBosque: null,
    coloresPaz: null,
  });
  const [downloadingResource, setDownloadingResource] = useState(null);
  const [newsletterStatus, setNewsletterStatus] = useState("");
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] =
    useState(false);

  useEffect(() => {
    const registerPageVisit = async () => {
      try {
        const today = new Date().toISOString().slice(0, 10);
        const lastCountedDate = localStorage.getItem(
          "bienestar-home-last-counted-date"
        );

        const response = await fetch("/api/page-view-count", {
          method: lastCountedDate === today ? "GET" : "POST",
        });

        if (!response.ok) {
          throw new Error("No se pudo consultar el contador de visitas.");
        }

        const data = await response.json();
        setPageVisitCount(typeof data.count === "number" ? data.count : 0);

        if (lastCountedDate !== today) {
          localStorage.setItem(
            "bienestar-home-last-counted-date",
            today
          );
        }
      } catch (error) {
        console.error("Error al registrar la visita:", error);
        setPageVisitCount(null);
      }
    };

    const loadDownloadCounts = async () => {
      const resources = ["amigosBosque", "coloresPaz"];

      try {
        const results = await Promise.all(
          resources.map(async (resourceId) => {
            const response = await fetch(
              `/api/download-count?resource=${encodeURIComponent(resourceId)}`
            );

            if (!response.ok) {
              throw new Error(
                `No se pudo consultar el contador de ${resourceId}.`
              );
            }

            const data = await response.json();

            return [
              resourceId,
              typeof data.count === "number" ? data.count : 0,
            ];
          })
        );

        setDownloadCounts(Object.fromEntries(results));
      } catch (error) {
        console.error("Error al consultar las descargas:", error);

        setDownloadCounts({
          amigosBosque: null,
          coloresPaz: null,
        });
      }
    };

    registerPageVisit();
    loadDownloadCounts();
  }, []);

  const openIsis = () => {
    if (window.botpress?.open) {
      window.botpress.open();
      return;
    }

    alert(
      "Isis todavía se está cargando. Espera unos segundos y vuelve a intentarlo."
    );
  };

  const handleFreeResourceDownload = async (
    resourceId,
    fileUrl,
    fileName
  ) => {
    if (downloadingResource) {
      return;
    }

    setDownloadingResource(resourceId);

    try {
      const response = await fetch(
        `/api/download-count?resource=${encodeURIComponent(resourceId)}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo actualizar el contador.");
      }

      const data = await response.json();

      setDownloadCounts((currentCounts) => ({
        ...currentCounts,
        [resourceId]:
          typeof data.count === "number"
            ? data.count
            : currentCounts[resourceId],
      }));
    } catch (error) {
      console.error("Error al registrar la descarga:", error);
    } finally {
      const link = document.createElement("a");

      link.href = fileUrl;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      link.remove();

      setDownloadingResource(null);
    }
  };

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();

    if (isNewsletterSubmitting) {
      return;
    }

    setIsNewsletterSubmitting(true);
    setNewsletterStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
      });

      if (!response.ok) {
        throw new Error("No se pudo registrar el correo.");
      }

      form.reset();

      setNewsletterStatus(
        "¡Gracias! Ya formas parte de la Comunidad Bienestar Holístico. Te avisaremos cuando publiquemos un nuevo recurso."
      );
    } catch (error) {
      console.error("Error al registrar el correo:", error);

      setNewsletterStatus(
        "No pudimos registrar tu correo en este momento. Inténtalo nuevamente."
      );
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

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

            <p className="page-visit-counter" aria-live="polite">
              👁️{" "}
              {pageVisitCount === null
                ? "Contando visitas..."
                : `${pageVisitCount.toLocaleString("es-CR")} ${
                    pageVisitCount === 1
                      ? "visita registrada"
                      : "visitas registradas"
                  }`}
            </p>
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

        <section id="bosque-del-corazon" className="bosque-book-section">
          <div className="section-heading">
            <p className="eyebrow">Colección infantil</p>
            <h2>Mi Primer Viaje por el Bosque del Corazón</h2>
            <p>
              Un libro para colorear y realizar actividades que acompaña con
              amor a niños de 5 a 10 años cuando extrañan a alguien, sienten
              miedo o están viviendo un cambio importante.
            </p>
          </div>

          <article className="bosque-book-card">
            <div className="bosque-book-cover-wrap">
              <img
                src={portadaMiPrimerViaje}
                alt="Portada del libro Mi Primer Viaje por el Bosque del Corazón"
                className="bosque-book-cover"
              />
              <span className="resource-status paid-status">USD $5</span>
            </div>

            <div className="bosque-book-content">
              <p className="resource-kicker">Libro 1 · De 5 a 10 años</p>
              <h3>Un libro de amor para sentir, recordar y crecer</h3>

              <p>
                Hay emociones que los niños todavía no saben explicar. A veces
                extrañan a alguien, sienten miedo o simplemente necesitan un
                abrazo. Por eso nació el Bosque del Corazón.
              </p>

              <ul className="resource-feature-list">
                <li>40 páginas para colorear y realizar actividades.</li>
                <li>Ejercicios de respiración y calma.</li>
                <li>Espacios para escribir, dibujar y expresar emociones.</li>
                <li>Isis y los amigos del Bosque acompañan cada paso.</li>
                <li>Ideal para acompañar cambios, ausencias y momentos difíciles.</li>
              </ul>

              <div className="resource-special-note">
                <strong>Porque sanar también puede comenzar con un lápiz de colores.</strong>
                Más adelante estará disponible una edición premium completamente a color.
              </div>

              <div className="resource-card-actions bosque-book-actions">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    "Hola, quiero comprar Mi Primer Viaje por el Bosque del Corazón por USD $5."
                  )}`}
                  className="btn primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Comprar por USD $5
                </a>

                <button
                  type="button"
                  className="btn secondary"
                  onClick={openIsis}
                >
                  Preguntarle a Isis
                </button>
              </div>

              <div className="bosque-solidarity">
                <p>
                  Si eres de Venezuela y deseas recibir este libro como apoyo
                  solidario, escríbeme la palabra <strong>BOSQUE</strong>.
                </p>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    "BOSQUE - Soy de Venezuela y quisiera recibir información sobre el apoyo solidario del libro Mi Primer Viaje por el Bosque del Corazón."
                  )}`}
                  className="btn secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Escribir BOSQUE
                </a>
              </div>
            </div>
          </article>
        </section>

        <section id="recursos-gratuitos" className="resource-library-section">
          <div className="section-heading">
            <p className="eyebrow">Recursos gratuitos</p>
            <h2>Materiales para comenzar hoy</h2>
            <p>
              Descarga sin costo recursos creados para acompañar el bienestar
              emocional de niños, familias, jóvenes y adultos.
            </p>
          </div>

          <div className="resource-library-grid free-resources-grid">
            <article className="resource-library-card free-resource-item">
              <div className="resource-cover-wrap">
                <img
                  src={muestraGratisPersonajes}
                  alt="Portada del mini libro Conoce a mis amigos del Bosque del Corazón"
                  className="resource-cover"
                />
                <span className="resource-status free-status">Gratis</span>
              </div>

              <div className="resource-library-content">
                <p className="resource-kicker">Para niños y familias</p>
                <h3>Conoce a mis amigos del Bosque del Corazón</h3>

                <p>
                  Un primer encuentro con Isis, Lupi, Firu, Lumi, Milo, Alia,
                  Lua y Zujo. Cada personaje ayuda a los niños a reconocer y
                  expresar una emoción diferente con amor, creatividad y
                  esperanza.
                </p>

                <ul className="resource-feature-list">
                  <li>Presentación de los ocho personajes.</li>
                  <li>Ilustraciones para colorear.</li>
                  <li>Espacios para hablar sobre las emociones.</li>
                  <li>Ideal para compartir en familia.</li>
                </ul>

                <div className="resource-card-actions">
                  <a
                    href={freeFriendsBookUrl}
                    className="btn secondary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Leer en línea
                  </a>

                  <button
                    type="button"
                    className="btn primary"
                    disabled={downloadingResource === "amigosBosque"}
                    onClick={() =>
                      handleFreeResourceDownload(
                        "amigosBosque",
                        freeFriendsBookUrl,
                        "ConoceMisAmigosBosquedelCorazon.pdf"
                      )
                    }
                  >
                    {downloadingResource === "amigosBosque"
                      ? "Preparando descarga..."
                      : "Descargar gratis"}
                  </button>
                </div>

                <p className="resource-download-counter" aria-live="polite">
                  📥{" "}
                  {downloadCounts.amigosBosque === null
                    ? "Consultando descargas..."
                    : `${downloadCounts.amigosBosque.toLocaleString("es-CR")} ${
                        downloadCounts.amigosBosque === 1
                          ? "descarga"
                          : "descargas"
                      }`}
                </p>
              </div>
            </article>

            <article className="resource-library-card peace-resource-item">
              <div className="resource-cover-wrap">
                <img
                  src={portadaColoresPaz}
                  alt="Portada de Colores de Paz Interior"
                  className="resource-cover"
                />
                <span className="resource-status free-status">Gratis</span>
              </div>

              <div className="resource-library-content">
                <p className="resource-kicker">Para jóvenes y adultos</p>
                <h3>Colores de Paz Interior</h3>

                <p>
                  Una colección gratuita de 10 mandalas para dedicarte unos
                  minutos, respirar, soltar y volver a ti. Cada mandala incluye
                  un ejercicio sencillo de calma y conexión interior.
                </p>

                <ul className="resource-feature-list">
                  <li>10 mandalas únicos para colorear.</li>
                  <li>Respiración, visualización y reflexión.</li>
                  <li>Ejercicios de serenidad, esperanza y gratitud.</li>
                  <li>No necesitas experiencia previa.</li>
                </ul>

                <div className="resource-card-actions">
                  <a
                    href={peaceColorsUrl}
                    className="btn secondary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Leer en línea
                  </a>

                  <button
                    type="button"
                    className="btn primary"
                    disabled={downloadingResource === "coloresPaz"}
                    onClick={() =>
                      handleFreeResourceDownload(
                        "coloresPaz",
                        peaceColorsUrl,
                        "Colores_de_Paz_Interior.pdf"
                      )
                    }
                  >
                    {downloadingResource === "coloresPaz"
                      ? "Preparando descarga..."
                      : "Descargar gratis"}
                  </button>
                </div>

                <p className="resource-download-counter" aria-live="polite">
                  📥{" "}
                  {downloadCounts.coloresPaz === null
                    ? "Consultando descargas..."
                    : `${downloadCounts.coloresPaz.toLocaleString("es-CR")} ${
                        downloadCounts.coloresPaz === 1
                          ? "descarga"
                          : "descargas"
                      }`}
                </p>
              </div>
            </article>
          </div>


        </section>

        <section id="comunidad-bienestar" className="community-section">
          <div className="community-card">
            <div className="community-content">
              <p className="eyebrow">Comunidad Bienestar Holístico</p>
              <h2>🌿 Sigue caminando con nosotros</h2>

              <p className="community-intro">
                Este mini libro es solo el comienzo. Únete a nuestra comunidad
                y recibe nuevos recursos creados para acompañar tu bienestar
                emocional y el de tu familia.
              </p>

              <div className="community-benefits">
                <span>🌱 Mini libros gratuitos</span>
                <span>🎨 Actividades para niños</span>
                <span>📖 Ejercicios sistémicos</span>
                <span>💜 Reflexiones para familias</span>
                <span>✨ Noticias de próximos libros</span>
              </div>
            </div>

            <div className="community-form-wrapper">
              <form
                name="comunidad-bienestar"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                className="community-form"
                onSubmit={handleNewsletterSubmit}
              >
                <input
                  type="hidden"
                  name="form-name"
                  value="comunidad-bienestar"
                />

                <p className="newsletter-honeypot">
                  <label>
                    No completes este campo:
                    <input
                      name="bot-field"
                      type="text"
                      tabIndex="-1"
                      autoComplete="off"
                    />
                  </label>
                </p>

                <div className="community-field">
                  <label htmlFor="community-name">Nombre</label>
                  <input
                    id="community-name"
                    name="nombre"
                    type="text"
                    placeholder="Tu nombre"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="community-field">
                  <label htmlFor="community-email">Correo electrónico</label>
                  <input
                    id="community-email"
                    name="email"
                    type="email"
                    placeholder="nombre@correo.com"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="community-field">
                  <label htmlFor="community-interest">
                    ¿Qué contenido te interesa más?
                  </label>

                  <select
                    id="community-interest"
                    name="interes"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    <option value="Bienestar y crecimiento personal">
                      Bienestar y crecimiento personal
                    </option>
                    <option value="Actividades para niños">
                      Actividades para niños
                    </option>
                    <option value="Familia y crianza">
                      Familia y crianza
                    </option>
                    <option value="Constelaciones familiares">
                      Constelaciones familiares
                    </option>
                    <option value="Todos los recursos">
                      Todos los recursos
                    </option>
                  </select>
                </div>

                <label className="community-consent">
                  <input
                    type="checkbox"
                    name="consentimiento"
                    value="Sí"
                    required
                  />
                  <span>
                    Sí, quiero recibir recursos gratuitos y noticias de
                    Bienestar Holístico.
                  </span>
                </label>

                <button
                  type="submit"
                  className="btn primary community-submit"
                  disabled={isNewsletterSubmitting}
                >
                  {isNewsletterSubmitting
                    ? "Registrando..."
                    : "Quiero formar parte de la comunidad"}
                </button>

                <p className="community-privacy">
                  Solo te escribiremos cuando tengamos algo valioso para
                  compartir. Sin spam.
                </p>

                {newsletterStatus && (
                  <div
                    className="community-success"
                    role="status"
                    aria-live="polite"
                  >
                    <p>{newsletterStatus}</p>

                    {newsletterStatus.startsWith("¡Gracias!") && (
                      <button
                        type="button"
                        className="btn secondary"
                        onClick={openIsis}
                      >
                        Hablar con Isis
                      </button>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        <section id="contacto" className="contact-section">
          <p className="eyebrow">Estamos para acompañarte</p>
          <h2>¿No sabes por dónde comenzar?</h2>

          <p>
            Puedes conversar con Isis, nuestro asistente, o escribirnos por
            WhatsApp para conocer cuál recurso puede ser más adecuado para ti.
          </p>

          <div className="hero-buttons">
            <button
              type="button"
              className="btn secondary"
              onClick={openIsis}
            >
              Hablar con Isis
            </button>

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
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;