const express = require('express');
const router = express.Router();
//const Employees = require('../models/employees.model');

const EmployeesController = require('../controllers/employees.controller');
router.get('/employees', EmployeesController.getAll);
router.get('/employees/random', EmployeesController.getRandom);
router.get('/employees/:id', EmployeesController.getId);
router.post('/employees', EmployeesController.postEmp);
router.put('/employees/:id', EmployeesController.putId);
router.delete('/employees/:id', EmployeesController.deleteId);


module.exports = router;
