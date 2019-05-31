document.addEventListener('DOMContentLoaded', function(e) {

const listUl = document.getElementById('list-group')
const beerDetail = document.getElementById('beer-detail')

function loadAllBeer(){
  fetch("http://localhost:3000/beers")
  .then(res => res.json())
  .then(data => data.forEach(showItOnTheDOM))
}

function showItOnTheDOM(beer){
  listUl.innerHTML += `<li class="list-group-item" data-id="${beer.id}" id="listed-beer-${beer.id}">${beer.name}</li>`
}

listUl.addEventListener('click', displayBeerDetail)

function displayBeerDetail(event){
  if(event.target.classList.contains("list-group-item")){
    const beerId = event.target.dataset.id
    // console.log(beerId)

    fetch(`http://localhost:3000/beers/${beerId}`)
    .then(res => res.json())
    .then(beer => {console.log(beer)
      beerDetail.innerHTML =`<h1>${beer.name}</h1>
      <img src="${beer.image_url}">
      <h3>${beer.tagline}</h3>
      <textarea id="new-desc-${beer.id}">${beer.description}</textarea>
      <button id="edit-beer-${beer.id}" class="btn btn-info" data-id="${beer.id}">
        Save
      </button>`
      })
  }
}


beerDetail.addEventListener('click', editDescription)

function editDescription(event){
  const beerId = event.target.dataset.id
  console.log(beerId)
  const newDesc = document.getElementById(`new-desc-${beerId}`)
  console.log(newDesc)
  console.log(newDesc.value)
  const description = newDesc.value
  console.log(description)

  fetch(`http://localhost:3000/beers/${beerId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      description
    })
  })
  // .then(res => res.json())
  // .then(data => {console.log(data)})



}







loadAllBeer()

})
