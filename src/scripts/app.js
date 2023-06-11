const storagePrefix = "ghost"

// Data Setup
let data = localStorage.getItem(`${storagePrefix}_data`)

if (data) {
    data = JSON.parse(data)
} else {
    default_data = {
        "links": [] 
    }

    localStorage.setItem(`${storagePrefix}_data`, JSON.stringify(default_data))
    data = default_data
}

// Form Logic
const formSection = document.querySelector('section#form')
const formToggleButton = formSection.querySelector('button#toggler')
const form = formSection.querySelector('form')

formToggleButton.addEventListener('click', event => {
    event.preventDefault()

    form.classList.toggle('hide')
})

form.addEventListener('submit', event => {
    event.preventDefault()

    const nameInput = form.querySelector('input#name')
    const urlInput = form.querySelector('input#url')

    data.links.push({
        id: data.links.length + 1,
        name: nameInput.value,
        url: urlInput.value
    })

    localStorage.setItem(`${storagePrefix}_data`, JSON.stringify(data))
})