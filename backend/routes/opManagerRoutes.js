const express = require("express");
const { 
  loginOPManager, 
  getOPManagerDetails, 
  updateOPManager, 
  registerOPManager, 
  bookAppointment 
} = require("../controllers/opManagerController");

const { authMiddleware, opManagerAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ OP Manager Login
router.post("/login", loginOPManager);

// ✅ Get OP Manager Profile (Only OP Managers can access)
router.get("/profile", authMiddleware, opManagerAuth, getOPManagerDetails);

// ✅ Update OP Manager Profile (Only OP Managers can update)
router.put("/update-profile", authMiddleware, opManagerAuth, updateOPManager);

// ✅ Register a new OP Manager (Only OP Managers can create new accounts)
router.post("/register", authMiddleware, opManagerAuth, registerOPManager);

// ✅ Book an appointment (Only OP Managers can book)
router.post("/book-appointment", authMiddleware, opManagerAuth, bookAppointment);

module.exports = router;
