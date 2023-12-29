// Contain API functions

// Constantes
const baseUrl = 'http://localhost:5678/api/'

// Variables

// Functions

// Get Works from DB
async function getWorks() {
    try {
        const response = await fetch(baseUrl + 'works')
        const jsonTab = await response.json()

        return jsonTab
    } catch (error) {
        console.error(`Une erreur s'est produite: ${error.message}`)
    }
}

async function getCategories() {
    try {
        const response = await fetch(baseUrl + 'categories')
        const jsonTab = await response.json()

        return jsonTab
    } catch (error) {
        console.error(`Une erreur s'est produite: ${error.message}`)
    }
}


