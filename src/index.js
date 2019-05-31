document.addEventListener('DOMContentLoaded', (event) => {
    // console.log('DOM working');
  //grab beer
    function getAllBeers() {
      fetch("http://localhost:3000/beers")
      .then(response => response.json())
      .then(beers => {beers.forEach(slapItOnTheDom)})
      //console.log
}

const divTag = document.querySelector("#beer-detail")
const ulTag = document.getElementById('list-group')
const editBeer = document.getElementById("edit-beer")

  function slapItOnTheDom(beer) {
    // debugger
    // console.log(beer)
    const showBeerLi = `<li data-id=${beer.id} class="list-group-item beerclick">${beer.name}</li>`
    ulTag.innerHTML += showBeerLi
    // let ul = document.createElement('ul')
    // ul.className = 'list-group'


  }

  function showBeerInfo(beer) {
    divTag.innerHTML = ""
    const showBeer = `<h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button data-id="${beer.id}"id="edit-beer" class="btn btn-info">
    Save
    </button>`
    divTag.innerHTML += showBeer
  }
  // const liTag =
  ulTag.addEventListener('click', displayBeer)

  function displayBeer(event) {
    console.log(event.target.classList)
    if(event.target.classList.contains('beerclick')){
      const beerId = event.target.dataset.id

      fetch(`http://localhost:3000/beers/${beerId}`)
      .then(response => response.json())
      .then(showBeerInfo)
      //this shoould execute when save btn is clicked.
    } else if(event.target.classList.contains('btn')) {
      console.log("patch")
      const beerId = event.target.dataset.id
      const editBeer = document.getElementById('edit-beer')
      const newEdit = editBeer.innerText.value

      fetch(`http://localhost:3000/beers/${beerId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          description: editBeer
        })
      }).then(response => response.json())
      .then(data => {
        console.log(data)
        // editBeer.innerHTML = newEdit
      })
    }
  }



   // create a new funtion for save butten instead of adding it to the click
   // create submit addEventListener
//
//   editBeer.addEventListener("submit", beerEdit)
//   function beerEdit(event) {
//     console.log(event)
//     if(event.target.classList.contains('btn')) {
//       const beerId = event.target.dataset.id
//       const btnTag = document.getElementById('edit-beer')
//       const newEdit = btnTag.innerText.value
//       fetch(`http://localhost:3000/beers/${beerId}`, {
//         method: "PATCH",
//         headers: {
//   'Content-Type': 'application/json',
//   'Accept': 'application/json'
// },
// body: JSON.stringify({
//   description:
// })
//
//       }
//     }

  // }

  //   console.log(event)
  //   if(event.target.classList.contains('btn')) {
  //     const beerId = event.target.dataset.id
  //     const btnTag = document.getElementById('edit-beer')
  //     const newEdit = btnTag.innerText.value
  //
  //     fetch(`http://localhost:3000/beers/${beerId}`, {
  //       method: "PATCH",
  //       headers: {
  //           'Content-Type': 'application/json',
  //           'Accept': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         description: editBeer
  //       })
  //     }).then(response => response.json())
  //     .then(data => {
  //       console.log(data)
  //       // editBeer.innerHTML = newEdit
  //     })


    getAllBeers()
});
