const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// Get all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'products', 
      },
    ],
  })
    .then((tags) => res.json(tags))
    .catch((err) => res.status(500).json(err));
});

// Get one tag by its `id`
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'products',
      },
    ],
  })
    .then((tag) => {
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.json(tag);
    })
    .catch((err) => res.status(500).json(err));
});

// Create a new tag
router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => res.status(201).json(tag))
    .catch((err) => res.status(400).json(err));
});

// Update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  // update a tag by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((affectedRows) => {
      if (affectedRows[0] === 0) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.json({ message: 'Tag updated successfully' });
    })
    .catch((err) => res.status(400).json(err));
});

// Delete one tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((affectedRows) => {
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.json({ message: 'Tag deleted successfully' });
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
