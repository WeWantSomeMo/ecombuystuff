const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{
              model: Product,
              attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
            }],
  }).then((data) => {
    res.send(data)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [{
              model: Product,
              attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
            }],
  }).then((data) => {
    res.send(data)
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({ category_name: req.body.category_name });
  res.send(`Category ${req.body.category_name} is created!`)
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({ category_name: req.body.category_name }, {
    where: {
      id: req.params.id
    }
  });   
  res.send(`Category has updated to ${req.body.category_name}`)
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  });
  res.send(`Category with ID: ${req.params.id} is deleted`)
});

module.exports = router;
