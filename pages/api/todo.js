import { connectToDatabase } from "../../lib/mongodb"

export default async (req, res) => {
	const { db } = await connectToDatabase()

	if (req.method == 'POST') {
		const { title, priority, description } = req.body.data
		const createdAt = new Date(Date.now())

		try{
			db.collection('todo-tasks').insert({ title, priority, description, createdAt, isDone: false })
		}
		catch{
			return res.status(200).json({ message: 'Todo task created!' })
		}

		return res.status(200).json({ message: 'Todo task created!' })
	}

	if(req.method == 'GET'){
		const data = await db.collection("todo-tasks").find({}).toArray()

		return res.status(200).json(data)
	}
}