// Contain JavaScript code used by Index.html

// DOM Elements

const galleryElement = document.querySelector('.gallery')

// Variables

// Code
getWorks().then((data) => {
    displayWorks(data)
})

// Functions

// Display works in Gallery
function displayWorks(worksArray) {
    worksArray.forEach((work) => {
        const figureElement = document.createElement('figure')
        const imgElement = document.createElement('img')
        imgElement.setAttribute('src', work.imageUrl)
        imgElement.setAttribute('alt', work.title)
        const captionElement = document.createElement('figcaption')
        captionElement.textContent = work.title

        figureElement.append(imgElement)
        figureElement.append(captionElement)

        galleryElement.append(figureElement)
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
            displayWorks(data)
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
                displayWorks(filteredArray)
            })
        })
        filters.append(buttonElement)
    })
}
createFilters()
