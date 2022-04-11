const { Router } = require('express');
const { Recipe } = require('../db.js');
const { Diet } = require('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/', async (req, res, next) => {
    // res.send("soy /get recipe")
    try {
       const newRecipe = await Recipe.findAll()
       res.send(newRecipe);
    }catch(error){
        next(error);
    };
});

router.post('/', async (req, res, next) => {
    // res.send("soy /post recipe")
    const {name, dishSumary, punctuation, healthyLevel, steps} = req.body;

    // if(!name || !dishSumary){
    //     return res.status(422).send({error: 'No se han proporcionado los datos necesarios.'});
    // }; //un mensaje de error creado por mí

    try {
        const newRecipe = await Recipe.create({
            name, 
            dishSumary, 
            punctuation, 
            healthyLevel, 
            steps
        });
        res.send(newRecipe);
    } catch (error) {
        // console.log('Soy el error: ', error)
        next(error); //devuelve un mensaje, pero no el mensaje (o la forma) que querría
    };
});

router.post(`/:recipeId/link-to-diet/:dietId`, async (req, res, next) => {
    const {recipeId, dietId} = req.params;
    console.log(recipeId, ' y ', dietId);

    try{
    const recipe = await Recipe.findByPk(recipeId);
    console.log(recipe)
    await recipe.addDiet(dietId);
    res.status(201).send('Se ha vinculado la receta a la dieta indicada.');
    } catch(err){
        next(err);
    }
})

router.put('/', (req, res, next) => {
    res.send("soy /put recipe")
});

router.delete('/', (req, res, next) => {
    res.send("soy /delete recipe")
});



module.exports = router;
