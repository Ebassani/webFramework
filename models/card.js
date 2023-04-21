const fs = require('fs')
const path = require('path')

const p = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'cards.json'
)

const getCardsFromFile = callback => {
	fs.readFile(p, (err, fileContent) => {
		if (err) {
			callback([])
		} else {
			callback(JSON.parse(fileContent))
		}
	})
}

module.exports = class Card {
	constructor(title, imageUrl, description, date, likes) {
		this.title = title
		this.imageUrl = imageUrl
		this.description = description
		this.date = date
		this.likes = likes
	}

	save() {
		getCardsFromFile(cards => {
			cards.push(this)
			fs.writeFile(p, JSON.stringify(cards), err => {
				console.log(err)
			})
		})
	}

	static fetchAll(callback) {
		getCardsFromFile(callback)
	}
}
