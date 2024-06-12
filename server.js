// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Haal data op uit de FDND API, ga pas verder als de data gedownload is
const apiUrl = 'https://fdnd-agency.directus.app/items/'
const f_fabrique_art_objects = apiUrl + 'fabrique_art_objects'
const imageArray = []

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')
// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources
app.use(express.static('public'))

//Verwerken van url-gecodeerde data in POST-verzoeken
app.use(express.urlencoded({extended: true}))

// GET route voor de index pagina
app.get('/', function (request, response) {
    fetchJson(f_fabrique_art_objects).then((arts) => {
        if (imageArray.length <= 0) {
            arts.forEach(art => {
                // imageArray.push(art.id)
                imageArray = arts.data.slice(0, 12).map(art => art.id)
            })
        } else {
            console.log("array is niet leeg")
        }
        response.render('index', {arts: arts.data, images: imageArray})
    })
})

// POST route voor de index pagina
app.post('/', function (request, response) {
    fetchJson(f_fabrique_art_objects).then((arts) => {
        // Voeg 3 nieuwe IDs toe aan imageArray
        const newIds = arts.data.slice(12, 15).map(art => art.id)
        imageArray = [...imageArray, ...newIds]
        // Herlaad de pagina
        response.redirect('/')
    })
})

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get('port')}`)
})
