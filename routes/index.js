import express from 'express'
import asyncHandler from 'express-async-handler'
import Url from '../models/urlModel.js'

const router = express.Router()

//@route GET /:code
//@desc  Get the long/original url

router.get(
	'/:code',
	asyncHandler(async (req, res) => {
		const url = await Url.findOne({ urlCode: req.params.code })

		if (!url) {
			return res.status(404).json('URL not found')
		} else {
			return res.redirect(url.longUrl)
		}
	})
)

export default router
