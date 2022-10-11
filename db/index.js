// this file acts as central hub to pull all routes together
const express = require('express');
const router = express.Router();

router.use(require('./departmentRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./employeeRoutes'));

module.exports = router;