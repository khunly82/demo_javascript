## Énoncé : Crée ton jeu de Memory (Jeu de paires)

### Objectif du projet

Développer un jeu de cartes classique où le joueur doit retourner des cartes pour trouver des paires identiques. Le jeu se joue en solo et se termine lorsque toutes les paires ont été trouvées.

---

### Étape 1 : Structure et Design (HTML / CSS)

Avant de coder la logique, il faut préparer le plateau de jeu.

1. **HTML** :
* Crée une grille principale (`#game-board`) qui contiendra **16 cartes** (soit 8 paires).
* Chaque carte doit avoir une structure double : une face cachée (le dos de la carte) et une face visible (le motif ou l'image).


2. **CSS** :
* Utilise **CSS Grid** ou **Flexbox** pour afficher les cartes sous forme de grille (par exemple, un carré de 4x4).
* Ajoute un style sympa pour les cartes (dimensions fixes, arrondis, ombres).
* *(Optionnel mais recommandé)* : Crée une classe CSS `.flipped` qui simule le retournement de la carte (tu peux utiliser `transform: rotateY(180deg)` pour un effet 3D stylé).



---

### Étape 2 : La Logique du Jeu (JavaScript)

C'est ici que le jeu prend vie. Tu vas devoir manipuler le DOM et gérer les états du jeu.

1. **Préparation des données** :
* Crée un tableau contenant 8 paires d'éléments.
* **Mélange** ce tableau de manière aléatoire au chargement de la page.


2. **Affichage dynamique** :
* Génère les 16 cartes en JS à partir de ton tableau mélangé et insère-les dans le HTML.


3. **Gestion des clics** :
* Ajoute un écouteur d'événement (`click`) sur les cartes.
* Lorsqu'un joueur clique sur une carte :
* Elle se retourne (affichage de sa face visible).
* Si c'est la **première carte** cliquée, on la garde en mémoire.
* Si c'est la **deuxième carte** cliquée, on compare les deux.




4. **Vérification des paires** :
* **Si elles correspondent** : Bravo ! Les cartes restent retournées et deviennent indisponibles au clic.
* **Si elles sont différentes** : Attends une petite seconde (avec `setTimeout`) pour que le joueur puisse voir son erreur, puis retourne-les à nouveau face cachée.


5. **Fin de partie** :
* Dès que les 8 paires sont trouvées, affiche un message de victoire (une `alert` ou un texte dans la page).



---

### Bonus pour les plus rapides (Pour aller plus loin)

Si tu as fini rapidement, ajoute ces fonctionnalités :

* **Un compteur de coups** : Affiche le nombre de tentatives du joueur.
* **Un chronomètre** : Le joueur doit trouver toutes les paires le plus vite possible.
* **Un bouton "Recommencer"** : Pour réinitialiser le jeu, remélanger les cartes et remettre le score à zéro sans recharger la page.

---
