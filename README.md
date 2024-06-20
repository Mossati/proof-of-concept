> _Fork_ deze leertaak en ga aan de slag. Onderstaande outline ga je gedurende deze taak in jouw eigen GitHub omgeving uitwerken. De instructie vind je in: [docs/INSTRUCTIONS.md](docs/INSTRUCTIONS.md)

# Fabrique
<!-- Geef je project een titel en schrijf in één zin wat het is -->
Een infinite canvas project voor Qatar Museums van Fabrique.

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
<!-- Voeg een mooie poster visual toe 📸 -->
<!-- Voeg een link toe naar Github Pages 🌐-->
Een project met als core functionality de infinite canvas, een canvas met afbeeldingen van
de kunstwerk collectie van Qatar Museums.
Door de te scrollen door de canvas heen worden er nieuwe afbeeldingen ingeladen waardoor je
oneindig door kan scrollen.
De website kan je hier bekijken: [Infinite Canvas](proof-of-concept-zite.onrender.com)

![schets](https://github.com/Mossati/proof-of-concept/assets/47789542/67beb7df-bf9b-44a6-8099-4d484204cfd7)


## Gebruik
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->
Scroll door de canvas heen om nieuwe afbeeldingen in te laden en de collectie te bekijken van Qatar Museums.

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framwork of library gebruikt? -->
### HTML
Voor de HTML is gebruik gemaakt van ```div```, ```ul```, ```form```

### CSS
Voor de CSS is gebruik gemaakt ```kebab-case``` en ```custom properties```.

### Javascript
Voor Javascript is client-side fetching gebruikt om de website bij te werken zonder het herladen van de pagina.

### Node.js/Express
Node.js/Express is gebruikt voor het fetchen van data uit Directus (```GET```) en het verzenden van data in arrays (```POST```)

## Installatie
<!-- Bij Instalatie staat hoe een andere developer aan jouw repo kan werken -->
### Vereisten
- Node.js
- npm (Node Package Manager, meestal meegeleverd met Node.js)

### Stappen
1. Clone het project (dit kan door recht boven op clonen te drukken)
2. Installeer Node Package Manager (NPM) door in de terminal dit te typen: ```npm install```
3. Om de server te starten kan je gebruik maken van: ```npm start```

## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
