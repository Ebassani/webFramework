const Topic = require('../models/topic')

exports.createTopic = async (req, res) => {
	const { title, icon } = req.body

	const topic = new Topic({
		title,
		icon,
	})

	await topic.save()

	res.status(201).json(topic)
}

exports.getTopics = async (req, res) => {
	Topic.find({}).then(topics => {
		res.status(200).json(topics)
	})
}

exports.getTopic = async (req, res) => {
	const id = req.params.id

	Topic.findById(id)
		.then(topic => {
			res.status(200).json(topic)
		})
		.catch(err =>
			res.status(404).json({ message: 'No topic with id: ' + id })
		)
}

exports.updateTopic = async (req, res) => {
	const title = req.body.title

	const id = req.params.id

	User.findByIdAndUpdate(id, { title }, { new: true })
		.then(updatedTopic => {
			if (!updatedTopic) {
				res.status(404).json({ message: 'No topic with id: ' + id })
			} else {
				res.status(200).json(updatedTopic)
			}
		})
		.catch(err =>
			res.status(404).json({ message: 'No topic with id: ' + id })
		)
}

exports.patchTopic = async (req, res) => {
	const { title, icon } = req.body

	const id = req.params.id

	User.findByIdAndUpdate(id, { title, icon }, { new: true })
		.then(updatedTopic => {
			if (!updatedTopic) {
				res.status(404).json({ message: 'No topic with id: ' + id })
			} else {
				res.status(200).json(updatedTopic)
			}
		})
		.catch(err =>
			res.status(404).json({ message: 'No topic with id: ' + id })
		)
}

exports.deleteTopic = async (req, res) => {
	const id = req.params.id

	await Topic.deleteOne({ _id: id }).catch(err =>
		res.status(404).json({ message: 'No topic with id: ' + id })
	)

	Topic.find({}).then(topics => {
		res.status(200).json(topics)
	})
}
