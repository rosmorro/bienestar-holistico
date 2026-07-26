import { getStore } from "@netlify/blobs";

const STORE_NAME = "site-counters";
const COUNTER_KEY = "bosque-del-corazon-downloads";

export default async function handler(request) {
  const store = getStore({
    name: STORE_NAME,
    consistency: "strong",
  });

  try {
    if (request.method === "GET") {
      const savedCount = await store.get(COUNTER_KEY, {
        type: "text",
        consistency: "strong",
      });

      const count = Number.parseInt(savedCount ?? "0", 10);

      return Response.json({
        count: Number.isNaN(count) ? 0 : count,
      });
    }

    if (request.method === "POST") {
      const savedCount = await store.get(COUNTER_KEY, {
        type: "text",
        consistency: "strong",
      });

      const currentCount = Number.parseInt(savedCount ?? "0", 10);
      const nextCount = (Number.isNaN(currentCount) ? 0 : currentCount) + 1;

      await store.set(COUNTER_KEY, String(nextCount));

      return Response.json({
        count: nextCount,
      });
    }

    return Response.json(
      {
        error: "Método no permitido",
      },
      {
        status: 405,
        headers: {
          Allow: "GET, POST",
        },
      }
    );
  } catch (error) {
    console.error("Error al actualizar el contador:", error);

    return Response.json(
      {
        error: "No se pudo consultar el contador.",
      },
      {
        status: 500,
      }
    );
  }
}

export const config = {
  path: "/api/download-count",
};