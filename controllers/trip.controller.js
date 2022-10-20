const {
    getTripsService,
    createTripService,
    updateTripByIdService,
    bulkUpdateTripService,
    getTripByIdService,
    deleteTripByIdService,
    bulkDeleteTripService,
} = require("../services/trip.services");

exports.getTrendingTrips = async (req, res, next) => {
    try {
        const queries = {
            sortBy: '-view',
            page: 1,
            limit: 3
        }

        const trips = await getTripsService({}, queries);

        res.status(200).json({
            status: "success",
            data: trips,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the data",
            error: error.message,
        });
    }
};

exports.getCheapestTrips = async (req, res, next) => {
    try {
        const queries = {
            sortBy: 'price',
            page: 1,
            limit: 3
        }

        const trips = await getTripsService({}, queries);

        res.status(200).json({
            status: "success",
            data: trips,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the data",
            error: error.message,
        });
    }
};

exports.getTrips = async (req, res, next) => {
    try {
        let filters = { ...req.query };
        const excludeFields = ['sort', 'page', 'limit', 'fields'];
        excludeFields.forEach(field => delete filters[field]);

        //gt ,lt ,gte .lte
        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        filters = JSON.parse(filtersString);
        // console.log(filters);
        const queries = {}
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            queries.sortBy = sortBy
            // console.log(sortBy);
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            queries.fields = fields
            // console.log(fields);
        }

        if (req.query.page || req.query.limit) {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        const trips = await getTripsService(filters, queries);

        res.status(200).json({
            status: "success",
            data: trips,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the data",
            error: error.message,
        });
    }
};

exports.createTrip = async (req, res, next) => {
    try {
        const result = await createTripService(req.body);
        res.status(200).json({
            status: "success",
            messgae: "Data inserted successfully!",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: " Data is not inserted ",
            error: error.message,
        });
    }
};

exports.updateTripById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateTripByIdService(id, req.body);

        res.status(200).json({
            stauts: "success",
            message: "Successfully updated the trip"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update the trip",
            error: error.message,
        });
    }
};


exports.bulkUpdateTrip = async (req, res, next) => {
    try {
        console.log(req.body)
        const result = await bulkUpdateTripService(req.body);

        res.status(200).json({
            stauts: "success",
            message: "Successfully updated the trip",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update the trip",
            error: error.message,
        });
    }
};

exports.getTripById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await getTripByIdService(id);
        if (!result) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't load the trip."
            })
        }

        res.status(200).json({
            data: result,
            status: "success",
            message: "Successfully loaded the trip.",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't load the trip.",
            error: error.message,
        });
    }
};

exports.deleteTripById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await deleteTripByIdService(id);

        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't delete the trip"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully deleted the trip",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't delete the trip",
            error: error.message,
        });
    }
};

exports.bulkDeleteTrip = async (req, res, next) => {
    try {
        console.log(req.body)
        const result = await bulkDeleteTripService(req.body.ids);

        res.status(200).json({
            stauts: "success",
            message: "Successfully deleted the given trips",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't delete the given trips",
            error: error.message,
        });
    }
};