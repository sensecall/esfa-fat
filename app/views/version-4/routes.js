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

router.post('/fat/search-by-provider', (req, res) => {
	var searchQuery = req.session.data['search-term'] || 'college'
	var response = []

	request.get('https://findapprenticeshiptraining-api.sfa.bis.gov.uk/providers/search?keywords=' + searchQuery,
	{
		json: true,
		encoding: undefined
	},
	(error, response, body) => {
		var providerResults = body
		res.render(`${req.version}/fat/search-by-provider`,{providerResults})
	});
})

router.get('/fat/course', (req, res) => {
	var getUrl;

	if (req.session.data['courseId'] != ''){
		getUrl = 'https://findapprenticeshiptraining-api.sfa.bis.gov.uk/' + req.session.data['courseType'] + 's/' + req.session.data['courseId']
	} else {
		getUrl = 'https://findapprenticeshiptraining-api.sfa.bis.gov.uk/Standards/94'
	}

	var response = []

	request.get(getUrl,
	{
		json: true,
		encoding: undefined
	},
	(error, response, body) => {
		if (!error && response.statusCode == 200)
		{
			var courseData = body
			if(req.session.data['courseType'] == 'standard'){
				res.render(`${req.version}/fat/course--standard`,{courseData})
			} else {
				res.render(`${req.version}/fat/course--framework`,{courseData})
			}
		}

	});
})

function fatCourseSearch(req,res) {
	var searchQuery = req.session.data['apprenticeship-picker']
	var response = []

	request.get('https://findapprenticeshiptraining-api.sfa.bis.gov.uk/apprenticeship-programmes/search?keywords=' + searchQuery,
	{
		json: true,
		encoding: undefined
	},
	(error, response, body) => {
		req.session.data['search-results'] = body
		res.redirect(`/${req.version}/fat/search-results--no-results`)
	});
}

router.post(['/fat/search-results--no-results', '/fat/apprenticeship-or-provider'], (req, res) => {
	fatCourseSearch(req,res);
})

function fatProviderSearch(req,res,query) {
	var searchQuery = query || 'college'
	var response = []

	request.get('https://findapprenticeshiptraining-api.sfa.bis.gov.uk/providers/search?keywords=' + searchQuery,
	{
		json: true,
		encoding: undefined
	},
	(error, response, body) => {
		var providerResults = body
		res.render(`${req.version}/fat/search-results--provider--v3`,{providerResults})
	});
}

router.post(['/fat/search-results--provider', '/fat/find-training-provider-by-course'], (req, res) => {
	fatProviderSearch(req,res)
})

router.get('/fat/search-results--provider', (req, res) => {
	fatProviderSearch(req,res,"college")
})

router.get('/fat/provider', (req, res) => {
	var ukprn = req.session.data['ukprn'] || '10003753'
	var response = []

	request.get('https://findapprenticeshiptraining-api.sfa.bis.gov.uk/providers/' + ukprn,
	{
		json: true,
		encoding: undefined
	},
	(error, response, body) => {
		var providerInfo = body
		res.render(`${req.version}/fat/provider`,{providerInfo})
	});
})

router.get('/fat/provider--course', (req, res) => {
	var courseUrl;

	if (req.session.data['courseId'] != ''){
		courseUrl = 'https://findapprenticeshiptraining-api.sfa.bis.gov.uk/' + req.session.data['courseType'] + 's/' + req.session.data['courseId']
	} else {
		courseUrl = 'https://findapprenticeshiptraining-api.sfa.bis.gov.uk/Standards/94'
	}

	var response = []

	request.get(courseUrl,
	{
		json: true,
		encoding: undefined
	},
	(error, response, body) => {
		if (!error && response.statusCode == 200)
		{
			var courseData = body
			var ukprn = req.session.data['ukprn'] || '10003753'
			var response = []

			request.get('https://findapprenticeshiptraining-api.sfa.bis.gov.uk/providers/' + ukprn,
			{
				json: true,
				encoding: undefined
			},
			(error, response, body) => {
				var providerInfo = body
				res.render(`${req.version}/fat/provider--course`,{providerInfo, courseData})
			})
		}
	})
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
