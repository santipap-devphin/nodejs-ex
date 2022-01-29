const express = require('express');
const router = express.Router();
const employeecontroller = require('../../controller/employeesController');
//const verifyJWT = require('../../middleware/verifyJWT')
const ROLES_LIST = require('../../config/roles_list');

const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
     .get(employeecontroller.getAllEmployee)
     .post(verifyRoles(ROLES_LIST.Admin , ROLES_LIST.Editor) , employeecontroller.createNewEmployee)
     .put(verifyRoles(ROLES_LIST.Admin , ROLES_LIST.Editor) , employeecontroller.updateEmployee)
     .delete(verifyRoles(ROLES_LIST.Admin) , employeecontroller.deleteEmployee);

     router.route('/:id')
     .get(employeecontroller.getEmployee)

module.exports = router;