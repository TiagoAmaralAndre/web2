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
      duration : 228 ,
      budjet:'93 millions USD',
      link:'https://fr.wikipedia.org/wiki/Le_Seigneur_des_anneaux_(s%C3%A9rie_de_MENUE)'
    },

    {
        id: 2,
        title: 'The shinning',
        duration : 144,
        budjet:'15 millions USD',
        link:'https://fr.wikipedia.org/wiki/Shining_(film)'
    },
    {
        id: 3,
        title: 'Joker',
        duration : 122,
        budjet:'150 millions USD',
        link:'https://fr.wikipedia.org/wiki/Joker_(film,_2019)'
    },
  ];


  router.get('/', (req, res, next) => {
    const minimuduration = req.query['minimum-duration'] ?? undefined;
    const orderByTitle = req?.query?.order?.includes('title') ? req.query.order : undefined;
    const orderByChar = req.query.char ?? undefined;
    let filtre;
    let filtre2;
 
   if(orderByChar) {
     filtre2 = [];
     for (const film of MENU) {
       console.log(film.title.charAt(0));
       if(film.title.charAt(0) == orderByChar) {
           filtre2.push(film);
       } 
   }
   res.json(filtre2 ?? MENU);
   }
   else if(orderByTitle) {
     let orderedMenu;
     if (orderByTitle) orderedMenu = [...MENU].sort((a, b) => a.title.localeCompare(b.title));
     if (orderByTitle === '-title') orderedMenu = orderedMenu.reverse();
     res.json(orderedMenu ?? MENU);
   } 
   else{
     filtre = [];
     for (const film of MENU) {
         if(film.duration >= minimuduration) {
             filtre.push(film);
         } 
     }
     res.json(filtre ?? MENU);
   }
 });


router.get('/:id', (req, res) => {
  console.log(`GET /MENUE/${req.params.id}`);

  const indexOffilmFound = MENU.findIndex((film) => film.id == req.params.id);

  if (indexOffilmFound < 0) return res.sendStatus(404);

  res.json(MENU[indexOffilmFound]);
});



router.post('/', (req, res) => {
  const budget = req?.body?.budget > 0 ? req.body.budget : undefined;
  const duration = req?.body?.duration > 0 ? req.body.duration : undefined;
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!budget || !duration || !title || !link) return res.sendStatus(400); // error code '400 Bad request'

  const lastItemIndex = MENU?.length !== 0 ? MENU.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? MENU[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title: title,
    duration: duration,
    budget: budget,
    link: link
  };

  MENU.push(newFilm);
  res.json(newFilm);
});


module.exports = router;