# Brainstorm d'entités 

- **User** : La table des utilisateurs
- **List** : La table des listes de mon kanban
- **Card** : La table des cartes de mes listes
- **Tag** : La table des labels de mes cartes


Modèle de donnée : [https://dbdesigner.page.link/ydDM4EvSshSDDfrd8](https://dbdesigner.page.link/ydDM4EvSshSDDfrd8)


Une API Rest avec des CRUD :
Donc 4 controllers (`userController`, `listController`, `cardController`, `tagController`)
 5 routes (avec les controlleurs respectives) :
  - `GET`   : `/` - Tous les itesm
  - `GET`   : `/:id` - Un item avec l'id `req.params.id`
  - `POST`  : `/` - Créer un item
  - `PUT`   : `/:id` - Mettre à jour un item avec l'id `req.params.id` et le body `req.body`
  - `DELETE`: `/:id` - Suprime l'item avec l'id `req.params.id` 


+ Créer une base de donnée `oKanban` avec un user `oKanban`