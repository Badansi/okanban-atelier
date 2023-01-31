const { User } = require("../models");
const bcrypt = require('bcrypt');
const { getToken } = require("../middlewares/jwt");

const authController = {
  async login(req, res, next) {

    try {
    // Chercher un utilisateur avec son username
    const user = await User.scope('withPassword').findOne({
      where: {
        username: req.body.username
      }
    });
    if(user) { // SI j'ai user
      if(await bcrypt.compare(req.body.password, user.password)) { // ALORS je compare le MDP
        res.json({                                                 // SI le mot de passe match -> Je renvoi un token
          token: getToken(user)
        });
      } else {
        res.status(401);
        throw new Error("401 - Wrong username or password");
      }
    } else {
      res.status(401);
      throw new Error("401 - Wrong username or password");
    }
      
  } catch(err) {
    console.error(err);
    next(err);
  }
        
        
            
            // SINON J'renvoi baladé
        // SINON J'renvoi baladé
  }
}

module.exports = authController;