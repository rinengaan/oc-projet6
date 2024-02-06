const modalGalleryContainer = document.querySelector('.modal-gallery-container')
modalGalleryContainer.addEventListener('click', closeModals)
const modalAddContainer = document.querySelector('.modal-add-container')
modalAddContainer.addEventListener('click', closeModals)
const modalGallery = document.querySelector('#modal-gallery')
const modalAdd = document.querySelector('#modal-add')
modalGallery.addEventListener('click', (e) => {
    e.stopPropagation()
})
modalAdd.addEventListener('click', (e) => {
    e.stopPropagation()
})
let focusablesElements = []
let selectedFile = null
let fullFillForm = false
let formData = null

function openGalleryModal() {
    getWorks().then((data) => {
        modalGalleryElement.innerHTML = ''
        displayWorks(data, true)
        openModal(modalGalleryContainer)
    })
}

function closeModals() {
    closeModal(modalGalleryContainer)
    closeModal(modalAddContainer)
}

function openModal(modalContainer) {
    modalContainer.style.display = 'flex'
}

function closeModal(modalContainer) {
    modalContainer.style.display = 'none'
}

const cancelButton = document.querySelector('.cancel')
cancelButton.addEventListener('click', closeModals)

const closeButton = document.querySelector('.close-add')
closeButton.addEventListener('click', closeModals)

function openAddModal() {
    closeModal(modalGalleryContainer)
    openModal(modalAddContainer)
}

const addButton = document.querySelector('#add')
addButton.addEventListener('click', openAddModal)

const fileInput = document.querySelector('#myfile')
fileInput.addEventListener('input', displaySelectedImg)

function displaySelectedImg() {
    const preview = document.querySelector('.preview')
    console.log(preview)
}
//fleche retour modal ajout
const returnButton = document.querySelector('.fa-arrow-left')
returnButton.addEventListener('click', (e) => {
    closeModal(modalAddContainer)
    openGalleryModal()
})

// affichage de l'image sélectionée dans le formulaire d'ajout
const fileElement = document.querySelector('#myfile')
const imageElement = document.querySelector('.preview')
const imagePlaceholder = document.querySelector('.imagePH')
const addImageButton = document.querySelector('.button-add')
const fileRequiermentElement = document.querySelector('.add-img p')
fileElement.addEventListener('change', function (e) {
    e.preventDefault()
    selectedFile = fileElement.files[0]
    if (selectedFile) {
        imageElement.src = URL.createObjectURL(selectedFile)
        imageElement.style.display = 'flex'
        imagePlaceholder.style.display = 'none'
        fileRequiermentElement.style.display = 'none'
        addImageButton.style.display = 'none'
    }
})

//vide les champs du formulaire
function clearSelected() {
    if (selectedFile) {
        imageElement.style.display = 'none'
        imagePlaceholder.style.display = null
        fileRequiermentElement.style.display = null
        addImageButton.style.display = null
        selectedFile = null
        workTitle = ''
        selectedcategory = 'none'
        formData = null
        categorySelect.value = 'none'
        titleElement.value = ''
        fileElement.files = null
    }
}

// ajout des catégories dans la liste déroulante
const categorySelect = document.getElementById('select-input')
categorySelect.innerHTML = ''
getCategories().then((dataCat) => {
    // première option vide (ésthétique)
    let option = document.createElement('option')
    option.value = 'none'
    option.text = ''
    categorySelect.appendChild(option)
    dataCat.forEach((category) => {
        option = document.createElement('option')
        option.value = category.id
        option.text = category.name
        categorySelect.appendChild(option)
    })
})

// création de la FormData (donées du formulaire, mise en forme)
function createFormData() {
    formData = new FormData()
    formData.append('image', fileElement.files[0])
    formData.append('title', titleElement.value)
    formData.append('category', categorySelect.value)
}

// verification des champs du formulaire (ajout image)
function isFormFilled() {
    const isImageSelected = fileElement.files.length > 0
    const isTitleFilled = titleElement.value.trim() !== ''
    const isCategorySelected =
        categorySelect.value !== '' && categorySelect.value !== 'none'
    if (isImageSelected && isTitleFilled && isCategorySelected) {
        return true
    } else {
        return false
    }
}

const addWorkForm = document.querySelector('.form-work')
const titleElement = document.querySelector('#title')
addWorkForm.addEventListener('change', () => {
    let fullFillForm = isFormFilled()
    // bascule entre enabled et disabled si tout est rempli dans le formulaire
    if (fullFillForm) {
        createFormData()
        confirmButton.classList.remove('disabled')
        confirmButton.disabled = false
    } else {
        confirmButton.classList.add('disabled')
        confirmButton.disabled = true
        formData = null
    }
})

// gestion du boutton valider
const confirmButton = document.querySelector('.confirm-add')
confirmButton.classList.add('disabled')
confirmButton.disabled = true
confirmButton.addEventListener('click',  (e) => {
    addWork(e, formData).then(async() => {
        galleryElement.innerHTML = ''
        displayWorks( await getWorks(), false)
    })
    clearSelected()
})
