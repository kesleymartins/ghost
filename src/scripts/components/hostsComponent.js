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
    const a = document.createElement('a')
    const p = document.createElement('p')
    const small = document.createElement('small')

    a.setAttribute('href', host.url)
    a.setAttribute('target', '_blank')
    p.innerText = host.name
    small.innerText = host.url

    a.appendChild(p)
    a.appendChild(small)
    li.appendChild(a)

    return li
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
