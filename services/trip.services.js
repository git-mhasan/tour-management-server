const Trip = require("../models/Trip");

exports.getTripsService = async (filters, queries) => {

    const trips = await Trip.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)

    const total = await Trip.countDocuments(filters)
    const page = Math.ceil(total / queries.limit)
    return { total, page, trips };
};

exports.createTripService = async (data) => {
    const product = await Trip.create(data);
    return product;
};

exports.updateTripByIdService = async (productId, data) => {
    const result = await Trip.updateOne(
        { _id: productId },
        { $inc: data },
        {
            runValidators: true,
        }
    );
    return result;
};

exports.bulkUpdateTripService = async (data) => {
    const trips = [];
    data.ids.forEach((trip) => {
        trips.push(Trip.updateOne({ _id: trip.id }, trip.data));
    });

    const result = await Promise.all(trips);
    console.log(result);

    return result;
};

exports.getTripByIdService = async (id) => {
    const result = await Trip.findByIdAndUpdate({ _id: id }, { $inc: { view: 1 } }, { new: true });
    return result;
};

exports.deleteTripByIdService = async (id) => {
    const result = await Trip.deleteOne({ _id: id });
    return result;
};

exports.bulkDeleteTripService = async (ids) => {
    const result = await Trip.deleteMany({});

    return result;
};
