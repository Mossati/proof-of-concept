// ============================================
// Verander de taal van het HTML DOM
// ============================================
// Haal btn-language op
const btnLanguage = document.querySelector('.btn-language');
// Haal tool-tip op
const toolTip = document.querySelector('.tool-tip');
// Boolean variable
let english = true;

// Eventlistner voor een click
btnLanguage.addEventListener("click", function() {
    // Check of de variable true is
    if (english == true) {
        // Verander de button text
        btnLanguage.innerHTML = "العربية";
        // Verander het HTML lang atribuut
        document.documentElement.lang = 'ar';
        // Verander de lees directie
        document.body.style.direction = 'rtl';
        // Voeg een class toe
        document.body.classList.add('arabic');
        // Verander de variable naar false
        english = false;
    }else {
        btnLanguage.innerHTML = "ENGLISH";
        document.documentElement.lang = 'en';
        document.body.style.direction = 'ltr';
        document.body.classList.remove('arabic');
        // Verander de variable naar false
        english = true;
    }
});
// ============================================
// Toggle tooltip voor de taal
// ============================================
// Voeg mouseover event listener toe
btnLanguage.addEventListener("mouseover", toolTipToggle);
// Voeg mouseout event listener toe
btnLanguage.addEventListener("mouseout", toolTipToggle);
// functie voor het togglen van de hidden class voor de tool-tip
function toolTipToggle() {
    toolTip.classList.toggle('hidden');
}
// ============================================
// Toggle tooltip voor kunstwerk titel
// ============================================
// Haal alle tool-tips op
const imageToolTips = document.querySelectorAll('.image-tooltip');
// Haal alle canvas-items op
const imageArts = document.querySelectorAll('.canvas-item');

// Loop door elke canvas-item heen
imageArts.forEach((art, index) => {
    // Voeg mouseover event listener toe
    art.addEventListener("mouseover", function() {
        // Toggle hidden class voor de tool-tip waar de index overeenkomt met de canvas-item
        imageToolTips[index].classList.toggle('hidden');
    });

    // Voeg mouseout event listener toe
    art.addEventListener("mouseout", function() {
        // Toggle hidden class voor de tool-tip waar de index overeenkomt met de canvas-item
        imageToolTips[index].classList.toggle('hidden');
    });
});
// ============================================
// Submit button hidden
// ============================================
// Haal load more button van canvas op
const btnSubmit = document.querySelector('.form-canvas button');
// Voeg hidden class toe (voor als Javascript aanstaat)
btnSubmit.classList.add('hidden');
// ============================================
// Canvas list scroll
// ============================================
// Haal section-canvas op
const sectionCanvas = document.querySelector('.section-canvas');

// Voeg scroll event listener toe aan section-canvas
sectionCanvas.addEventListener('scroll', function() {
    // Checkt of er 5 pixels voor het einde van de section verticaal is gescrolled
    if (sectionCanvas.scrollTop + sectionCanvas.clientHeight >= sectionCanvas.scrollHeight - 5) {
        // Run functie
        formEnhancement();
    }
});
// =========================================================================
// Enhancement: Canvas
// =========================================================================
function formEnhancement() {
    // Haal form-canvas op
    const form = document.querySelector('.form-canvas');
    // Haal loader op (animatie)
    const loader = document.querySelector('.loader');

    // Check of loader de hidden class bevat
    if (loader.classList.contains('hidden')) {
        // Haal hidden class weg
        loader.classList.remove('hidden');
    }

    // Voeg een extra eigenschap aan de formulierdata toe
    const data = new FormData(form);
    data.append('enhanced', true);

    fetch(form.action, {
        // De POST method ophalen
        method: form.method,
        // De data van de form meegeven aan de body
        body: new URLSearchParams(data)
    }).then(function(response) {
        // Als de server een antwoord geeft, krijgen we een stream terug
        // We willen hiervan de text gebruiken, wat in dit geval HTML teruggeeft
        return response.text();

        }).then(function(responseHTML) {
            // Maak tijdelijk DOM element aan
            const tempDOM = document.createElement('div');
            // Plaats de responseHTML in de tijdelijke DOM
            tempDOM.innerHTML = responseHTML;
            // Selecteer het canvas gedeelte uit de tijdelijke DOM
            const responseDOM = tempDOM.querySelector('.canvas-list');

            // log
            console.log(responseDOM);
            console.log(document.querySelector('canvas-list'));
            // Selecteer het canvas gedeelte uit de DOM en vervang het
            document.querySelector('.canvas-list').innerHTML = responseDOM.innerHTML;
            //console.log(responseHTML);

            // Voeg hidden class toe aan loader
            loader.classList.add('hidden');
        });
        // Haal de gebruikelijke form functie weg
        event.preventDefault();
}
// =========================================================================
// Enhancement: Filter
// =========================================================================
function canvasFilter() {
    const form = document.querySelector('.form-canvas');
    const loader = document.querySelector('.loader');

    // Voeg een extra eigenschap aan de formulierdata toe
    const data = new FormData(form);
    data.append('enhanced', true);

    fetch(form.action, {
        // De POST method ophalen
        method: form.method,
        // De data van de form meegeven aan de body
        body: new URLSearchParams(data)
    }).then(function(response) {
        // Als de server een antwoord geeft, krijgen we een stream terug
        // We willen hiervan de text gebruiken, wat in dit geval HTML teruggeeft
        return response.text();

        }).then(function(responseHTML) {
            // Maak tijdelijk DOM element aan
            const tempDOM = document.createElement('div');
            // Plaats de responseHTML in de tijdelijke DOM
            tempDOM.innerHTML = responseHTML;
            // Selecteer het canvas gedeelte uit de tijdelijke DOM
            const responseDOM = tempDOM.querySelector('.canvas-list');

            // log
            console.log(responseDOM);
            console.log(document.querySelector('canvas-list'));
            // Selecteer het canvas gedeelte uit de DOM en vervang het
            document.querySelector('.canvas-list').innerHTML = responseDOM.innerHTML;
            //console.log(responseHTML);
        });
        event.preventDefault();
}