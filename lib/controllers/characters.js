const { Router } = require('express');
const Character = require('../models/Character');

module.exports = Router()
  .get('/:id', async(req, res) => {
    const id = req.params.id;
    const matchingCharacter = await Character.getById(id);
    res.json(matchingCharacter[0]);
  })

  .get('/', async(req, res) => {
    const characters = await Character.getAll();
    res.json(characters);
  });
