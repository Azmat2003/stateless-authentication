import {Router} from 'express';

import { createEmployee, getEmployees, getEmployeeById, getEmployeesSalary } from '../controllers/employeeController.js';

import { verifyToken } from '../middleware/verifyToken.js';
import {checkManager} from '../middleware/adminAccess.js';

const router = Router();

// api routes for employee
// api/employees/ -> 


// api/employees/ => {get : all employees data}
router.get('/', verifyToken, checkManager, getEmployees);

// api/employees/ => {post : create new employee data}
router.post('/', createEmployee);

// api/employees/:id => {get : get employee data by id}
router.get('/:empId',verifyToken, getEmployeeById);

// api/employees/salary => {get : get all employees data by salary}
router.get('/salary', verifyToken, checkManager, getEmployeesSalary);



export default router;