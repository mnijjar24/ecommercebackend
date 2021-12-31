const router = require('express').Router();
const { Category, Product } = require('../../models');
router.get("/", async (req, res) => {
  try {
      let categoryData = await Category.findAll({ include: [{ model: Product }] })
      console.log(`CategoryData: ${categoryData}`);
      if (!categoryData) {
          res.status(400).json({ message: "No Categories Found" });
      } else {
          res.status(200).json(categoryData);
      }
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});


router.get("/:id", async (req, res) => {
  try {
      let categoryData = await Category.findAll(
          {
              where: { id: req.params.id },            
              include: [{ model: Product }]
          });
      console.log(`CategoryData: ${categoryData}`);
      if (!categoryData) {
          res.status(400).json({ message: `Category with id:${req.params.id} Not Found` });
      } else {
          res.status(200).json(categoryData);
      }
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});


router.post("/", (req, res) => {
  console.log(req.body);
  Category.create(req.body)
      .then((category) => {
          res.status(200).json(category);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
});


router.put("/:id", (req, res) => {
  console.log(req.body);
  Category.update(req.body,
      {
          where: { id: req.params.id }
      })
      .then((category) => {
          res.status(200).json(category);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
});


router.delete("/:id", (req, res) => {
  Category.destroy(
      {
          where: { id: req.params.id }
      })
      .then((category) => {
          res.status(200).json(category);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
});

module.exports = router;
