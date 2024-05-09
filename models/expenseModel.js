const mongoose = require("mongoose")

const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        trim: true,
        maxLength: 50,
    },
    amount : {
        type: Number,
        required: [true, "amount is required"],
        maxLength: 20,
        trim: true
    },
    type: {
        type: String,
        default: "expense"
    },
    date : {
        type: Date,
        required: [true, "date is required"],
        trim: true
    },
    category : {
        type: String,
        required: [true, "category is required"],
        trim: true
    },
    description : {
        type: String,
        trim: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Expense", ExpenseSchema)