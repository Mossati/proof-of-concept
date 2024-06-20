// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Haal data op uit de FDND API, ga pas verder als de data gedownload is
const apiUrl = 'https://fdnd-agency.directus.app/items/'
const f_fabrique_art_objects = apiUrl + 'fabrique_art_objects'
let imageArray = []
let imagesOnLoad = 20;

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

// Cache de afbeeldingen voor 1 dag zodat ze sneller ingeladen worden
app.use((request, response, next) => {
    response.set('Cache-Control', 'public, max-age=86400') // Cache voor 1 dag
    next()
})

app.get('/', function (request, response) {
    fetchJson(f_fabrique_art_objects).then((arts) => {
        // Check of imageArray leeg is
        if (imageArray.length === 0) {
            // Haal de eerste 15 IDs op en voeg ze toe aan de imageArray
            imageArray = arts.data.slice(0, imagesOnLoad).map(art => art.id)
        }
        // Check of elke item ID deel is van de imageArray en haal ze op
        const selectedArts = imageArray.map(id => arts.data.find(art => art.id === id))
        // Log de imageArray
        console.log(imageArray)
        // Render de pagina
        response.render('index', { arts: selectedArts, images: imageArray })
    })
})

// POST route voor de index pagina
app.post('/', function (request, response) {
    const formType = request.body.formType
    const searchBox = request.body.searchBox
    const filterOption = request.body.filter

    // Check of post is gemaakt door form type 1
    if (formType === "form1") {
        console.log("POST met:" + formType)
        fetchJson(f_fabrique_art_objects).then((arts) => {
            // Maak een nieuwe variable aan
            let newIds = []
            let imagesOnUpdate = 100
            // Check of de variablen minder dan 100 items bevat
            while (newIds.length < imagesOnUpdate) {
                // Haal een random nummer op gebasseerd op de lengte van de gefetchde arts
                const randomArt = arts.data[Math.floor(Math.random() * arts.data.length)]
                // Push de random ID naar de newIds variable
                newIds.push(randomArt.id)
            }
            // Voeg de newIds array toe aan de imageArray
            imageArray = [...imageArray, ...newIds]
    
            if (request.body.enhanced) {
                // Render de index pagina
                fetchJson(f_fabrique_art_objects).then((arts) => {
                    const selectedArts = imageArray.map(id => arts.data.find(art => art.id === id))
                    response.render('index', { arts: selectedArts, images: imageArray })
            })
            } else {
                // Redirect terug naar de index pagina
                response.redirect('/')
            }
    
        })
    // Check of post is gemaakt door form type 2
    } else {
        console.log("POST met:" + formType)
        fetchJson(f_fabrique_art_objects + '?fields=*,techniques.*').then((arts) => {
            // Check of de search input leeg is
            if (searchBox == null || searchBox == "") {
                console.log("Search input is leeg")
                response.redirect('/')
            // Search input is niet leeg
            }else {
                //Check of search input tekst bevat dat overeenkomt met image slug
                const selectedArts = arts.data.filter(art => art.slug && art.slug.includes(searchBox) && imageArray.includes(art.id))

                selectedArts.forEach(art => {
                    console.log("Match gevonden:", art.slug)
                });

                response.render('index', { arts: selectedArts, images: imageArray })
                console.log(searchBox)
            }
        })
    }
})

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get('port')}`)
})