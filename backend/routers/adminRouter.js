const {
	checkPermission,
} = require("../controllers/adminController");
  
const { Router } = require("express");
const adminRouter = Router();

adminRouter.get("/", checkPermission);


module.exports = { adminRouter };