function VisitCounter({ count }) {
  return (
    <p className="page-visit-counter" aria-live="polite">
      👁️{" "}
      {count === null
        ? "Contando visitas..."
        : `${count.toLocaleString("es-CR")} ${
            count === 1
              ? "visita registrada"
              : "visitas registradas"
          }`}
    </p>
  );
}

export default VisitCounter;