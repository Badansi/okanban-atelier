const { User } = require("../models");
const bcrypt = require('bcrypt');

const userController = {
  async getAll(req, res, next) {
    try {
      const query = {};

      if(req.query.include) {
        query.include = req.query.include.split(',');
      }

      console.log(query);
      const users = await User.findAll(query);

      res.json(users);
    } catch(err) {
      console.error(err);
      next(err);
    }
  },
  async getOne(req, res, next) {
    try {
      const query = {}; // L'objet qui contiendra toutes les informations de notre requête


      if(req.query.include) {
        query.include = req.query.include.split(','); // Je récupère le query string depuis la requete (?include=lists par exemple) et je découpe selon une virgule (si y'en a plusieurs) pour récupérer un tableau avec la  liste des champs à inclure
      }

      const user = await User.findByPk(req.params.id, query);
      
      if(user) {
        res.json(user);
        return;
      } else {
        res.status(404);
        throw new Error("404 - User not found");
      }
    } catch(err) {
      console.error(err);
      next(err);
    }
  },
  async create(req, res, next) {
    try {
      const userData = req.body;

      if(userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }

      const user = await User.create(userData);
      
      res.json(user);

    } catch(err) {
      console.error(err);
      next(err);
    }
  },
  async update(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id);
      
      if(user) {
        const userData = req.body;

        if(userData.password) {
          userData.password = await bcrypt.hash(userData.password, 10);
        }
  
        await user.update(userData); // Le user que j'ai récupéré que je mets à jour directement

        res.json(user);
        return;
      } else {
        res.status(404);
        throw new Error("404 - User not found");
      }
    } catch(err) {
      console.error(err);
      next(err);
    }
  },
  async delete(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id);
      
      if(user) {
        await user.destroy();
        res.json({
          delete: 'ok'
        });
        return;
      } else {
        res.status(404);
        throw new Error("404 - User not found");
      }
    } catch(err) {
      console.error(err);
      next(err);
    }
  }
}

module.exports = userController;