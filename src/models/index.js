const List = require('./List');
const Tag = require('./Tag');
const User = require('./User');
const Card = require('./Card');

// ASSOCIATIONS

// Une liste appartient à un User
List.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'creator'
});
// Un user à plus listes
User.hasMany(List, {
  foreignKey: 'user_id',
  as: 'lists'
})

// Une Carte apprtient à une Liste
Card.belongsTo(List, {
  foreignKey: 'list_id',
  as: 'list'
});
// Une Liste à plusieurs cartes
List.hasMany(Card, {
  foreignKey: 'list_id',
  as: 'cards'
});

// Un Tag à plusieurs Cartes
Tag.belongsToMany(Card, {
  through: 'card_has_tag',
  as: 'cards'
});
// Une Carte à plusieurs Tags
Card.belongsToMany(Tag, {
  through: 'card_has_tag',
  as: 'tags'
});

// SYNC (créer si n'existe pas en base)

const init = async () => {
  await User.sync();
  await Tag.sync();
  
  await List.sync(); // qui arrive après User car il lui fait référence
  await Card.sync(); // qui arrive après List car il lui fait référence...
}

init();

module.exports ={
  List,
  Tag,
  User,
  Card
}