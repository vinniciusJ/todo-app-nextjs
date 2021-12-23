import { connectToDatabase } from "../../lib/mongodb"

export default async (req, res) => {
  const { db } = await connectToDatabase()

  res.json("Hello")
}