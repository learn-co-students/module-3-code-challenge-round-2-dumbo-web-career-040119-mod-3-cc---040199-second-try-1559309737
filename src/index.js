document.addEventListener('DOMContentLoaded', (event) => {
    const listContainer = document.querySelector('.list-group')
    const singleBeerContainer = document.querySelector('#beer-detail')


    function getAllBeers() {
        fetch('http://localhost:3000/beers')
            .then(response => response.json())
            .then(beers => beers.forEach(slapBeersOnList))
    }


    function slapBeersOnList(beer) {
        listContainer.innerHTML += `
    <li class="list-group-item" data-id="${beer.id}" >${beer.name}</li>
    `
    }


    listContainer.addEventListener('click', getAndShowBeer)


    function getAndShowBeer(event) {
        const beerId = event.target.dataset.id

        fetch(`http://localhost:3000/beers/${beerId}`)
            .then(response => response.json())
            .then(beer => singleBeerDetails(beer))
    }


    function singleBeerDetails(beer) {
        singleBeerContainer.innerHTML = `
<h1>${beer.name}</h1>
<img src="${beer.image_url}">
<h3>${beer.tagline}</h3>
<textarea id="text">${beer.description}</textarea>
<button data-id="${beer.id}" class="btn btn-info">
  Save
</button>
    `
    }

    singleBeerContainer.addEventListener('click', editBeer)


    function editBeer(event) {
        event.preventDefault()
        const beerId = event.target.dataset.id
        const description = document.getElementById('text').value
        
        if(event.target.innerText === "Save" ){
        fetch(`http://localhost:3000/beers/${beerId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    description: description
                })
            })
            .then(response => response.json())
            .then(beer => {
                listContainer.innerHTML + `
            <li class="list-group-item" data-id="${beer.id}" >${beer.name}</li>
            `
            })}
    }




    getAllBeers()


})