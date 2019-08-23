const express = require('express');
const router = express.Router();
const tripController = require('./tripController');
const { authenticate, authorize } = require('../../../middlewares/auth')
const { uploadImage } = require('../../../middlewares/uploadImage');


// POST   {host}/api/trips (PRIVATE - DRIVER)
router.post('/',
  authenticate,
  authorize(['driver']),
  tripController.createTrip
)

// GET    {host}/api/trips (PUBLIC)
router.get('/', tripController.getTrips)

// GET    {host}/api/trips/:id (PUBLIC)
router.get('/:tripId', tripController.getTripById)
/// api/trips/filter
// DELETE {host}/api/trips/:id (PRIVATE)
router.delete('/:tripId',
  authenticate,
  authorize(['driver', 'admin']),
  tripController.deleteTrip
)

// PUT    {host}/api/trips/:id (PRIVATE)
router.put('/:tripId',
  authenticate,
  authorize(['driver']),
  tripController.updateTrip
)

// PUT    {host}/api/trips/:id (PRIVATE)
router.put('/book-trip/:tripId',
  authenticate,
  // authorize(['passenger']),
  tripController.bookTrip
)

// PUT    {host}/api/trips/:id (PRIVATE)
router.put('/finish-trip/:tripId',
  authenticate,
  authorize(['driver']),
  tripController.finishTrip
)


module.exports = router;
// export default router