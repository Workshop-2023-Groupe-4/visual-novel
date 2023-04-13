# Dev
### Dépendances
- hugo Go
- npm / yarn
### Installation
(Si vous avez un message d'erreur parlant de module, c'est que vous avez probablement sauté cette étape) 
```shell
npm run install
```

### Développement
Lancez dans deux shells côte à côte
```shell
npm run hugo
```
```shell
npm run watch
```

# Écriture
### 1. Application d'édition de l'histoire 
Nous utilisons [Twine](https://twinery.org/) pour créer et modifier l'histoire.
Téléchargez-le ou utilisez la version web

### 2. Import/mise à jour de l'histoire sur Twine
1.
   - Si vous n'avez pas cloné le repo faites le
   - Si vous avez déjà le repo sur votre pc, faites un pull
2. Sur Twine allez sur l'onglet "Bibliothèque" <img src="./doc/1-library.png">
3. Cliquez sur le bouton "Importer" <img src="./doc/2-import.png">
4. Cliquez sur choisir un fichier <img src="./doc/3-import-choose-file.png">
5. Choisissez le fichier de l'histoire que vous voulez importer (story-x.twee)<img src="./doc/4-choose-story-1.png">
6. 
   1. Si vous avez déjà une histoire avec le même nom Twine vous demandera quelle histoire importer, choisissez votre fichier <img src="./doc/5-check-story-1.png">
   2. Cliquez sur importer <img src="./doc/6-click-import.png">
7. Et voilà, l'histoire est importée (ou mise à jour) <img src="./doc/7-file-imported.png">

### 3. Écriture et envoi
L'histoire importée sur Twine vous pouvez ajouter les éléments.  
**Pensez à pull avant de travailler**
Une fois que vous avez terminé, exportez l'histoire 
1. Allez sur l'onglet build<img src="./doc/1-build.png">
2. Exportez l'histoire en fichier .twee <img src="./doc/2-export-as-twee.png">
3. Exportez le fichier à la racine du repo <img src="./doc/3-export-file.png">
4. Si un du même nom existe déjà, écrasez-le sans pitié <img src="./doc/4-overwrite-file.png">

## Syntaxe Twee
### Choix et liens vers d'autres passages
Pour aller au passage 1.8  
`[[Suivant->1.8]]`

Pour faire un choix, mettez plusieurs liens :  
`[[Oui->1.4]]`
`[[Non->1.5]]`

### Liens vers une autre page
`[Fin->/stories/ending]`

### Dialogues
Faire parler le personnage principal  
`@(Jhonette Doe): Lorem ipsum dolor sit amet` 

Faire parler un personnage secondaire  
`@Jhonette Doe: Lorem ipsum dolor sit amet`  

Faire parler un personnage sur le papier
`@@Jhonette Doe: Lorem ipsum dolor sit amet`

Afficher des pensées  
`@@ Lorem ipsum dolor sit amet`  

### Mettre une image
Largeur complète  
`<img src="/assets/illustrations/...">`  

Moitié gauche  
`<img class="left" src="/assets/illustrations/...">`  

Moitié droite  
`<img class="right" src="/assets/illustrations/...">`

Moitié centrée  
`<img class="center" src="/assets/illustrations/...">`

Largeur pleine sans marge à gauche ni à droite 
`<img class="fill" src="/assets/illustrations/...">`

### Texte
Gras  
`''Lorem ipsum dolor sit amet''`

Italique  
`//Lorem ipsum dolor sit amet//`