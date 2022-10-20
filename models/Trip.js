const mongoose = require('mongoose')
// schema design
const tripSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this product."],
        trim: true,
        unique: [true, "Name must be unique"],
        minLength: [3, "Name must be at least 3 characters."],
        maxLenght: [100, "Name is too large"],
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minLength: [8, "Trip must have a description."],
        maxLenght: [300, "Description is too large"],
    },
    price: {
        type: Number,
        rquired: true,
        min: [0, "Price can't be negative"],
    },
    view: {
        type: Number,
        rquired: true,
        min: [0, "Views can't be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true
                } else {
                    return false
                }
            }
        },
        message: "View must be an integer"
    },

}, {
    timestamps: true,
})



// mongoose middlewares for saving data: pre / post 

tripSchema.pre('save', function (next) {
    this.view = 0;
    next()
})
// tripSchema.pre('update', function (next) {
//     this.view = this.view + 1;
//     next()
// })
// tripSchema.pre('findOne', function () {
//     this.view = this.view + 1;
//     next();
// })


// tripSchema.methods.logger = function () {
//     console.log(` Data saved for ${this.name}`);
// }


// SCHEMA -> MODEL -> QUERY

const Trip = mongoose.model('Trip', tripSchema)

module.exports = Trip;