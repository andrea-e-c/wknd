const router = require("express").Router();
const {
  models: { Event },
} = require("../db");

//GET All Events
router.get("/", async (req, res, next) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    next(error);
  }
});

// router.get("/:id", async (req, res, next) => {
//     try {
//       const product = await Product.findByPk(req.params.id);
//       res.json(product);
//     } catch (error) {
//       next(error);
//     }
//   });

module.exports = router;