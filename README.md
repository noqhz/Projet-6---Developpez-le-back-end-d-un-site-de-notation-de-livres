# OpenClassrooms P6 Dev Web / Mon vieux Grimoire / dossier Backend


## Comment lancer le serveur ? 


Dossier frontend : https://github.com/OpenClassrooms-Student-Center/P7-Dev-Web-livres

Placez le repo actuel dans un dossier backend, placez le frontend et le backend dans un dossier commun, et initiez le frontend avec `npm start`.


### Démarrer le serveur du backend

Créer un fichier .env à la racine du dossier backend et y copier les lignes suivantes :

```
MONGO_PASSWORD=
MONGO_USER=
MONGO_CLUSTER=

TOKEN_SECRET=
```

Renseigner les variables MONGO_PASSWORD, MONGO_USER, et MONGO_CLUSTER en lien avec la base de données MongoDB.
Dans le même fichier, indiquer également une valeur aléatoire pour TOKEN_SECRET .

Dans un terminal, faites la commande `npm install` pour installer les dépendances puis `nodemon server` (ou `node server`).

-> Projet testé avec bcrypt 5.1.1, dotenv 16.4.7, express 4.21.2, jsonwebtoken 9.0.2, mongoose 7.8.6, mongoose-unique-validator 4.0.1, multer 1.4.5-lts.2, sharp 0.33.5 .
