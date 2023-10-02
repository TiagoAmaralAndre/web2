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
    const minimumDuration = req.query['minimum-duration'] ? parseInt(req.query['minimum-duration']) : undefined;
    const orderByTitle = req.query.order === 'title' ? 'title' : undefined;
    const orderByChar = req.query.char || undefined;
    let filteredMenu = [...MENU];

    if (orderByChar) {
        filteredMenu = MENU.filter(film => film.title.charAt(0) === orderByChar);
    } else if (orderByTitle) {
        if (orderByTitle === 'title') {
            filteredMenu.sort((a, b) => a.title.localeCompare(b.title));
        } else if (orderByTitle === '-title') {
            filteredMenu.sort((a, b) => b.title.localeCompare(a.title));
        }
    } else if (minimumDuration) {
        filteredMenu = MENU.filter(film => film.duration >= minimumDuration);
    }

    res.json(filteredMenu);
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


router.delete('/:id', (req, res) => {
  console.log(`DELETE/films/${req.params.id}`);
  const foundIndex = MENU.findIndex(film => film.id == req.params.id);
  if (foundIndex < 0) return res.sendStatus(404);
  const itemsRemovedFromMenu = MENU.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMenu[0];

  res.json(itemRemoved);
});


router.patch('/:id', (req, res) => {
  console.log(`PATCH /films/${req.params.id}`);

  const title = req?.body?.title;
  const content = req?.body?.content;

  console.log('POST /films');

  if ((!title && !content) || title?.length === 0 || content?.length === 0) return res.sendStatus(400);

  const foundIndex = MENU.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedPizza = {...MENU[foundIndex], ...req.body};

  MENU[foundIndex] = updatedPizza;

  res.json(updatedPizza);
});

router.put('/:id', (req, res) => {

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  if ((!title && !duration && !budget && !link) || title?.length === 0 || link?.length === 0 || duration <= 0 || budget <= 0) return res.sendStatus(400);
  const foundIndex = MENU.findIndex(film => film.id == req.params.id);

  if (foundIndex) {

  const newFilm = {
    title: title,
    duration: duration,
    budget: budget,
    link: link
  };

  const updatedFilm = {...MENU[foundIndex], ...req.body};
  MENU[foundIndex] = newFilm;
  return res.json(updatedFilm);

  }

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
  }
);

module.exports = router;
