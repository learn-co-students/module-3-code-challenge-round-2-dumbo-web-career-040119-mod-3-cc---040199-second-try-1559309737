document.addEventListener("DOMContentLoaded", function(){
const getUl = document.querySelector('#list-group')
const getDiv = document.querySelector('#beer-detail')

//fetch all beer from database
function getAllBeer(){
  fetch('http://localhost:3000/beers')
  .then(res => res.json())
  .then(beers => {beers.forEach(displayBeer)})
}

//display all beer on the DOM
function displayBeer(beer){
  const newLi = document.createElement('li')
  newLi.dataset.id = beer.id
  newLi.className = 'list-group-item'
  newLi.innerHTML = beer.name
  getUl.append(newLi)

  newLi.addEventListener('click', function() {beerInfo(event, beer)})
}

//display beer info after click happens (replace everytime)
function beerInfo(event, beer){
  console.log(event);
  getDiv.innerHTML = `<h1>${beer.name}</h1>
<img src="${beer.image_url}">
<h3>${beer.tagline}</h3>
<textarea id='text'>${beer.description}</textarea>
<button data-id=${beer.id} id="edit-beer" class="btn btn-info button">
  Save
</button>`
}

  getDiv.addEventListener('click', updateText)

// update beer description(textarea)
  function updateText(event){
    // debugger
    //grab textarea
    const beerId = event.target.dataset.id
    // console.log(beerId);
    if (event.target.classList.contains('button')){
      //new value
      const textArea = document.querySelector('#text').value
      console.log(textArea);


      fetch(`http://localhost:3000/beers/${beerId}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          description: textArea
        })
      }).then(res => res.json())
        .then(data => {
          updateDom(data)
        })
    }
  }

function updateDom(data){
  let textInput = document.querySelector('#text').value
  console.log(textInput);
}








getAllBeer()

})
