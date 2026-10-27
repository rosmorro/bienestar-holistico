
export default async function handler() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const environment = process.env.PAYPAL_ENVIRONMENT;

  if (environment !== "sandbox") {
    return new Response(
      JSON.stringify({
        ok: false,
        message: "La prueba solo está habilitada en Sandbox."
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  if (!clientId || !clientSecret) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: "Faltan credenciales de PayPal."
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  try {
    const credentials = Buffer.from(
      `${clientId}:${clientSecret}`
    ).toString("base64");

    const response = await fetch(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials"
      }
    );

    if (!response.ok) {
      throw new Error("PayPal rechazó las credenciales.");
    }

    const data = await response.json();

    return Response.json({
      ok: Boolean(data.access_token),
      message: "Conexión con PayPal Sandbox exitosa."
    });
  } catch (error) {
    console.error("Error al conectar con PayPal:", error.message);

    return Response.json(
      {
        ok: false,
        message: "No se pudo conectar con PayPal Sandbox."
      },
      { status: 502 }
    );
  }
}

export const config = {
  path: "/api/paypal-check"
};
