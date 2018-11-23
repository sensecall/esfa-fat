const express = require('express')
const router = new express.Router()
var request = require('request');

router.get('/', (req, res) => {
	res.redirect(`/${req.feature}/${req.featureVersion}/start`)
})

module.exports = router