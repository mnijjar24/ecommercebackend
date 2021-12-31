const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get("/", async (req, res) => {
  try {
      let tagData = await Tag.findAll({ include: [{ model: Product }] })
      console.log(tagData);
      if (!tagData) {
          res.status(400).json({ message: "No Tags Found" });
      } else {
          res.status(200).json(tagData);
      }
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});


router.get("/:id", async (req, res) => {
  try {
      let tagData = await Tag.findAll(
          {
              include: [{ model: Product }],
              where: { id: req.params.id }
              
          });
      console.log(tagData);
      if (!tagData) {
          res.status(400).json({ message: `Tag with id:${req.params.id} Not Found` });
      } else {
          res.status(200).json(tagData);
      }
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  console.log(req.body);
  Tag.create(req.body)
      .then((tag) => {
          res.status(200).json(tag);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.put("/:id", (req, res) => {
  console.log(req.body);
  Tag.update(req.body,
      {
          where: { id: req.params.id }
      })
      .then((tag) => {
          res.status(200).json(tag);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
});


router.delete("/:id", (req, res) => {
  Tag.destroy(
      {
          where: { id: req.params.id }
      })
      .then((tag) => {
          res.status(200).json(tag);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
});

module.exports = router;
