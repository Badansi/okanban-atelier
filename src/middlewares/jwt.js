const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiry = process.env.JWT_EXPIRY;

const getToken = (user) => { // Je lui donne un utilisateur et en sortie il me donne un token
  // jwt.sign(lesInfoAStockerDansleToken, monSecret, UnobjetAvecLaDateDexpiration);
  return jwt.sign({
    id: user.id,
    username: user.username
  }, secret, {
    expiresIn: expiry
  });
}

const checkToken = (req, res, next) => {
  let token = req.headers.authorization;        // Je récupère depuis les entête de ma requete le token

  if(token) {
    token = token.replace("Bearer ", "");       // Je vire la partie Bearer qui m'interess pas
    jwt.verify(token, secret, (err, decoded) => {   //J'utilise jwt pour verifier le token
      if(err) {   // Si y'a une erreur, je renvoi balader l'utilisateur
        res.status(400).json({
          message: 'Token invalid'
        });
        return; 
      }

      // Sinon je stock l'info et je passe à la suite

      req.decoded = decoded;
      next();
    });
  } else {
    res.status(401).json({
      message: 'No auth token provided'
    });
  }
}


module.exports = {
  getToken,
  checkToken
}