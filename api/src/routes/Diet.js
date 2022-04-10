const { Router } = require('express');
const {Diet} = require('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/', async (req, res, next) => {
    // res.send("soy /get diet")
    const newDiet = await Diet.findAll()

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

router.put('/', (req, res, next) => {
    res.send("soy /put diet")
})

router.delete('/', (req, res, next) => {
    res.send("soy /delete Diet")
})

module.exports = router;
