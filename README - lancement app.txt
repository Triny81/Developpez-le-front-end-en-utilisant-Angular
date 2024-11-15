Comment lancer l'application ?
1. Ouvrir un terminal à la racine de l'application.
2. Lancer la commande "npm install" pour installer les dépendances.
3. Lancer la commande ng serve pour lancer l'application et se rendre à l'url donnée par le terminal (ex: localhost:4200).

Fonctionnement global de l'application
- 2 components sont utilisés : 1 pour la page d'accueil et l'autre pour le détail d'un pays.
- Chacun de ces component crée un objet Olympic ainsi qu'un tableau qui sont tous deux utilisés pour afficher les données dans les graphiques.
- Les graphiques utilisés viennent de l'outil ngx-charts. Lien : https://swimlane.gitbook.io/ngx-charts
- Les pages sont responsives grâce à des éléments créés globalement pour pouvoir les réutiliser.
