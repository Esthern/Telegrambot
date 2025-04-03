export default function handler(req, res) {
  res.status(200).json({ message: "Webhook activo en Vercel" });
}
