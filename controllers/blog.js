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
