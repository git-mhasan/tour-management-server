const express = require('express')
const router = express.Router()
const tripController = require('../controllers/trip.controller')

router.route("/trending").get(tripController.getTrendingTrips);
router.route("/cheapest").get(tripController.getCheapestTrips);
router.route("/bulk-update").patch(tripController.bulkUpdateTrip);
router.route("/bulk-delete").delete(tripController.bulkDeleteTrip);

router.route('/')
    .get(tripController.getTrips)
    .post(tripController.createTrip)

router.route("/:id")
    .get(tripController.getTripById)
    .patch(tripController.updateTripById)
    .delete(tripController.deleteTripById)

module.exports = router