const galleryElement = document.querySelector('.gallery')
const modalGalleryElement = document.querySelector('.modal-gallery')

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
