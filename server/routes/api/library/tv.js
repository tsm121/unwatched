const router = require('express').Router()

let LibrarySeriesController = require('../../../pgdb/db/controllers/LibrarySeriesController')

/**
 * Allows the user to add a Series to library,
 * the Series is then added to the Library collection
 * @param req.body.id
 */
router.post('/', (req, res) => {
  if (LibrarySeriesController.addSeriesToUser(req.body.id, req.user.id)) {
    res.sendStatus(200)
  } else {
    const response = {
      errors: [{
        userMessage: 'Sorry, the series could not be added',
        code: 400
      }]
    }
    res.status = 400
    res.send(response)
  }
})

/**
 * Returnes all the Series a user have in their library
 * @param req.query.order
 * @param req.query.sortBy
 * @param req.query.search
 * @param req.query.page
 */
router.get('/', async (req, res) => {
  const options = {
    order: req.query.order || 'ASC',
    orderBy: req.query.sortBy || 'date',
    query: req.query.search || '',
    page: req.query.page || 1,
    size: 10
  }
  let series = await LibrarySeriesController.getAllSeriesForUser(req.user.id, options)
  if (series) {
    res.json({
      docs: series,
      page: options.page,
      size: options.size
    })
  } else {
    const response = {
      errors: [{
        userMessage: 'Sorry, something went wrong',
        code: 400
      }]
    }
    res.status = 400
    res.send(response)
  }
})

/**
 * Removing Series from Library for the current User, and a given SerieId
 * @param req.body.id
 */
router.delete('/', async (req, res) => {
  try {
    if (await LibrarySeriesController.removeSeriesFromUser(req.body.id, req.user.id)) {
      res.sendStatus(204)
    } else {
      const response = {
        errors: [{
          userMessage: 'Sorry, we were unable to delete that elemeent',
          code: 400
        }]
      }
      res.status = 400
      res.send(response)
    }
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
