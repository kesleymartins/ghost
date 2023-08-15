function HostsComponent() {
  this.section = document.querySelector('#hosts')
  this.emptyMessage = this.section.querySelector('#empty')
  this.hostsList = this.section.querySelector('#list')

  this.mount = (hosts) => {
    if (hosts && hosts.length > 0) {
      this.hideEmptyMessage()
      this.cleanList()
      this.fillList(hosts)
    } else {
      this.hideHostsLists()
    }
  }

  this.fillList = (hosts) => {
    hosts.forEach(host => {
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

      this.hostsList.appendChild(li)
    })
  }

  this.cleanList = () => {
    this.hostsList.textContent = ''
  }

  this.hideEmptyMessage = () => {
    this.emptyMessage.setAttribute('hidden', true)
  }

  this.hideHostsLists = () => {
    this.hostsList.setAttribute('hidden', true)
  }
}

export { HostsComponent }
