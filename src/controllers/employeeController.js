import Employee from '../models/employeeModel.js';

const createEmployee = async (req, res) => {
    try{
        // 1. Extract data from request body
        const { name, empId, salary, role } = req.body;

        // 2. Check user/emp already exists in the database
        const existingEmployee = await Employee.findOne({ empId });
        
        if(existingEmployee){
            return res.status(400).json({
                message : "Employee already exist"
            })
        }

        // 3. Create new employee in the database
        const newEmployee = await Employee.insertOne(req.body);

        // 4. Send response back to the client
        return res.status(200).json({
            message : "Employee Created Succesfully",
            employee : newEmployee
        })
    }
    catch(err){
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const getEmployees = async (req, res) => {
    try{
        const employees = await Employee.find();
        return res.status(200).json({
            message : "Employees fetched successfully",
            employees : employees
        })
    }
    catch(err){
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const getEmployeeById = async (req, res) => {}

const getEmployeesSalary = async (req, res) => {}

export {createEmployee, getEmployees, getEmployeeById, getEmployeesSalary};
