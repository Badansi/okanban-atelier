# Mise en production 

Aller mettre notre code sur un serveur materiel.
Un serveur c'est une machine connecté à internet, allumée H24, avec bcp de CPU, de RAM, de stockage.

Sur ce serveur il nous faut des lociels : 
- un systeme d'exploitation (linux)
- un serveur logiciel (apache, ngninx, node)
- un environnement d'execution du JS (node)
- un systeme de Gestion de Base de Données (postgres)

et :
- notre code JS, comment on va l'envoyer sur le serveur ?
  -> FTP : file transfert protocol 
  -> SSH : secure Shell
  -> git 
- notre base de données !

## Securité de notre code :

A partir du moment ou il est sur internet, il faut faire attention, on peut avoir des données sensible. RGPD
-> https://www.cnil.fr/fr/reglement-europeen-protection-donnees

Penser à proteger toute conexion avec un mot de passe !


## Serveurs 

- serveur dédié (machine entierement à nous)
- serveur mutalisé (machine partagée entre plusieurs utilisateur) 

plusieurs niveau d'autonomie : 

- soit on installe tout, on gere tout
- soit on prend une infrastructure déjà "paramètré" (os deja là, serveur déjà là) : DigitalOcean, Linode, Rackspace, AWS
- soit on prend une plateforme déjà prete pour pusher le code (env d'execution déjà là, sgdb déjà là) : CleverCloud, Heroku, digitalocean, OpenShift, AWS

## Identifier le serveur sur le web

### IP
Notre serveur a un numéro qui l'identifie , un peu comme un numéro de téléphone, c'est son IP
De la forme : 86.211.110.17 un IP doit etre unique et tjs la meme.

### DNS
Le Domain Name System (Système de nom de domaine) ou DNS est un service informatique distribué qui associe les noms de domaine Internet avec leurs adresses IP.
C'est l'annuaire qui se place entre le navigateur et le serveur.
Le navigateur fait une requete vers un nom de domaine, le DNS dit à quelle IP ça correspond et du coup la requete part vers le bon serveur.
On a une sorte de mini DNS sur nos machine : quand on tape localhost dans la barre d'URL, ça va vers 127.0.0.1

### Nom de domaine
C'est une URL qu'on achete pour pouvoir associer avec notre IP

## HTTP

C'est le protocole de communication entre le navigateur et le serveur, quand on tape une URL et qu'on fait entré -> la requete part.
La requete contient :
- une entete avec plein d'infos 

Le serveur renvoie une réponse qui contient : 
- une entete avec plein d'infos
  - un code réponse (200 si tout va bien, 404 si le fichier demandé n'est pas trouvé, ... https://http.cat/ https://httpstatusdogs.com/)
- le fichier avec le code HTML/JS/CSS


# Rappel sur les chemins en ligne de commande

## chemin absolu : 
On part tjs d'un point connu : en général le slash `/` qui est la racine de l'arborescence.
Exemple : on dit tu pars de la mairie et tu vas à droite à gauche ...

## chemin relatif : 
On part de là ou on est et on adapte : on utilise `..` pour remonter au niveau du dessus. Et `.` represente le repertoire courant.
Exemple : on dit tu pars de là où t'es et du revients en arriere, à droite..


# Une fois qu'on a récupéré le code on fait quoi ?

- recuperer les node_modules avec `npm i`
- modifier les variables d'environnement
- lancer le serveur  : `node fichier.js`

# Modifier un fichier en ligne de commande

- il faut utiliser un editeur, le + utilisé s'apelle nano, on tape `nano nomDuFicher` 
-> on peut direct éditer ! On fait Control+X pour sortir : toutes les commmandes sont inscritent en bas.

# Et si on veut faire une évolution du code ?
-> jouer les tests (si ils ne passent pas on ne va pas plus loin)
-> mettre le site en maintenance (afficher un message)
-> faire une sauvegarde de la base de données
-> pull le nouveau code 
-> refaire une install des modules
-> relancer le serveur (avec sequilize la structure de la base se mettra à jour)
-> remettre les données qu'on avait sauvegardé dans la nouvelle base

# Commandes de base :

- `ls` : listing -> c'est pour lister tout le contenu d'un dossier
  on peut ajouter des options
  `-l` ça affiche en liste (un fichier par ligne)
  `-a` ça affiche les dossier/fichiers cachés
  
- `cd` : change directory -> c'est pour se deplacer, changer de dossier
- `pwd` : print working directory -> c'est pour voir où on est : affiche le chemin absolu du dossier courrant
- `nano unFicher.js` -> ouvre un éditeur de fichier (un mini word en ligne de commande)
- `cp file1 file2` -> copie le fichier file1 et le nomme file2
- `cat file1` -> affiche le contenu de file1 sur la sortie standard : pour voir le contenu d'un fichier
- `mkdir doss` -> créé un dossier et le nomme doss 