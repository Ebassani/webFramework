const Card = require('../models/card')

exports.getIndex = (req, res, next) => {
	Card.find()
		.then(cards => {
			res.render('index', {
				pageTitle: 'Blog page',
				cds: cards,
				path: '/',
				hasCards: cards.length > 0,
			})
		})
		.catch(err => {
			console.log(err)
		})
}

// Add-card page
exports.getAddCard = (req, res, next) => {
	res.render('blog/add-card', {
		pageTitle: 'Add Card',
		path: '/add-card',
		editing: false,
	})
}

exports.postAddCard = (req, res, next) => {
	const title = req.body.title
	const imageUrl = req.body.imageUrl
	const description = req.body.description
	const date = req.body.date
	const likes = req.body.likes
	const card = new Card({
		title: title,
		imageUrl: imageUrl,
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
