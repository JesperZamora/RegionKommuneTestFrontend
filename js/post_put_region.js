console.log("hello");
//DOM input
const inpKode = document.querySelector('#inpKode');
const inpNavn = document.querySelector('#inpNavn');
const inpHref = document.querySelector('#inpHref');

//DOM buttons
const pbPost = document.querySelector('#pbPost');
const pbPut = document.querySelector('#pbPut');


const regionUrl = 'http://localhost:8080/region';


// Get input from fields and convert it to a region-object
function getRegionInput(){
    return {
        kode: inpKode.value,
        navn: inpNavn.value,
        href: inpHref.value
    };
}

async function convertObjectToJson(url, object, httpVerb) {
    const objectAsJsonString = JSON.stringify(object);
    const fetchOptions = {
        method: httpVerb,
        headers: {"Content-Type" : "application/json"},
        body: objectAsJsonString
    }

    const response = await fetch(url, fetchOptions);

    return response
}


async function postRegion(){
    const region = getRegionInput();
    const res = await convertObjectToJson(regionUrl, region, 'POST');
    if(res.ok) {
        alert('Region created');
    }
}

async function putRegion() {
    const region = getRegionInput();
    const putUrl = regionUrl.concat('/').concat(region.kode);
    const res = await convertObjectToJson(putUrl, region, 'PUT');
    if(res.ok) {
        alert('Region updated')
    }
}


pbPost.addEventListener('click', postRegion);
pbPut.addEventListener('click', putRegion);


//Disables the button when the input field code is empty
inpKode.addEventListener('input', function() {
    pbPost.disabled = this.value.trim() === '';
});

pbPost.addEventListener('click', emptyFieldError);
const emptyField = document.querySelector('.emptyField');


//Displays all regions
const textArea = document.querySelector('#textArea');
const pbGet = document.querySelector('#pbGet');

async function getRegions() {
    const getUrl = regionUrl.concat('er');
    const response = await fetch(getUrl);
    return await response.text();
}

async function displayRegions(){
    textArea.textContent = await getRegions();
}



pbGet.addEventListener('click', displayRegions);