// Constantes
const baseUrl = 'http://localhost:5678/api/'

// recupération des travaux 
async function getWorks() {
    try {
        const response = await fetch(baseUrl + 'works')
        const jsonTab = await response.json()

        return jsonTab
    } catch (error) {
        console.error(`Une erreur s'est produite: ${error.message}`)
    }
}

// récupération des catégories
async function getCategories() {
    try {
        const response = await fetch(baseUrl + 'categories')
        const jsonTab = await response.json()

        return jsonTab
    } catch (error) {
        console.error(`Une erreur s'est produite: ${error.message}`)
    }
}


//supprimer les travaux 
async function deleteWork(id) {
const token = sessionStorage.getItem('token')
response = await fetch('http://localhost:5678/api/works/'+ id, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + token },
})
}

//ajouter les travaux 
async function addWork(e, bodyData) {
    e.preventDefault()
    try {
        const token = window.sessionStorage.getItem('token')
        await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: bodyData,
        }).then((res) => {
            if (res.status === 201) {
                alert('Travail Ajouté')
            }
        })
    } catch (error) {
        console.error(`Une erreur s'est produite: ${error.message}`)
    }
}