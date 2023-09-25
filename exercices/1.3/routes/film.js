var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

const MENU = [
    {
      id: 1,
      title: 'Seigneur des anneaux',
      duration : '228 minutes',
      budjet:'93 millions USD',
      link:'https://fr.wikipedia.org/wiki/Le_Seigneur_des_anneaux_(s%C3%A9rie_de_films)'
    },

    {
        id: 2,
        title: 'The shinning',
        duration : '144 minutes',
        budjet:'15 millions USD',
        link:'https://fr.wikipedia.org/wiki/Shining_(film)'
    },
    {
        id: 3,
        title: 'Joker',
        duration : '122 minutes',
        budjet:'150 millions USD',
        link:'https://fr.wikipedia.org/wiki/Joker_(film,_2019)'
    },
  ];

router.get('/',(req, res) => {
  return res.json(MENU);
});
router.post('/',function (req, res) {
  console.log("je suis la ")
});



// Read the pizza identified by an id in the menu
router.get('/:id', (req, res) => {
  console.log(`GET /film/${req.params.id}`);

  const indexOffilmFound = MENU.findIndex((film) => film.id == req.params.id);

  if (indexOffilmFound < 0) return res.sendStatus(404);

  res.json(MENU[indexOffilmFound]);
});


module.exports = router;
