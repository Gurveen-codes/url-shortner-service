import mongoose from 'mongoose'

const urlSchema = mongoose.Schema({
	urlCode: String,
	shortUrl: String,
	longUrl: String,
	date: { type: String, default: Date.now },
})

const Url = mongoose.model('Url', urlSchema)

export default Url
