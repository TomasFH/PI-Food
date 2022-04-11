const { Router } = require('express');
const {Diet, Recipe} = require('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/', async (req, res, next) => {
    // res.send("soy /get diet")
    const newDiet = await Diet.findAll({
        include: Recipe
    })

    res.send(newDiet);
})

router.post('/', async (req, res, next) => {
    const {name} = req.body;

    try{
        const newDiet = await Diet.create({
            name
        });
        res.send(newDiet);
    }catch (err){
        res.send(err)
    }
})

// router.put('/modify/:dietId', async (req, res, next) => {
//     // res.send("soy /put diet")
//     const {name} = req.body;

//     if(!name){
//         return res.status(400).send({error: 'No se recibió el nuevo valor de "name".'})
//     }

//     const { dietId } = req.params;
//     // console.log(dietId);
//     const current = await Diet.findByPk(dietId);
//     const aux = current.dataValues.name; 
//     // console.log(current.dataValues.name);
//     current.dataValues.name = name;
//     res.send(`Se ha modificado "${aux}" por "${name}" con éxito.`)
// })

router.delete('/', (req, res, next) => {
    res.send("soy /delete Diet")
})

module.exports = router;
