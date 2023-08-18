import { HostsStore } from "../stores/hostsStore.js"

/**
 * Componente para realizar a listagem de Hosts 
 *
 * @constructor
 *
 * @param {HostsStore} hostsStore 
 */
function HostsComponent(hostsStore) {
  this.hostsStore = hostsStore

  this.section = document.querySelector('#hosts')
  this.emptyMessage = this.section.querySelector('#empty')
  this.hostsList = this.section.querySelector('#list')
  
  /**
   * Lógica de inicialização
   */
  this.mount = () => {
    this.updateView()
  }

  /**
   * Logica de atualização
   */
  this.update = () => {
    this.updateView()
  }

  /**
   * Verifica se existem hosts cadastrados
   * para renderizar o subcomponent correto
   *
   * @private
   */
  this.updateView = () => {
    this.hostsStore.fetchHosts()

    if (this.hostsStore.data && this.hostsStore.data.length > 0) {
      this.setupHostsList()
      this.renderHostsList()
    } else {
      this.renderEmptyMessage()
    }
  }

  /**
   * Limpa a listagem e gera uma nova lista
   *
   * @private
   */
  this.setupHostsList = () => {
    this.clearHostsList()

    this.hostsStore.data.forEach(host => {
      const listItem = this.createListItem(host) 
      
      this.hostsList.appendChild(listItem)
    })
  }
  
  /**
   * Cria o item do Host e anexa na listagem
   *
   * @private
   *
   * @param {Object} host
   * @param {number} host.id    - Identificação do Host
   * @param {string} host.name  - Nome do Host
   * @param {string} host.url   - link de redirecionamento do host 
   *
   * @returns {HTMLElement}     - Um elemento <li>
   */
  this.createListItem = (host) => {
    const li = document.createElement('li')
    li.setAttribute('id', host.id)

    li.appendChild(this.createLink(host))
    li.append(this.createRemoveButton(host.id))

    return li
  }
  
  /**
   * Cria o link de redirecionamento de um Host
   *
   * @private
   *
   * @param {Object} host
   * @param {string} host.id    - Identificação do Host
   * @param {string} host.name  - Nome do Host
   * @param {string} host.url   - link de redirecionamento do host
   *
   * @return {HTMLElement}      - um elemento <a>
   */
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

  /**
   * Cria o elemento com a lógica de remoção de um Host
   *
   * @private
   *
   * @param {number} hostId   - Identificação do Host
   *
   * @return {HTMLElement}    -  Um elemento <span>
   */
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
      this.updateView()
    })

    return span
  }

  /**
   * Remove todos os Hosts listados atualmente
   *
   * @private
   */
  this.clearHostsList = () => {
    this.hostsList.textContent = ''
  }

  /**
   * Mostra a listagem de Hosts e
   * oculta a mensagem de informação
   *
   * @private
   */
  this.renderHostsList = () => {
    this.hostsList.removeAttribute('hidden')
    this.emptyMessage.setAttribute('hidden', '')
  }
  
  /**
   * Mostra a mensagem de informação e 
   * oculta a listagem de Hosts
   *
   * @private
   */
  this.renderEmptyMessage = () => {
    this.emptyMessage.removeAttribute('hidden')
    this.hostsList.setAttribute('hidden', '')
  }
}

export { HostsComponent }
