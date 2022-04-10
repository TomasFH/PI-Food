const { Router } = require('express');
const recipeRoute = require('./Recipe');
const dietRoute = require('./Diet')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipe', recipeRoute);

router.use('/diet', dietRoute);


module.exports = router;
