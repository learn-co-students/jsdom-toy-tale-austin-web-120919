let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{

  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => displayToys(json))


  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      const toySubmit = document.querySelector('.add-toy-form');
      toySubmit.addEventListener('submit', e => {
        e.preventDefault();
        fetch('http://localhost:3000/toys', {
          method: "POST",
          headers: 
              {
                "Content-Type": "application/json",
                'Accept': "application/json"
              },
          body: JSON.stringify({
                "name": document.getElementsByName('name')[0].value,
                "image": document.getElementsByName('image')[0].value,
                "likes": 0
              })
          })
          .then(toyForm.style.display = 'none')
      })
    } else {
      toyForm.style.display = 'none'
    }
  })

})

function displayToys(json){
  for(const object of json){
    cardCreator(object);
  }
}

function cardCreator(toy){
  const toyCollection = document.getElementById('toy-collection');
  const card = document.createElement('div');
  card.className = 'card';
  toyCollection.appendChild(card);
  const h2 = document.createElement('h2');
  h2.innerText = toy.name;
  card.appendChild(h2);
  const img = document.createElement('img');
  img.src = toy.image;
  img.className = 'toy-avatar';
  card.appendChild(img);
  let likes = document.createElement('p');
  likes.append(toy.likes);
  card.appendChild(likes);
  const button = document.createElement('button');
  button.className = 'button';
  button.innerText = 'like <3'
  button.addEventListener('click', (e) => likeToy(toy, e.target))
  card.appendChild(button);
}

function likeToy(toy, button){
  console.log(toy)
  fetch(`http://localhost:3000/toys/${toy.id}`, config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }, 
    body: JSON.stringify({likes: toy.likes + 1}, {id: toy.id})
  }
  )
  button.previousSibling.innerText = toy.likes;
}