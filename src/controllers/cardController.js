const { Card } = require("../models");

const cardController = {
  async getAll(req, res, next) {
    try {
      const query = {}; // L'objet qui contiendra toutes les informations de notre requête


      if(req.query.include) {
        query.include = req.query.include.split(',');
      }

      const items = await Card.findAll(query);

      res.json(items);
    } catch(err) {
      console.error(err);
      next(err);
    }
  },
  async getOne(req, res, next) {
    try {
      const query = {}; // L'objet qui contiendra toutes les informations de notre requête


      if(req.query.include) {
        query.include = req.query.include.split(',');
      }
      
      const item = await Card.findByPk(req.params.id, query);
      
      if(item) {
        res.json(item);
        return;
      } else {
        res.status(404);
        throw new Error("404 - Card not found");
      }
    } catch(err) {
      console.error(err);
      next(err);
    }
  },
  async create(req, res, next) {
    try {
      const item = await Card.create(req.body);
      
      res.json(item);

    } catch(err) {
      console.error(err);
      next(err);
    }
  },
  async update(req, res, next) {
    try {
      const tag = await Card.findByPk(req.params.id);
      
      if(tag) {
        await tag.update(req.body); // Le tag que j'ai récupéré que je mets à jour directement

        res.json(tag);
        return;
      } else {
        res.status(404);
        throw new Error("404 - Card not found");
      }
    } catch(err) {
      console.error(err);
      next(err);
    }
  },
  async delete(req, res, next) {
    try {
      const tag = await Card.findByPk(req.params.id);
      
      if(tag) {
        await tag.destroy();
        res.json({
          delete: 'ok'
        });
        return;
      } else {
        res.status(404);
        throw new Error("404 - Card not found");
      }
    } catch(err) {
      console.error(err);
      next(err);
    }
  }
}

module.exports = cardController;