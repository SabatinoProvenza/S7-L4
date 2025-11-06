const buttonLoad1 = document.getElementById("loadBtn")
const buttonLoad2 = document.getElementById("loadBtn2")
const urlbuttonLoad1 = "https://api.pexels.com/v1/search?query=hamsters"
const urlbuttonLoad2 = "https://api.pexels.com/v1/search?query=tigers"

const API_KEY = "8tye6M9IMJh5zQ9J1XbKKxG1I9H6OS8kjdPitVpFlRDm2IARYJwaCePO"

const loadImages = (url) => {
  fetch(url, {
    headers: { Authorization: API_KEY },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Errore nella risposta!")
      }
    })
    .then((data) => {
      const cards = document.querySelectorAll(".card")

      cards.forEach((card, i) => {
        const img = card.querySelector(".card-img-top")
        img.src = data.photos[i].src.medium

        const idText = card.querySelector(".text-muted")
        idText.textContent = data.photos[i].id
      })
    })
    .catch((err) => console.log(err))
}

buttonLoad1.addEventListener("click", () => loadImages(urlbuttonLoad1))
buttonLoad2.addEventListener("click", () => loadImages(urlbuttonLoad2))

const hideCard = function () {
  const buttons = document.querySelectorAll(".hide")

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".card")
      card.remove()
    })
  })
}

hideCard()

const searchBtn = document.getElementById("searchBtn")
const searchInput = document.getElementById("searchInput")

searchBtn.addEventListener("click", () => {
  const query = searchInput.value

  fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=9`, {
    headers: {
      Authorization: API_KEY,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Errore nella risposta!")
      }
    })
    .then((data) => {
      const cards = document.querySelectorAll(".card")

      cards.forEach((card, i) => {
        const img = card.querySelector(".card-img-top")
        img.src = data.photos[i].src.medium

        const idText = card.querySelector(".text-muted")
        idText.innerText = data.photos[i].id
      })
      searchInput.value = ""
    })
    .catch((err) => console.log(err))
})
