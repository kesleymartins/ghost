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
      this.setupHostsList()
      this.renderHostsList()
    } else {
      this.renderEmptyMessage()
    }
  }

  this.setupHostsList = () => {
    this.clearHostsList()

    this.hostsStore.data.forEach(host => {
      const listItem = this.createListItem(host) 
      this.hostsList.appendChild(listItem)
    })
  }

  this.createListItem = (host) => {
    const li = document.createElement('li')
    li.setAttribute('id', host.id)

    li.appendChild(this.createLink(host))
    li.append(this.createRemoveButton(host.id))

    return li
  }

  this.createLink = (host) => {
    const a = document.createElement('a')
    const p = document.createElement('p')
    const small = document.createElement('small')

    a.setAttribute('href', host.url)
    a.setAttribute('target', '_blank')
    p.innerText = host.name
    small.innerText = host.url
    
    a.appendChild(p)
    a.appendChild(small)

    return a
  }

  this.createRemoveButton = (hostId) => {
    const span = document.createElement('span')
    const img = document.createElement('img')

    span.classList.add('icon')
    img.setAttribute('src', './icons/close.svg')
    img.setAttribute('alt', 'trash icon')

    span.appendChild(img)

    span.addEventListener('click', (event) => {
      event.preventDefault()
     
      this.hostsStore.removeHost(hostId)
      this.updateview()
    })

    return span
  }

  this.clearHostsList = () => {
    this.hostsList.textContent = ''
  }

  this.renderHostsList = () => {
    this.hostsList.removeAttribute('hidden')
    this.emptyMessage.setAttribute('hidden', '')
  }

  this.renderEmptyMessage = () => {
    this.emptyMessage.removeAttribute('hidden')
    this.hostsList.setAttribute('hidden', '')
  }
}

export { HostsComponent }
