const beerUrl = "http://localhost:3000/beers"

function getBeers(){
    fetch(beerUrl)
    .then(resp => resp.json())
    .then(data => data.forEach(displayBeers))
}

function displayBeers(beer){
    // console.log(beer)
    const beerList = document.querySelector(".list-group")
    const beerDiv = document.createElement("div")
    beerDiv.innerHTML =
    `
    <ul class="list-group">
        <li class="list-group-item">${beer.name}</li>
    </ul>
    `
    beerList.append(beerDiv)
    const bigDiv = document.querySelector(".col-md-4")
    bigDiv.append(beerList)

    beerDiv.addEventListener("click", function(event){
        event.preventDefault()
        displayBeerInfo(event, beer)
    })
}

function displayBeerInfo(event, beer){
    event.preventDefault()
    const infoCard = document.querySelector("#beer-detail")
    infoCard.innerHTML = ""
    const infoDiv = document.createElement("div")
    infoDiv.innerHTML =
    `
    <h1>${beer.name}</h1>
    <img src=${beer.image_url}>
    <h3>${beer.tagline}</h3>
    <textarea data-beer-id = ${beer.id} id="text-area">${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
    Save
    </button>
    `
    infoCard.append(infoDiv)
    const button = document.querySelector("#edit-beer")
    button.addEventListener("click", function(event){
        updateBeerDetail(event, beer)
    })
}

function updateBeerDetail(event, beer){
    event.preventDefault()
    console.log("IM INSIDE THIS FUNCTION")
    const input = document.querySelector("#text-area")
    // const newVal = input.value
    // input.innerHTML = newVal
     const newVal = input.innerHTML
    //event.target.parentNode.querySelector("#text-area").innerHTML = newVal
    // debugger    
    
    fetch(`http://localhost:3000/beers/${beer.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({description: input.value})
    })
    // .then(resp => resp.json())
    // .then(data => {
       
    // })
}

document.addEventListener("DOMContentLoaded", function(event){
    getBeers()
  
})