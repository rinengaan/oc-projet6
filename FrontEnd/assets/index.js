// Contain JavaScript code used by Index.html

// DOM Elements//
const galleryElement = document.querySelector('.gallery')
const modalGalleryElement = document.querySelector('.modal-gallery')
const headerElement = document.querySelector('header')
// Variables//
let isLogged = ''

// Code//
getWorks().then((data) => {
    displayWorks(data, false)
})

// fonctions//
// affichage des travaux dans la galerie//
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
            trashbin.addEventListener('click', () => {
                deleteWork(work.id).then(
                    getWorks().then((data) => {
                        galleryElement.innerHTML = ''
                        displayWorks(data, false)
                        modalGalleryElement.innerHTML = ''
                        displayWorks(data, true)
                    })
                )
            })
            figureElement.append(imgElement)
            figureElement.append(trashbin)
            modalGalleryElement.append(figureElement)
        }
    })
}
//création des filtres//
async function createFilters() {
    const filters = document.querySelector('.filters')
    const categories = await getCategories()
    console.log(categories)
    let buttonElement = document.createElement('button')
    buttonElement.textContent = 'Tous'
    filters.append(buttonElement)
    //ajout de la classe active sur le boutton "tous" par defaut//
    buttonElement.classList.add('active', 'filter')
    buttonElement.addEventListener('click', (e) => {
        removeActive()
        e.target.classList.add('active')
        getWorks().then((data) => {
            galleryElement.innerHTML = ''
            displayWorks(data, false)
        })
    })

    categories.forEach((cat) => {
        buttonElement = document.createElement('button')
        buttonElement.textContent = cat.name
        buttonElement.classList.add('filter')
        buttonElement.addEventListener('click', (e) => {
            //ajout de la classe active sur le boutton en cours, retrait de la classe active sur les autres bouttons//
            removeActive()
            e.target.classList.add('active')
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
    // si l'utilisateur est connecté les filtres sont masqués//
    filtersHidden()
}

//retrait de la classe active
function removeActive() {
    const filterElements = document.querySelectorAll('.filter')
    filterElements.forEach((filter) => {
        filter.classList.remove('active')
    })
}

//filtres masqués
function filtersHidden() {
    if (window.sessionStorage.getItem('token') !== null) {
        const elementsFilter = document.querySelectorAll('.filter')
        for (let index = 0; index < elementsFilter.length; index++) {
            elementsFilter[index].hidden = true
        }
    }
}

//si connection utilisateur
function updateLink() {
    const loginLink = document.querySelector('#login-link')
    isLogged = sessionStorage.getItem('token')
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
//deconnection
function userLogOut() {
    sessionStorage.clear()
    window.location.reload()
    updateLink()
}

//affcichage de la bannière mode éditon
function addBannerEdit() {
    //si l'utilisateur est connecté
    if (window.sessionStorage.getItem('token') !== null) {
        let bannerEdit = document.createElement('div')
        bannerEdit.classList.add('edit-banner')
        bannerEdit.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>
	<p>Mode édition</p>`
        let body = headerElement.parentElement
        body.insertBefore(bannerEdit, headerElement)
    }
}

//affichage boutton modifier
function addEditButton() {
    if (window.sessionStorage.getItem('token') !== null) {
        const editButton = document.createElement('span')
        editButton.classList.add('edit-button')
        editButton.innerHTML += `<i class="fa-regular fa-pen-to-square"></i>Modifer`
        editButton.addEventListener('click', openGalleryModal)
        const elementProjet = document.querySelector('.projets')
        elementProjet.appendChild(editButton)
    }
}

//appel des fonctions
createFilters()
updateLink()
addBannerEdit()
addEditButton()
