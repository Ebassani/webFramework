const Card = require('../models/card')

exports.getIndex = (req, res, next) => {
	Card.find()
		.then(cards => {
			res.render('index', {
				pageTitle: 'Blog page',
				cds: cards,
				path: '/',
			})
		})
		.catch(err => {
			console.log(err)
		})
}

// Add-card page
exports.getAddCard = (req, res, next) => {
	res.render('blog/edit-card', {
		pageTitle: 'Add Card',
		path: '/add-card',
		editing: false,
	})
}

exports.postAddCard = (req, res, next) => {
	const title = req.body.title
	const description = req.body.description
	const date = req.body.date
	const likes = req.body.likes
	const card = new Card({
		title: title,
		description: description,
		date: date,
		likes: likes,
	})
	card.save()
		.then(result => {
			// console.log(result);
			console.log('Created card')
			res.redirect('/')
		})
		.catch(err => {
			console.log(err)
		})
}

exports.getEditCard = (req, res, next) => {
	const editMode = req.query.edit
	if (!editMode) {
		return res.redirect('/')
	}
	const cardId = req.params.cardId
	Card.findById(cardId)
		.then(card => {
			if (!card) {
				return res.redirect('/')
			}
			res.render('blog/edit-card', {
				pageTitle: 'Edit card',
				path: '/edit-card',
				editing: editMode,
				card: card,
			})
		})
		.catch(err => console.log(err))
}

exports.postEditCard = (req, res, next) => {
	const cardId = req.body.cardId
	const updatedTitle = req.body.title
	const updatedDesc = req.body.description

	Card.findById(cardId)
		.then(card => {
			card.title = updatedTitle
			card.description = updatedDesc
			return card.save()
		})
		.then(result => {
			console.log('UPDATED card!')
			res.redirect('/')
		})
		.catch(err => console.log(err))
}

exports.postDeleteCard = (req, res, next) => {
	const cardId = req.body.cardId
	Card.findByIdAndRemove(cardId)
		.then(() => {
			console.log('DESTROYED card')
			res.redirect('/')
		})
		.catch(err => console.log(err))
}
