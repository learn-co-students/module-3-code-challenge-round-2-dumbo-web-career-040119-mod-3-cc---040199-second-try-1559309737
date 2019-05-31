fetch("http://localhost:3000/beers")
  .then(res => res.json())
  .then(data => data.forEach(slap))

  const ul = document.querySelector("ul#list-group.list-group")
  function slap(data) {
    ul.innerHTML += `<li data-id=${data.id} class="list-group-item">${data.name}</li>`

  }

  ul.addEventListener("click", event => {
    const beerId = event.target.dataset.id;
    const div = document.querySelector("div#beer-detail")
    fetch(`http://localhost:3000/beers/${beerId}`)
      .then(res => res.json())
      .then(data => {
        div.innerHTML = `<h1>${data.name}</h1>
                    <img src="${data.image_url}">
                    <h3>${data.tagline}</h3>
                    <textarea data-id="${data.id}">${data.description}</textarea>
                    <button id="edit-beer" class="btn btn-info" data-id="${data.id}">
                      Save
                    </button>`
        const input = document.querySelector("textarea")
        const edit = document.querySelector("button#edit-beer.btn.btn-info")
          edit.addEventListener("click", event => {

            const beerId = event.target.dataset.id;
            fetch(`http://localhost:3000/beers/${beerId}`, {
              method: "PATCH",
              headers: {"Content-Type" : "application/json",
                        "Accept" : "application/json"},
              body: JSON.stringify({
                description: input.value
              })
            })
              .then(res => res.json())
              .then(data => {
                // console.log(event.target)
                // debugger
                input.innerText = data.description
          })
      })
  })
})
