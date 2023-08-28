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
   * Busca um host pelo id
   * 
   * @param {number} hostId   - Identificação do host
   *
   * @returns {Host}
   */
  this.fetchById = (hostId) => {
    const host = this.data.filter(host => host.id === hostId)[0]
    return host
  }
 
  /**
   * Adiciona um host
   *
   * @param {Host} newHost    - Dados do host para salvar
   */
  this.addHost = (newHost) => {
    newHost.id = this.data.length

    this.data.push(newHost)
    localStorage.setItem(storageName, JSON.stringify(this.data))
  }
  
  /**
   * Remove um Host pelo Id 
   * 
   * @param {number} hostId     - Identificação do Host 
   */
  this.removeHost = (hostId) => {
    this.data = this.data.filter(host => host.id !== hostId)
    localStorage.setItem(storageName, JSON.stringify(this.data))
  }
}

export { HostsStore }
