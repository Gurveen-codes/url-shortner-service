import express from 'express'
import vaildUrl from 'valid-url'
import shortId from 'shortid'
import asyncHandler from 'express-async-handler'
import dotenv from 'dotenv'

import Url from '../models/urlModel.js'

const router = express.Router()
dotenv.config()
const baseUrl = process.env.BASE_URL

//@route POST /api/url/shorten
//@Desc  Shorten the given url
router.post(
	'/shorten',
	asyncHandler(async (req, res) => {
		const { longUrl } = req.body

		//Check base url
		if (!vaildUrl.isUri(baseUrl)) {
			console.log(baseUrl)
			return res.status(401).json('Invalid base url')
		}
		//Generate url code
		const urlCode = shortId.generate()

		//Check long url
		if (!vaildUrl.isUri(longUrl)) {
			res.status(401).json('Invalid URL')
		} else {
			const url = await Url.findOne({ longUrl })

			if (url) {
				res.status(200).json(url)
			} else {
				const shortUrl = baseUrl + '/' + urlCode

				const newUrl = new Url({ shortUrl, longUrl, urlCode, date: new Date() })

				await newUrl.save()

				res.status(201).json(newUrl)
			}
		}
	})
)

export default router
