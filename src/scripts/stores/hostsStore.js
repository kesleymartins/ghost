import '../utils/types.js'

/**
 * Store para lidar com o CRUD de Host
 */
function HostsStore() {
  /** @type {Array<Host>} */
  this.data = [] 

  /** @type {string} */
  const storageName = "ghost_hosts"
  
  /**
   * Atualiza os dados locais com os do localStorage
   */
  this.fetchHosts = () => {
    const data = JSON.parse(localStorage.getItem(storageName))
    this.data = data ? data : []
  } 

  /**
   * Adiciona um host no localStorage
   *
   * @param {Host} newHost
   */
  this.addHost = (newHost) => {
    const id = this.data.length
    newHost = { id, ...newHost }

    this.data.push(newHost)
    localStorage.setItem(storageName, JSON.stringify(this.data))
  }
  
  /**
   * Remove um Host pelo Id 
   * 
   * @param {number} hostId
   */
  this.removeHost = (hostId) => {
    this.fetchHosts()
    this.data = this.data.filter(host => host.id !== hostId)
    localStorage.setItem(storageName, JSON.stringify(this.data))
  }
}

export { HostsStore }
