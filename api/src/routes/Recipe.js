require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const { Recipe } = require('../db.js');
const { Diet } = require('../db.js')
const axios = require('axios');
const { Op } = require('sequelize');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// console.log(API_KEY);

const router = Router();

router.get('/', async (req, res, next) => {

    const {name} = req.query;

    // console.log('Soy el query: ', name)

    if(name){
        const apiRecipePromise = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`);
        const dbRecipePromise = await Recipe.findAll({
            include: Diet
        });
    
        Promise.all([apiRecipePromise, dbRecipePromise])
        .then((response) => {
            const [apiRecipe, dbRecipe] = response;
            const filteredApiRecipe = apiRecipe.data.results.filter(e => e.title.toLowerCase().includes(name.toLowerCase())); //filtra de la api lo que me pasen por Query

            // console.log(dbRecipe)

            // const aux = dbRecipe.map((e) => console.log('MAP', e.dataValues.name));

            const aux2 = dbRecipe.filter((e) => e.dataValues.name.toLowerCase().includes(name.toLowerCase()));
            
            // aux2.map(asd => console.log(asd.dataValues))

            const filteredDbRecipe = aux2.map((f) => f.dataValues)

            // console.log('SOY AUX', aux);
    
            const allRecipes = [...filteredApiRecipe, filteredDbRecipe];
            res.send(allRecipes);
        })
        .catch(error => error);

        /* 
        con el código de arriba, logro filtar tanto de la api como de la base de datos aquellos resultados que contengan la palabra indicada por query (sin importar si la palabra fue
        escrita con mayúsculas o minúsculas ni en que parte del nombre/string esté)
        En caso que no se indique nada por Query, se salta al else que simplememnte devuelve
        todo.
        */

    } else {
        const apiRecipePromise = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`);
        const dbRecipePromise = await Recipe.findAll({
            include: Diet
        });
    
        Promise.all([apiRecipePromise, dbRecipePromise])
        .then((response) => {
            const [apiRecipe, dbRecipe] = response;
            const filteredApiRecipe = apiRecipe.data.results.map((recipe) => {
                return {
                    name: recipe.title,
                    id: recipe.id,
                    image: recipe.image
                }
            })
    
            const allRecipes = [...filteredApiRecipe, dbRecipe];
            res.send(allRecipes);
        })
        .catch(error => error);
    }

});

router.get('/:recipeId', async (req, res, next) => {

    try{
        const { recipeId } = req.params;
        const apiRecipePromise = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`);
        const dbRecipePromise = await Recipe.findAll({
            include: Diet,
            // where: {
            //     id: {
            //         [Op.eq]: recipeId             // me tira un error mas largo que la biblia
            //     }
            // }
        });
        
        Promise.all([ apiRecipePromise, dbRecipePromise ])
        .then((response) => {
            const [ apiRecipe, dbRecipe ] = response;
            const filteredApiRecipe = apiRecipe.data.results.filter((e) => e.id == recipeId);
            const filteredDbRecipe = dbRecipe.filter((g) => g.dataValues.id == recipeId);

            res.send(...filteredApiRecipe, ...filteredDbRecipe);
        })} catch (error) {
            next(error)
        };
        
        //No es necesario verificar que se me pase 'algo' por params de la URL ya que en tal caso significa que 
        //la URL quedo en ".../recipe/" y eso haría que se ejecute el GET '/' de arriba.

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
