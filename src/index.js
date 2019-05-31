document.addEventListener('DOMContentLoaded', event => {
  const sideBar = document.querySelector('#list-group');
  const beerDiv = document.querySelector('#beer-detail');


  const createList = (beer) => {
    sideBar.innerHTML += `
     <li data-id = ${beer.id} class="list-group-item">${beer.name}</li>
    `
  }

  const updateBeerOnServer = (beerId, beerDescription) => {

    fetch(`http://localhost:3000/beers/${beerId}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          description: beerDescription
        })
    })
  }

  const displayBeer = (beer) => {

    beerDiv.innerHTML = `
    <h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button data-id = ${beer.id} id="edit-beer" class="btn btn-info">
      Save
    </button>
    `
    const editButton = beerDiv.querySelector('#edit-beer');

    editButton.addEventListener('click', event => {
      // console.log(beer.id);
      let beerId = beer.id
      let beerDescription = beerDiv.querySelector('textarea').value;
      updateBeerOnServer(beerId, beerDescription)

    });

  }


  // listening for a click on the sideBar LI then
  sideBar.addEventListener('click',  event => {
    fetch(`http://localhost:3000/beers/${event.target.dataset.id}`)
    .then(res => res.json())
    .then(beer => {
      displayBeer(beer)
    })
  });



  // make a Get request to the server
  fetch("http://localhost:3000/beers")
  .then(res => res.json())
  .then(beersArray => {
    beersArray.forEach(beer => {
      createList(beer)
    })
  })

});
