import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Menu item name is required"],
            trim: true
        },
        description: {
            type: String,
            trim: true,
            default: ""
        },
        price: {
            type: Number,
            required: [true, "Menu item price is required"],
            min: [0, "Price must be a positive number"]
        },
        category: {
            type: String,
            required: true,
            enum: ["Food", "Drink", "Dessert", "Other"]
        },
        imageUrl: {
            type: String,
            default: ""
        },
        available: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
export default MenuItem;