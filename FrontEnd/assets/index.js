// Contain JavaScript code used by Index.html

// DOM Elements

const galleryElement = document.querySelector('.gallery')
const modalGalleryElement = document.querySelector('.modal-gallery')

// Variables

let isLogged = ''

// Code
getWorks().then((data) => {
    displayWorks(data, false)
})

// Functions

// Display works in Gallery
function displayWorks(worksArray, modal) {
    worksArray.forEach((work) => {
        const figureElement = document.createElement('figure')
        const imgElement = document.createElement('img')
        imgElement.setAttribute('src', work.imageUrl)
        imgElement.setAttribute('alt', work.title)
        const captionElement = document.createElement('figcaption')
        captionElement.textContent = work.title
        if (!modal) {
            figureElement.append(imgElement)
            figureElement.append(captionElement)

            galleryElement.append(figureElement)
        } else {
            const trashbin = document.createElement('i')
            trashbin.classList.add('fa-solid', 'fa-trash-can')
            figureElement.append(imgElement)
            figureElement.append(trashbin)
            modalGalleryElement.append(figureElement)
        }
    })
}

async function createFilters() {
    const filters = document.querySelector('.filters')
    const categories = await getCategories()
    console.log(categories)
    let buttonElement = document.createElement('button')
    buttonElement.textContent = 'Tous'
    filters.append(buttonElement)
    buttonElement.addEventListener('click', (e) => {
        getWorks().then((data) => {
            galleryElement.innerHTML = ''
            displayWorks(data, false)
        })
    })

    categories.forEach((cat) => {
        buttonElement = document.createElement('button')
        buttonElement.textContent = cat.name
        buttonElement.addEventListener('click', (e) => {
            getWorks().then((data) => {
                let filteredArray = data.filter(function (work) {
                    return work.categoryId == cat.id
                })
                galleryElement.innerHTML = ''
                displayWorks(filteredArray, false)
            })
        })
        filters.append(buttonElement)
    })
}

function updateLink() {
    const loginLink = document.querySelector('#login-link')
    isLogged = localStorage.getItem('token')
    console.log(isLogged)
    if (isLogged) {
        loginLink.textContent = 'logout'
        loginLink.setAttribute('href', '#')
        console.log('oui')
        loginLink.addEventListener('click', (e) => {
            e.preventDefault()
            userLogOut()
        })
    } else {
        loginLink.textContent = 'login'
        loginLink.setAttribute('href', './login.html')
        console.log('non')
    }
}

function userLogOut() {
    localStorage.clear()
    window.location.reload()
    updateLink()
}

createFilters()
updateLink()

//affichage des images dans la modal//
