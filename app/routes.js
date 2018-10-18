const express = require('express')
const router = new express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// Get Sprint and Feature for URL links
router.use('/', (req, res, next) => {
  req.version = req.originalUrl.split('/')[1] // this is added by DC project
  req.feature = req.originalUrl.split('/')[1]
  req.sprint = req.originalUrl.split('/')[2]
  res.locals.version = req.version // this is added by DC project
  res.locals.feature = req.feature
  res.locals.sprint = req.sprint
  next()
})

// VERSIONS
router.use(/\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/version-${req.params[0]}/routes`)(req, res, next);
})

// VERSIONS
router.use(/\/concept-([0-9]+)/, (req, res, next) => {
  require(`./views/concept-${req.params[0]}/routes`)(req, res, next);
})

// Branching
router.use(/\/campaign\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/campaign/version-${req.params[0]}/routes`)(req, res, next);
})

module.exports = router
