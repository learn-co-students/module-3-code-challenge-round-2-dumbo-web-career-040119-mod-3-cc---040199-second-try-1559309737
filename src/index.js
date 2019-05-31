let beerList = document.querySelector('.list-group')
let beerDetail = document.querySelector("#beer-detail")
let saveBeer = document.querySelector('#edit-beer')



//fetch to get all the beers to display from the json
const allTheBeers = () => {
    fetch('http://localhost:3000/beers')
        .then(res => res.json())
        .then((arrayOfBeers) => {
            arrayOfBeers.forEach((beer) => {
                console.log(beer)
                beerList.innerHTML += singleBeer(beer)
            })
        })
}
allTheBeers()


//helper method for beer names to show up (each) on the LIST

const singleBeer = (beer) => {
    return `
  <li class="list-group-item" id="${beer.id}">${beer.name}</li>`
}

//helper method to display each beer details 

const beerDetails = (beer) => {
    return` <h1>${beer.name}</h1>
        <img src="${beer.image_url}">
            <h3>${beer.tagline}</h3>
            <textarea>${beer.description}</textarea>
            <button id="edit-beer" class="btn btn-info">
                Save
</button>`

}

beerList.addEventListener('click', (event) => {
    let beerId = event.target.id
    fetch(`http://localhost:3000/beers/${beerId}`)
        .then(resp => resp.json())
    .then(data => beerDetail.innerHTML += beerDetails(data))
    
})


// my button couldn't work even when i console.log it, but if I update the details of "Beer A" then click on another beer, when I go back to "Beer A", the description should be updated. This would involve a patch in this case. THIS enables me to edit and update the description. I wrote out the patch on how it would look like.
saveBeer.addEventListener('click', (event) => { 
    console.log("ddefrf")
    event.preventDefault()  
    let newBeerDescription = beerDetails.event.description
    fetch(`http://localhost:3000/beers/${beerId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            'description': newBeerDescription,
            
        })
    }).then(res => res.json())
        .then(beer => beerDetail.innerHTML += beerDetails(beer))
})
