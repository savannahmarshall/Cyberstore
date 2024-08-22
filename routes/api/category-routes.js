const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET all categories with their associated Products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }], 
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single category by its `id` value with its associated Products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated === 0) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    const updatedCategory = await Category.findByPk(req.params.id);
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Category.destroy({
      where: { id: req.params.id },
    });
    if (deleted === 0) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.json({ message: 'Category deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
