const errorhandler = (err, req, res, next) => {
	res.status(res.statusCode ? res.statusCode : '500')
	res.json({ message: error.message ? error.message : 'Server Error' })
}

export default errorhandler
