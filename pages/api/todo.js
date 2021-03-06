import { ObjectId } from "bson"
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

		res.status(200).json({ message: 'Todo task has been created!' })
	}

	if(req.method == 'PUT'){
		const { _id, title, priority, description, ...args } = req.body.data

		const updatedRecord = { $set: { title, priority, description }}

		if(args){
			updatedRecord.$set.isDone = args.isDone
		}

		db.collection('todo-tasks').updateOne({ _id: new ObjectId(_id) }, updatedRecord)

		res.status(200).json({ message: 'Todo task has been updated!' })
	}

	if(req.method == 'DELETE'){
		const { _id } = req.body

		db.collection('todo-tasks').deleteOne({ _id: new ObjectId(_id) })

		res.status(200).json({ message: 'Todo task has been deleted!' })
	}

	if(req.method == 'GET'){
		const data = await db.collection("todo-tasks").find({}).toArray()

		res.status(200).json(data)
	}
}