const Card = require('../models/card')

exports.getAddCards = (req, res, next) => {
	res.render('add-card', { pageTitle: 'Add card page' })
}

exports.postAddCards = (req, res, next) => {
	const card = new Card(req.body.title)
	card.save()
	res.redirect('/')
}

exports.getCards = (req, res, next) => {
	Card.fetchAll(cards => {
		res.render('index', {
			pageTitle: 'Blog page',
			cds: cards,
			path: '/',
			hasCards: cards.length > 0,
			activeShop: true,
			cardsCSS: true,
		})
	})
}
