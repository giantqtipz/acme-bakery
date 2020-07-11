const express = require('express');
const app = express();
const path = require('path');
const db = require('./db'); //Db isn't being exported from this file, which is probably why you were having trouble 'seeding'

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '../index.html')));

app.use('/assets', express.static(path.join(__dirname, '../assets')));
//Avoid leaving commented out code that is no longer needed. 
// app.use(bodyParser.json());

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// GET REQUESTS
// Should separate these api routes out into other files and use a Router. 
app.get('/api/chefs', async (req, res) => {
  const chefs = await db.Chef.findAll();
  res.send({ chefs });
});

app.get('/api/chefs/:id', async (req, res) => {
  const { id } = req.params;
  const chef = await db.Chef.findByPk(id);

  res.send({ chef });
});

app.get('/api/recipes', async (req, res) => {
  const recipes = await db.Recipe.findAll();
  res.send({ recipes });
});

app.get('/api/recipes/:id', async (req, res) => {
  const recipe = await db.Recipe.findAll({
    where: {
      id: req.params.id
    }
  });

  res.send({ recipe });
});
//This route should send back something more useful. 
app.get('*', async (req, res) => {

  res.send('whattt??');
});

// POST REQUESTS

app.post('/api/chefs', async (req, res, next) => {
  const { name } = req.body;
  // if(typeof name !== ' string'){
  //   res.status(400).send({
  //     message: `Name must be a string`
  //   })
  //   next();
  // } else {

  // Attempt at error handling

  const chef = await db.Chef.create({
    name: name
  })
  res.send({ chef });
  console.log(`Welcome ${name}`);
  // } 
});

app.post('/api/recipes', async (req, res) => {
  const { name, chefId } = req.body;
  // if(typeof name !== ' string' || typeof chefId !== 'number'){
  //   res.status(400).send({
  //     message: `Name must be a string, and ID must be numerical`
  //   })
  // } else {

  // Attempt at error handling

  const recipe = await db.Recipe.create({
    name: name,
    chefId: chefId
  })
  res.send({ recipe });
  console.log(`Created recipe ${name} made by ${name}`);
  // }
});

// DELETE REQUESTS

app.delete('/api/chefs/:id', async (req, res) => {
  const { id } = req.params;

  const recipes = await db.Recipe.destroy({
    where: {
      chefId: id
    }
  })

  const chef = await db.Chef.destroy({
    where: {
      id: id
    }
  })

  res.send({ id })
  // Not sure how to handle this properly. This deletes chef and their corresponding recipes, but returns an error (although successfully deletes).
});

app.delete('/api/recipes/:id', async (req, res) => {
  const { id } = req.params;

  const recipe = await db.Recipe.findByPk(id);

  if (!recipe) {
    res.status(404).send({
      message: `Recipe id: ${id} not found.`
    })
  } else {
    await recipe.destroy({
      where: {
        id: id
      }
    })
    res.send({ recipe });
  }
});

// PUT REQUESTS

app.put('/api/chefs/:id', async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const chef = await db.Chef.findByPk(id);

  if (typeof name !== 'string') {
    res.status(400).send({
      message: `Name must be a string`
    })
  }

  if (!chef) {
    res.status(404).send({
      message: `Chef id: ${id} not found.`
    })
  } else {
    const updatedChef = await chef.update({
      name
    })
    res.send({ updatedChef });
  }
});

app.put('/api/recipes/:id', async (req, res) => {
  const { name, chefId } = req.body;
  const { id } = req.params;
  const recipe = await db.Recipe.findByPk(id);

  if (typeof name !== 'string') {
    res.status(400).send({
      message: `Name must be a string`
    })
  }

  if (!recipe) {
    res.status(404).send({
      message: `Recipe id: ${id} not found`
    })
  } else {
    const updatedRecipe = await recipe.update({
      name: name,
      chefId: chefId
    })
    res.send({ updatedRecipe });
  }
});


const port = process.env.PORT || 3003;

db.sync()
  .then(() => {
    app.listen(port, () => console.log(`Running on ${port}`));
  });
