import { HostsStore } from "../stores/hostsStore.js"

/**
 * Componente para realizar a listagem de Hosts 
 *
 * @constructor
 *
 * @param {HostsStore} hostsStore 
 */
function HostsComponent(hostsStore) {
  const emptyMessage = document.querySelector('#hosts #empty')
  const hostsList = document.querySelector('#hosts #list')
  
  /**
   * Lógica de inicialização
   */
  this.mount = () => {
    updateView()
  }

  /**
   * Logica de atualização
   */
  this.update = () => {
    updateView()
  }

  /**
   * Verifica se existem hosts cadastrados
   * para renderizar o subcomponent correto
   *
   * @private
   */
  function updateView() {
    hostsStore.fetchHosts()

    if (hostsStore.data && hostsStore.data.length > 0) {
      setupHostsList()
      renderHostsList()
    } else {
      renderEmptyMessage()
    }
  }

  /**
   * Limpa a listagem e gera uma nova lista
   *
   * @private
   */
  function setupHostsList() {
    clearHostsList()

    hostsStore.data.forEach(host => {
      const listItem = createListItem(host)
      
      hostsList.appendChild(listItem)
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
  function createListItem(host) {
    const li = document.createElement('li')
    li.setAttribute('id', host.id)

    li.appendChild(createLink(host))
    li.append(createRemoveButton(host.id))

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
  function createLink(host) {
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
  function createRemoveButton(hostId) {
    const span = document.createElement('span')
    const img = document.createElement('img')

    span.classList.add('icon')
    img.setAttribute('src', './icons/close.svg')
    img.setAttribute('alt', 'trash icon')

    span.appendChild(img)

    span.addEventListener('click', (event) => {
      event.preventDefault()

      hostsStore.removeHost(hostId)
      updateView()
    })

    return span
  }

  /**
   * Remove todos os Hosts listados atualmente
   *
   * @private
   */
  function clearHostsList() {
    hostsList.textContent = ''
  }

  /**
   * Mostra a listagem de Hosts e
   * oculta a mensagem de informação
   *
   * @private
   */
  function renderHostsList() {
    hostsList.removeAttribute('hidden')
    emptyMessage.setAttribute('hidden', '')
  }
  
  /**
   * Mostra a mensagem de informação e 
   * oculta a listagem de Hosts
   *
   * @private
   */
  function renderEmptyMessage() {
    emptyMessage.removeAttribute('hidden')
    hostsList.setAttribute('hidden', '')
  }
}

export { HostsComponent }
