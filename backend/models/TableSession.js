import mongoose from "mongoose";
import crypto from "crypto";

const tableSessionSchema = new mongoose.Schema(
    {
        tableNumber: {
            type: String,
            required: [true, "Table number is required"],
            trim: true
        },
        customerName: {
            type: String,
            trim: true,
            default: "Guest"
        },
        phoneNumber: {
            type: String,
            trim: true,
            default: "N/A"
        },
        sessionId: {
            type: String,
            required: true,
            unique: true
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

tableSessionSchema.pre('validate', function(){
    if(!this.sessionId){
        this.sessionId = crypto.randomBytes(12).toString('hex');
    }
});

const TableSession = mongoose.model("TableSession", tableSessionSchema);
export default TableSession;