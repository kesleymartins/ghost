function HostsStore() {
  this.storageName = "ghost_hosts"
  this.data = [] 

  this.fetchHosts = () => {
    const data = JSON.parse(localStorage.getItem(this.storageName))
    this.data = data ? data : []
  } 

  this.addHost = (newHost) => {
    const id = this.data.length
    newHost = { id, ...newHost }

    this.data.push(newHost)
    localStorage.setItem(this.storageName, JSON.stringify(this.data))
  }
  
  /**
    * Função para remover um host
    * 
    * @param {number} hostId
    */
  this.removeHost = (hostId) => {
    this.fetchHosts()
    this.data = this.data.filter(host => host.id !== hostId)
    localStorage.setItem(this.storageName, JSON.stringify(this.data))
  }
}

export { HostsStore }
