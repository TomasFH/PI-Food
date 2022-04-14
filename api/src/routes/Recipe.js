require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const { Recipe } = require('../db.js');
const { Diet } = require('../db.js')
const axios = require('axios');
const { Op } = require('sequelize');
const db = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get('/', async (req, res, next) => {

    const {name} = req.query;

    if(name){
        const apiRecipePromise = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`);
        const dbRecipePromise = await Recipe.findAll({
            include: Diet
        });
    
        Promise.all([apiRecipePromise, dbRecipePromise])
        .then((response) => {
            const [apiRecipe, dbRecipe] = response;
            const filteredApiRecipe = apiRecipe.data.results.filter(e => e.title.toLowerCase().includes(name.toLowerCase())); //filtra de la api lo que me pasen por Query
            const aux2 = dbRecipe.filter((e) => e.dataValues.name.toLowerCase().includes(name.toLowerCase()));
            const filteredDbRecipe = aux2.map((f) => f.dataValues)
    
            if(!(filteredApiRecipe.length > 0) && !(filteredDbRecipe.length > 0)){
                //si lo que se me pasó por Query no se encuentra ni en la API ni en la DB
                res.status(404).send({error: 'No se ha encontrado ninguna receta que contenga el nombre proporcionado'})
            } else {
                //si sí lo encuentra
                const allRecipes = [...filteredApiRecipe, ...filteredDbRecipe];
                res.send(allRecipes);
            }
        })
        .catch(error => error);

        /* 
        con el código de arriba, logro filtar tanto de la api como de la base de datos aquellos resultados que contengan la palabra indicada por query (sin importar si la palabra fue
        escrita con mayúsculas o minúsculas ni en que parte del nombre/string esté)
        En caso que no se indique nada por Query, se salta al else que simplememnte devuelve
        todo.
        */

    } else {
        const apiRecipePromise = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`); // agregar "&number=x" (siendo 'x' la cantidad de recetas que pido a la API)
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
    
            const allRecipes = [...filteredApiRecipe, ...dbRecipe];
            res.send(allRecipes);
        })
        .catch(error => error);
    }

});

router.get('/types', async (req, res, next) => {
    const dietTypes = await Diet.findAll({
        include: Recipe
    })
    res.send(dietTypes);
})

router.get('/:recipeId', async (req, res, next) => {

    try{
        const { recipeId } = req.params;

        if( recipeId.length < 8){
            //el tamaño de las ID's de la API suelen ser de 6 números. Si supera esa longitud, no pregunta nada a la API.
            const apiRecipePromise = axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`);
            apiRecipePromise.then((response) => {
                const apiRecipe = response;
                const filteredApiRecipe = {
                    id: apiRecipe.data.id, //aunque ya deberíamos saer su valor porque es el que se necesita saber para hacer el GET...
                    name: apiRecipe.data.title,
                    summary: apiRecipe.data.summary,
                    healthScore: apiRecipe.data.healthScore,
                    punctuation: apiRecipe.data.spoonacularScore,
                    steps: apiRecipe.data.analyzedInstructions[0].steps,
                    diets: apiRecipe.data.diets
                };

                res.send( filteredApiRecipe );
            })
        } else {
            //si es mayor de 8 (por poner un número de longitud mayor que los de la API y menos que los de la DB) busca en la base de datos
            const dbRecipePromise = await Recipe.findAll({
            include: Diet,
            where: {
                id: recipeId
            }
        });
        console.log(dbRecipePromise)
        const aux = dbRecipePromise[0].dataValues; //al filtar por ID, debería tener un único valor en mi arreglo, por eso busco el elemento de la posición 0.
        const filteredDbRecipe = {
            id: aux.id,
            name: aux.name,
            summary: aux.summary, //error ortografico: summary va con doble m.
            healthScore: aux.healthScore,
            punctuation: aux.punctuation,
            steps: aux.steps,
            diets: aux.diets
        };
        res.send( filteredDbRecipe );
        };
    } catch(error) {
        next(error);
    };
});

router.post('/', async (req, res, next) => {
    const {name, summary, punctuation, healthScore, steps} = req.body;
    const nameLC = name.toLowerCase(); //LC = Lower Case

    // if(!name || !dishSumary){
    //     return res.status(422).send({error: 'No se han proporcionado los datos necesarios.'});
    // }; //un mensaje de error creado por mí

    try {
        const newRecipe = await Recipe.create({
            name: nameLC, 
            summary, 
            punctuation, 
            healthScore, 
            steps
        });
        res.send(newRecipe);
    } catch (error) {
        next(error);
    };
});



// router.post(`/link-to-diet/:recipeId/:dietId`, async (req, res, next) => {
//     const {recipeId, dietId} = req.params;

//     try{
//     if(recipeId.length > 8) {
//         // si la receta viene de la DB
//         const recipeDb = await Recipe.findByPk(recipeId);
//         console.log(recipeDb);
//         await recipeDb.addDiet(dietId);
//         res.status(201).send('Se ha vinculado la receta a la dieta indicada.')
//     ;} else {
//         //si la receta viene de la API
//     }
//     } catch(err){
//         next(err);
//     }
// })

router.put('/', (req, res, next) => {
    res.send("soy /put recipe")
});

router.delete('/', (req, res, next) => {
    res.send("soy /delete recipe")
});



module.exports = router;
