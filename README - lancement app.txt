Comment lancer l'application ?
1. Ouvrir un terminal à la racine de l'application.
2. Lancer la commande "npm install" pour installer les dépendances.
3. Lancer la commande ng serve pour lancer l'application et se rendre à l'url donnée par le terminal (ex: localhost:4200).

Fonctionnement global de l'application
- 2 components sont utilisés : 1 pour la page d'accueil et l'autre pour le détail d'un pays.
- Si une URL ne correspond à aucune page, alors l'utilisateur sera renvoyé vers la page "not found".
- Chacun de ces components utilise les objets Olympic et Participation pour traiter et typer les données.
- Les graphiques utilisés viennent de l'outil ngx-charts. Lien : https://swimlane.gitbook.io/ngx-charts
    Un tableau typé est attrribué à chaque graphique afin d'afficher les données reçues par l'observable.
- Les pages sont responsives grâce à des éléments css créés globalement pour pouvoir les réutiliser dans de futures pages.

