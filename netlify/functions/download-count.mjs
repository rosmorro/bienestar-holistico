import { getStore } from "@netlify/blobs";

const STORE_NAME = "site-counters";

const RESOURCE_KEYS = {
  amigosBosque: "downloads-amigos-bosque",
  coloresPaz: "downloads-colores-paz",
};

function getResourceId(request) {
  const url = new URL(request.url);
  return url.searchParams.get("resource");
}

export default async function handler(request) {
  const resourceId = getResourceId(request);
  const counterKey = RESOURCE_KEYS[resourceId];

  if (!counterKey) {
    return Response.json(
      {
        error: "Recurso no válido. Usa amigosBosque o coloresPaz.",
      },
      {
        status: 400,
      }
    );
  }

  const store = getStore(STORE_NAME);

  try {
    const savedCount = await store.get(counterKey, {
      type: "text",
      consistency: "strong",
    });

    const parsedCount = Number.parseInt(savedCount ?? "0", 10);
    const currentCount = Number.isNaN(parsedCount) ? 0 : parsedCount;

    if (request.method === "GET") {
      return Response.json({
        resource: resourceId,
        count: currentCount,
      });
    }

    if (request.method === "POST") {
      const nextCount = currentCount + 1;

      await store.set(counterKey, String(nextCount));

      return Response.json({
        resource: resourceId,
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
    console.error("Error al manejar el contador de descargas:", error);

    return Response.json(
      {
        error: "No se pudo consultar el contador de descargas.",
      },
      {
        status: 500,
      }
    );
  }
}

export const config = {
  path: "/api/download-count",
  method: ["GET", "POST"],
};