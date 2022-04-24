//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Diet } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  
  // --------------------------------------------------------------
  // Lista de Dietas que se precargarán al iniciar la App
  const dietTypes = [
    "gluten free",
    "ketogenic",
    "vegetarian",  // en la api lo único que hay es lacto ovo vegetarian
    "lacto ovo vegetarian", // :D
    "lacto vegetarian", // en la api lo único que hay es lacto ovo vegetarian
    "ovo vegetarian", //  en la api lo único que hay es lacto ovo vegetarian
    "vegan",
    "pescatarian",
    "paleolithic",
    "primal",
    "low fodmap",
    "whole 30",
  ];

  async function defaultDietTypes (dietName) {
    try{  
      await Diet.create({
      name: dietName
    })
  } catch {
    // console.log('Ya se ha creado una tabla con ese valor.')
    // sin el try-catch tira error avisando que ya existen dichos valores dentro de la tabla si el {force: true}
  }
    // console.log('Se creó una tabla con ', dietName)
  };

  dietTypes.map((e) => {
    // console.log(e);
    defaultDietTypes(e);
  })
  

  // --------------------------------------------------------------

    server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
