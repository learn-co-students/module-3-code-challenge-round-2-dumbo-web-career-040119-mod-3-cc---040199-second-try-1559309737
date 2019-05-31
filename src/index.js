document.addEventListener('DOMContentLoaded', (event) => {
  const beerUl = document.querySelector('#list-group')


  fetch(`http://localhost:3000/beers`)
  .then(response => response.json())
  .then(beers => beers.forEach(listOfBeers))


  function listOfBeers(beer){
    const beerLi = document.createElement('li')
    beerLi.className = 'list-group-item'
    beerLi.innerHTML = beer.name
    beerUl.append(beerLi)
    beerLi.addEventListener('click', (event)=> {
      beerShow(beer, event)
    })
  }

  function beerShow(beer,event){
    const beerId = beer.dataset.id
    fetch(`http://localhost:3000/beers/${beerId}`)
    .then(response => response.json())
    .then(beer =>
// what we want to do is make our get fetch and then add those details to that div! We can pass through the fetch. 
    const beerDiv = document.querySelector('#beer-detail')
    beerDiv.innerHTML = `<h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea id="beer-text">${beer.description}</textarea>
    <button data-id=${beer.id} id="edit-beer" class="btn btn-info">
      Save
    </button>`
  }
  const beerDiv = document.querySelector('#beer-detail')
  const saveBtn = document.querySelector('#edit-beer')

  beerDiv.addEventListener('click', (event) => {
    if(event.target.className == 'btn btn-info'){
      saveBeer(event.target.parentNode.parentNode,event.target.dataset.id)
    }
  })

  function saveBeer(div,id){
    const beerText = div.querySelector('#beer-text').value
    fetch(`http://localhost:3000/beers/${id}`, {
      method:"PATCH",
      headers: {
        'Content-Type':'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({description: beerText})
    })
    .then(response => response.json())
    .then(updated => beerShow(updated))
  }


})
