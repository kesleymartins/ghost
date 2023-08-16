import { HostsStore } from "../stores/hostsStore.js"

/**
  * Store para lidar com o CRUD de hosts no localStorage
  *
  * @param {HostsStore} hostsStore 
  */
function HostsComponent(hostsStore) {
  this.hostsStore = hostsStore

  this.section = document.querySelector('#hosts')
  this.emptyMessage = this.section.querySelector('#empty')
  this.hostsList = this.section.querySelector('#list')

  this.mount = () => {
    this.updateview()
  }

  this.update = () => {
    this.updateview()
  }

  this.updateview = () => {
    this.hostsStore.fetchHosts()

    if (this.hostsStore.data && this.hostsStore.data.length > 0) {
      this.hideEmptyMessage()
      this.renderHostsList()
    } else {
      this.hideHostsList()
    }
  }

  this.renderHostsList = () => {
    this.clearHostsList()

    this.hostsStore.data.forEach(host => {
      const listItem = this.createListItem(host) 
      this.hostsList.appendChild(listItem)
    })
  }

  this.createListItem = (host) => {
    const li = document.createElement('li')
    const span = document.createElement('span')
    const img = document.createElement('img')
    const a = document.createElement('a')
    const p = document.createElement('p')
    const small = document.createElement('small')
        
    li.setAttribute('id', host.id)
    
    span.classList.add('icon')
    this.setupHostRemoveEvent(span, host.id)

    img.setAttribute('src', './icons/close.svg')
    img.setAttribute('alt', 'trash icon')

    a.setAttribute('href', host.url)
    a.setAttribute('target', '_blank')
    p.innerText = host.name
    small.innerText = host.url
    
    span.appendChild(img)
  
    a.appendChild(p)
    a.appendChild(small)

    li.appendChild(a)
    li.append(span)

    return li
  }

  this.setupHostRemoveEvent = (button, hostId) => {
    button.addEventListener('click', (event) => {
      event.preventDefault()
     
      this.hostsStore.removeHost(hostId)
      this.updateview()
    })
  }

  this.clearHostsList = () => {
    this.hostsList.textContent = ''
  }

  this.hideEmptyMessage = () => {
    this.emptyMessage.setAttribute('hidden', true)
  }

  this.hideHostsList = () => {
    this.hostsList.setAttribute('hidden', true)
  }
}

export { HostsComponent }
