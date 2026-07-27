import { getStore } from "@netlify/blobs";

const STORE_NAME = "site-counters";
const COUNTER_KEY = "homepage-visits";

export default async function handler(request) {
  const store = getStore({
    name: STORE_NAME,
    consistency: "strong",
  });

  try {
    const savedCount = await store.get(COUNTER_KEY, {
      type: "text",
      consistency: "strong",
    });

    const currentCount = Number.parseInt(savedCount ?? "0", 10) || 0;

    if (request.method === "GET") {
      return Response.json({
        count: currentCount,
      });
    }

    if (request.method === "POST") {
      const nextCount = currentCount + 1;

      await store.set(COUNTER_KEY, String(nextCount));

      return Response.json({
        count: nextCount,
      });
    }

    return Response.json(
      {
        error: "Method not allowed",
      },
      {
        status: 405,
      }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export const config = {
  path: "/api/page-view-count",
};