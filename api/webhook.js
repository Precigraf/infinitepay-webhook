import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const secret = process.env.INFINITEPAY_WEBHOOK_SECRET;

  const signature = req.headers["x-signature"];

  const rawBody = JSON.stringify(req.body);

  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(rawBody).digest("hex");

  if (digest !== signature) {
    return res.status(401).json({ message: "Invalid signature" });
  }

  console.log("Webhook válido:", req.body);

  return res.status(200).json({ received: true });
}
