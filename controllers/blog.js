const Card = require('../models/card')

exports.getIndex = (req, res, next) => {
	Card.fetchAll(cards => {
		res.render('blog/index', {
			cards: cards,
			pageTitle: 'Blog',
			path: '/',
		})
	})
}
