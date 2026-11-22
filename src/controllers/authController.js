import Employee from '../models/employeeModel.js';
import jwt from 'jsonwebtoken';

// storing token in localStorage => localStorage.setItem('token', token)
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

const loginCookie = async (req, res) => {
    try{
        // 1. extract empId and password from req.body
        const {empId, password} = req.body;

        // 2. check in DB
        const existingUser = await Employee.findOne({empId});
        if(!existingUser){
            return res.status(404).json({
                message : "Employee does not exist"
            })
        }

        // 3. Verify password
        if(existingUser.password !== password){
            return res.status(404).json({
                message : "Incorrect password"
            })
        }

        // 4. generate token
        const payload = {
            id : existingUser._id,
            empId : existingUser.role,
            role : existingUser.role
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

        // 5. Attach token into cookie
        // res.cookie('token', 'abc123', {
        //     maxAge: 60 * 60 * 1000,
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'strict',
        //     path: '/'
        // });

        res.cookie('token', token, {
            maxAge : 60 * 60 * 1000,
            httpOnly : true,    // avoiding the direct access of cookie (token) from JS
            secure : false,      // only work for https => 1. dev => false and 2. prod => true
            // sameSite : 'strict',  // only allow the cookie to be sent from same site
            // sameSite : 'lax',  // allow the cookie to be sent from different site but only for GET request
            sameSite : 'none',  // allow the cookie to be sent from different site
        })

        // 6. send response
        res.status(200).json({
            message : "Login Successful"
        })
    }
    catch{
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export {login, loginCookie};