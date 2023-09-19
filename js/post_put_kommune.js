console.log('hello');

const inpKode = document.querySelector('#inpKode');
const inpNavn = document.querySelector('#inpNavn');
const inpHref = document.querySelector('#inpHref');
const inpKodeRegion = document.querySelector('#inpKodeRegion');

const pbPost = document.querySelector('#pbPost');
const pbPut = document.querySelector('#pbPut');


const urlKommune = 'http://localhost:8080/kommune';

function getKommuneInput() {
    const kommune = {
        kode: inpKode.value,
        navn: inpNavn.value,
        href: inpHref.value,
        region: {
            kode: inpKodeRegion.value
        }
    };

    return kommune;
}


async function convertObjectToJson(url, object, httpVerb) {
    const objectAsJsonString = JSON.stringify(object);
    const fetchOption = {
        method: httpVerb,
        headers: {"Content-Type" : "application/json"},
        body: objectAsJsonString
    }

    const response = await fetch(url,fetchOption);
    return response;
}

async function postKommune() {
    const kommune = getKommuneInput();
    const response = await convertObjectToJson(urlKommune, kommune, 'POST');
    if(response.ok) {
        alert('Kommune created');
    }
}


async function putKommune() {
    const kommune = getKommuneInput();
    console.log(kommune);
    const putUrl = urlKommune.concat('/').concat(kommune.kode);
    const response = await convertObjectToJson(putUrl, kommune,'PUT');
    if(response.ok) {
        alert('Kommune updated');
    }
}


pbPost.addEventListener('click', postKommune);
pbPut.addEventListener('click', putKommune);


//Display kommuner in textarea - gets all kommuner in a string
const pbGet = document.querySelector('#pbGet');
const textArea = document.querySelector('textarea');

async function getKommune() {
    const getKommuner = urlKommune.concat('r');
    const response = await fetch(getKommuner);
    return response.text();
}

async function displayKommuner() {
    textArea.textContent = await getKommune();
}

pbGet.addEventListener('click', displayKommuner);