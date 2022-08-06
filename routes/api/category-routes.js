const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categorytData = await Category.findAll({
    include: [{model: Product}]
    });
    res.status(200).json(categorytData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
   try {
    const categoryData = await Category.findByPk(req.params.id,{
    include: [{model: Product}]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
   try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});



  // update a category by its `id` value
  router.put('/:id', (req, res) => {
  //Calls the update method on the Category model
  Category.update(
    {
      // All the fields you can update and the data attached to the request body.
      category_name: req.body.category_name,
    },
    {
      
      where: {
        id: req.params.id,
      },
    }
  )
    .then((categoryData) => {
      res.json(categoryData);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
})


  // delete a category by its `id` value
  router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No reader found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
