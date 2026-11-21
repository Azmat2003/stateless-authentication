import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    empId: {
        type: String,
        required: true,
        unique: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["junior", "senior", "manager"],
    },
    password : {
        type : String,
        required : true,
    }
});


const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;