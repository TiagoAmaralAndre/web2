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

router.get('/',(req, res, next) => {
  return res.json(MENU);
});

module.exports = router;
