const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

authorSchema.pre('remove', function(next) {
    Book.find({ author: this.id }, (err, books) => {
        if (err) { // if mongoose couldn't connect for example
            next(err) // won't remove author
        }
        else if (books.length > 0) {
            next(new Error('This author still has books.'))
        }
        else {
            next() // will remove author
        }
    })
})

module.exports = mongoose.model('Author', authorSchema)