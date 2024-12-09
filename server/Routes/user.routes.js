const router = require("express").Router();
const UserModel = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware");
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.json({ id: user._id, name: user.name, email: user.email });
    }
  } catch (error) {
    res.status(500).json({ message: "internal Error hellllooooooo", error });
  }
});

module.exports = router;
