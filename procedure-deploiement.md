# Déployer le code en production

## Créer et activer le serveur (la VM Kourou)

Tu peux administrer le démarage de ta VM depuis cette page sur Kourou : https://kourou.oclock.io/ressources/vm-cloud/

## Se connecter en SSH sur le serveur

On va se connecter en SSH (Secure Shell), c'est un moyen pour établir une connexion sécurisée entre votre ordinateur et un serveur. Ca va nous ouvrir un terminal directement sur la VM.

Copie colle la commande depuis la page de Kourou, elle doit ressemble à quelque chose comme ça : `ssh student@soleneoclock-server.eddi.cloud` 

Lors de la première connexion, il faut répondre `Yes` pour autoriser la connexion.

## Installer ce dont on a besoin sur le serveur

### 1. Système d'exploitation

Tape la commande `lsb_release -a` pour voir l'OS de la VM.
Tu remarque qu'on a un Ubuntu, c'est une distibution Linux.

### 2. Environement d'execution : Node

Tape `node -v` pour voir si Node est installé. 
On va devoir l'installer.

#### Installer Node

Télécharge la source : `curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash -`
et installe la avec apt-get : `sudo apt-get install -y nodejs`

### 3. Système de gestion de version : Git

On a besoin de git pour pouvoir cloner notre repo et recuperer ainsi le code sur la VM.
Tape la commande `git --version` pour voir si Git est installé. Normalement il est déjà installé sur les VM.

[Si il n'était pas déjà installé tu aurai du taper la commande suivante pour l'installer : `sudo apt install git`.]

Pour avoir les droits de cloner notre repo on va devoir générer une clef qu'on ira renseigner dans le projet sur github.

#### 3-1. Génerer une clée SSH pour Git

Génère la clé avec cette commande : 
`ssh-keygen -t ed25519 -C "your_email@example.com"`
Bien sûr tu changes par ton adresse email hein ? 😏

Lorsque on te demande :
```
> Enter a file in which to save the key (/c/Users/you/.ssh/id_algorithm):[Press enter]
```
**Appuies sur Entrée**. Ça acceptera l'emplacement de fichier par défaut, pas besoin de le changer.

⚠️ L'étape d'après va te demander de saisir un mot de passe :

```
> Enter passphrase (empty for no passphrase): [Type a passphrase]
> Enter same passphrase again: [Type passphrase again]
```
**Appuies sur la touche Entrée 2 fois d'affilé sans rien saisir**. Il ne faut pas creer un mot de passe sinon à chaque fois que tu vas te servir de ta clef (en gros à chaque `git pull` et `git push`) il va te demander de saisir ce mot de passe, et c'est hyper enquiquinant !

Ta clef est générée ! 🥳

#### 3-2. Récuperer la clé et la renseigner dans le projet github

Déplace toi dans le dossier dans lequel les clés ont été générées :
`cd /home/student/.ssh/`

Affiche le contenu de la clé publique : 
`cat id_ed25519.pub`

