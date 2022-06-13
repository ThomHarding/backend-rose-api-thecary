const { Router } = require('express');
const Quote = require('../models/Quote');

module.exports = Router()
  .get('/:id', async(req, res) => {
    const id = req.params.id;
    const matchingQuote = await Quote.getById(id);
    res.json(matchingQuote[0]);
  })

  .post('/', async(req, res) => {
    const quotes = await Quote.insert();
    res.json(quotes);
  });
