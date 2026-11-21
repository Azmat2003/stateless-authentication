import Employee from '../models/employeeModel.js';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    try{
        // email + password
        const {empId, password} = req.body;
        
        // check if user exist in the database
        const existingUser = await Employee.findOne({empId});

        if(!existingUser){
            return res.status(400).json({
                message : "Employee does not exist"
            })
        }

        // check if password is correct
        if(password != existingUser.password){
            return res.status(404).json({
                message : "Incorrect Password"
            })
        }

        // generate JWT token
        const payload = {
            id : existingUser._id,
            email : existingUser.email,
            empId : existingUser.empId,
            role : existingUser.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

        // response
        return res.status(200).json({
            message : "Login Successful",
            token : token
        })
    }
    catch(err){
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export {login};