Copie la clé, elle doit ressembler à quelque chose comme ça : 
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAWfGh/YaTcntat17hRewsYfsgsfKtz3fFj/aGQGvGqCmd your_email@example.com
```

Vas sur sur le site de github dans les settings de ton repo, dans le menu 
Deploy key et clique sur `Add deploy key`.
Colle la clé publique et valide.
(pas besoin de cocher `allow write access` : la VM pourra recuperer le code de github mais pas en pusher)

#### 3-3. Cloner le repo

On peut maintenant récuperer le code sur la VM en clonant le repo.

Place toi bien dans le repetoire racine :
`cd /home/student`

Clone le repo : 
`git clone [git@github.com](mailto:git@github.com):O-clock-social-builder/nomDeTonRepo.git`
Bien sûr tu changes par ton nom de repo hein ? 😏

A la question :
```
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```
il faut taper : `yes`

Le dossier a été cloné 🥳 
Tu peux vérifier qu'il est bien là avec la commande `ls`.

## 3-4. Modifier les variables d'environnement

Déplace toi dans le projet :
`cd nomDuProjet`

On voit qu'on a le fichier `.env.exemple`, on va le dupliquer en créant un fichier `.env` et le modifier pour ajouter nos valeurs de variables.

Duplique le avec la commande : 
`cp .env.example .env` 

Edite le avec la commande : 
`vi .env` 

Remplace chaque ligne avec les bonnes valeurs de nom de la base, utilisateur et mot de passe. Et un secret pour les JWT.

Ah mais on a pas encore créé la base de donnée !

## 4. Système de gestion de base de données

Installe Postgres : 
`sudo apt install postgresql postgresql-contrib`
Quand il vous demande `Do you want to continue? [Y/n] ` : tapez `Y`.

Connecte toi au server PostGres dans le terminal en tant que user postgres : 
`sudo -i -u postgres psql` (mdp par dessus les nuages)

Une fois connecté on peut faire les commandes suivantes pour afficher des infos : 
```
\l = liste des bases
\d = liste des tables
\du = liste des utilisateurs
\q = quitter
\h = aide
USE labase = pour se connecter sur la base
\c labase = pour se connecter sur la base
SELECT version(); = version PostgreSQL
SELECT current_date; = date actuelle
```

Crée un utilisateur : 
`CREATE USER okanban WITH ENCRYPTED PASSWORD 'okanban';`

Crée la base de données :
`CREATE DATABASE okanban;`

Donne les droits au nouveau user sur cette base : 
`GRANT ALL PRIVILEGES ON DATABASE okanban TO okanban;`

Deconnecte toi en tapant `exit`

Si tu essaye de te connecter à la base de données nouvellement créée avec l’utilisateur nouvellement créé :
`psql -U okanban -d okanban`
Tu peux voir qu'il a pas les droits parce qu’il essaye de se connecter avec la session utilisateur PEER et nous on veut se connecter avec un mot de passe MD5.
Donc il faut faire une petite modification de config pour avoir accès à une base qui n’a pas le même nom que le user de session : 
`sudo nano /etc/postgresql/12/main/pg_hba.conf`

Remplacer la ligne : 
`local all all peer` par `local all all md5`

POur sortir de nano, tapez `Ctrl+X` puis tapez `Y` pour valider la sauvegarde.

Pour que les changements soient pris en compte, il faut relancer le serveur : 
`sudo service postgresql restart`

Deconnecte toi puis reconnecte toi à la base de données avec l’utilisateur nouvellement créé :
`psql -U manga -d manga` : ça marche 🥳

## 5. Lancer le serveur 

Déplace toi dans le dossier du projet avec `cd` 
Avec `ls` tu vérifie que tous les fichiers sont là.

Il faut que tu installe les dépendances : `npm i`

Avant de lancer le serveur, on lance le script `node firstRun.js` qui va creer la structure des tables et le premier utilisateur. Sinon si on lance direct le point d'entrée `index.js` on aura les tables vides et on devra crerr un user admin à la main.

Puis lance le serveur `node app/index.js` sur le localhost du serveur Kourou !!!

Et voilà on accède aux endpoints de notre API en allant sur l’adresse de la VM : http://soleneoclock-server.eddi.cloud:3000/

## 6. Faire tout pareil pour le front

C'est plus simple car tout est deja instalé (node, git), on a pas besoin de postgres, il faut penser à aller copier la clé ssh dans le projet sur github.
Pour lancer le serveur front : 
- télécharger les dependances `npm i`
- modifier l'URL de l'API back pour que le front aille fetch sur la bonne adresse
Dans constantes.js : changez localhost par l'adresse de la VM kourou
```
export const API_URL = 'http://soleneoclock-server.eddi.cloud';
```
-> prennez bien sur la fiche VM de kourou la valeur de 'adresse de la machine' 

- builder le code front avec `npm run build` 
- lancer le serveur front sirv avec : `npm run start --host 0.0.0.0`

