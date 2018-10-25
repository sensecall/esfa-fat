const express = require('express')
const router = new express.Router()
var request = require('request');

router.get('/', (req, res) => {
	res.redirect(`/${req.version}/fat`)
})

router.get('/fat/', (req, res) => {
	res.redirect(`/${req.version}/fat/start`)
})

router.get('/login', (req, res) => {
	var currentPage = 'login'
	res.render(`${req.version}/login`,{currentPage})
})

router.post('/login', (req, res) => {
	if (req.session.data['redirect']) {
		res.redirect(`/${req.version}/${req.session.data['redirect']}`)
	} else {
		res.redirect(`account-home`)
	}
})

router.get('/give-feedback', (req, res) => {
	res.redirect(`/${req.version}/give-feedback/start`)
})

router.post('/fat/apprenticeship-or-provider', (req, res) => {
	if (req.session.data['apprenticeship-or-provider'] === 'apprenticeships') {
		res.redirect(`search-by-keyword`)
	} else {
		res.redirect(`search-by-provider`)
	}
})

router.get('/fat/course', (req, res) => {
	var getUrl = 'https://findapprenticeshiptraining-api.sfa.bis.gov.uk/' + req.query.courseType + 's/' + req.query.courseId
	var response = []

	request.get(getUrl,
	{
		json: true,
		encoding: undefined
	},
	(error, response, body) => {
		req.session.data['course-details'] = body
		res.render(`${req.version}/fat/course`)
	});
})

function fatCourseSearch(req,res) {
	var searchQuery = req.session.data['search-query']
	var response = []

	request.get('https://findapprenticeshiptraining-api.sfa.bis.gov.uk/apprenticeship-programmes/search?keywords=' + searchQuery,
	{
		json: true,
		encoding: undefined
	},
	(error, response, body) => {
		req.session.data['search-results'] = body
		res.redirect(`/${req.version}/fat/search-results--apprenticeships`)
	});
}

router.post('/fat/search-results--apprenticeships', (req, res) => {
	fatCourseSearch(req,res);
})

router.post('/fat/search-by-keyword', (req, res) => {
	fatCourseSearch(req,res);
})

router.post('/fat/find-training-provider-by-course', (req, res) => {
	fatProviderSearch(req,res);
})

router.post('/used-service-before', (req, res) => {
	var hasAccount = req.session.data['has-account']
	if (hasAccount === 'yes') {
		res.redirect(`login`)
	} else {
		res.redirect(`login`)
	}
})

module.exports = router