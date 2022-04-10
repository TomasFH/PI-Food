const { Router } = require('express');
const { Recipe } = require('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/', async (req, res, next) => {
    // res.send("soy /get recipe")
    const newRecipe = await Recipe.findAll()

    res.send(newRecipe);
});

router.post('/', async (req, res, next) => {
    // res.send("soy /post recipe")
    const {name, dishSumary, punctuation, healthyLevel, steps} = req.body;

    if(!name || !dishSumary){
        return res.status(422).send('No se han proporcionado los datos necesarios.');
    };

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
        res.send(error);
    };
});

router.put('/', (req, res, next) => {
    res.send("soy /put recipe")
});

router.delete('/', (req, res, next) => {
    res.send("soy /delete recipe")
});



module.exports = router;
