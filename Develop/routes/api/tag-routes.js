const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ],
  }).then((data) => {
    res.send(data)
  })
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ],
  }).then((data) => {
    res.send(data)
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body).then((data) => {
    res.send(`The following tag was created: ${req.body.tag_name}`)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({ tag_name: req.body.tag_name }, {
    where: {
      id: req.params.id
    }
  });
  res.send(`The following tag was created: ${req.body.tag_name}`)

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  });
  res.send(`Tag with ID: ${req.params.id} is deleted`)

});

module.exports = router;
