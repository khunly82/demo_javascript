## Exercice 1 : Le Calculateur d'IMC (BMI)

### Énoncé

Crée une application qui permet à l'utilisateur de saisir son poids (en kg) et sa taille (en cm) pour calculer son Indice de Masse Corporelle (IMC). L'application doit afficher le score de l'IMC ainsi que la catégorie de poids correspondante (Insuffisance pondérale, poids normal, surpoids, obésité).

* **Formule :** $\text{IMC} = \frac{\text{poids (kg)}}{\text{taille (m)}^2}$ *(Attention à convertir la taille de cm en mètres dans ton script !)*
* **Catégories :** * Moins de 18.5 : Maigreur
* Entre 18.5 et 24.9 : Corpulence normale
* Entre 25 et 29.9 : Surpoids
* 30 et plus : Obésité



### Mockup (Wireframe)

```text
+---------------------------------------------------+
|               CALCULATEUR D'IMC                   |
+---------------------------------------------------+
|  Votre Taille (en cm) :                           |
|  [ 175               ]                            |
|                                                   |
|  Votre Poids (en kg) :                            |
|  [ 70                ]                            |
|                                                   |
|  [      CALCULER L'IMC      ]                     |
+---------------------------------------------------+
|  Résultat :                                       |
|  Votre IMC est de 22.86.                          |
|  Statut : Corpulence normale.                     |
+---------------------------------------------------+

```

---

## Exercice 2 : Le Calculateur d'Âge Exact

### Énoncé

Crée une application avec un champ de saisie de date (calendrier). Lorsque l'utilisateur sélectionne sa date de naissance et clique sur le bouton, l'application doit calculer et afficher son âge exact en **années, mois et jours**.

* **Contrainte JS :** Tu devras utiliser l'objet `new Date()` pour récupérer la date du jour et faire la différence avec la date saisie, en gérant correctement les fins de mois et les années bissextiles pour un calcul précis.

### Mockup (Wireframe)

```text
+---------------------------------------------------+
|               QUEL EST VOTRE ÂGE ?                |
+---------------------------------------------------+
|  Sélectionnez votre date de naissance :           |
|  [ JJ / MM / AAAA ]                           |
|                                                   |
|  [       CALCULER L'ÂGE      ]                    |
+---------------------------------------------------+
|  Vous avez :                                      |
|  - 24 ans                                         |
|  - 5 mois                                         |
|  - 12 jours                                       |
+---------------------------------------------------+

```

---

## Exercice 3 : Le Compte à Rebours avant la Pause Midi

### Énoncé

Crée une horloge dynamique qui affiche le temps restant (en heures, minutes et secondes) avant la fameuse pause de midi (fixée à 12h30).

* **Fonctionnalités :**
* Le compte à rebours doit s'actualiser **toutes les secondes** (pense à `setInterval`).
* Si l'heure actuelle est entre 00:00 et 12:30, afficher le temps restant.
* Si l'heure actuelle est entre 12:30 et 13:30 (pendant la pause), afficher "C'est l'heure de manger !".
* Si l'heure est passée (après 13:30), afficher le temps restant avant la pause du *lendemain*.



### Mockup (Wireframe)

```text
+---------------------------------------------------+
|             COMPTE À REBOURS DE MIDI              |
+---------------------------------------------------+
|                                                   |
|          Temps restant avant la pause :           |
|                                                   |
|                02h : 14m : 35s                    |
|                                                   |
+---------------------------------------------------+
|  Heure actuelle : 09:45:25                        |
+---------------------------------------------------+

```