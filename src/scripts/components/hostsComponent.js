import { Tabs } from "../enums/tabs.js"
import { HostsStore } from "../stores/hostsStore.js"
import { FormComponent } from "./formComponent.js"
import { TabsComponent } from "./tabsComponent.js"

/**
 * Componente para realizar a listagem de Hosts 
 *
 * @constructor
 */
function HostsComponent() {
  /** @type {HTMLDivElement} */
  const emptyMessage = document.querySelector('#hosts #empty')
  
  /** @type {HTMLDivElement} */
  const hostsList = document.querySelector('#hosts #list')

  /** @type {HostsStore} */
  let hostsStore

  /** @type {TabsComponent} */
  let tabsComponent

  /** @type {FormComponent} */
  let formComponent

  /**
   * Lógica de inicialização
   *
   * @param {HostsStore} hs     - Instância de HostsStore
   * @param {TabsComponent} tc  - Instância de TabsComponent
   * @param {FormComponent} fc  - Instância de FormComponent
   */
  this.mount = (hs, tc, fc) => {
    hostsStore = hs
    tabsComponent = tc
    formComponent = fc
    
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
    
    const ul = document.createElement('ul')

    hostsStore.data.forEach(host => {
      const listItem = createListItem(host)
      
      ul.appendChild(listItem)
    })

    hostsList.appendChild(ul)
  }
  
  /**
   * Cria o item do Host e anexa na listagem
   *
   * @private
   *
   * @param {Host} host 
   *
   * @returns {HTMLLIElement}     - Um elemento <li>
   */
  function createListItem(host) {
    const li = document.createElement('li')
    li.setAttribute('id', host.id)
    
    const link = createLink(host)
    const actions = createLinkActions(host.id)

    li.appendChild(link)
    li.appendChild(actions)
    
    return li
  }
  
  /**
   * Cria o link de redirecionamento de um Host
   *
   * @private
   *
   * @param {Host} host 
   *
   * @returns {HTMLAnchorElement}      - um elemento <a>
   */
  function createLink(host) {
    const a = document.createElement('a')
    const p = document.createElement('p')
    const small = document.createElement('small')

    const url = `${host.protocol}://${host.domain}`

    a.setAttribute('href', url)
    a.setAttribute('target', '_blank')
    p.innerText = host.name
    small.innerText = url 
    
    a.appendChild(p)
    a.appendChild(small)

    return a
  }

  /**
   * @private
   *
   * Cria o elemento actions que engloba editButton e removeButton
   *
   * @param {number} hostId     - Identificação do Host
   *
   * @returns {HTMLDivElement}   - Um element div
   */
  function createLinkActions(hostId) {
    const div = document.createElement('div')
    div.classList.add('actions')

    const editButton = createEditButton(hostId)
    const removeButton = createRemoveButton(hostId)

    div.appendChild(editButton)
    div.appendChild(removeButton)

    return div
  }

  /**
   * Cria o elemento com a lógica de remoção de um Host
   *
   * @private
   *
   * @param {number} hostId   - Identificação do Host
   *
   * @returns {HTMLSpanElement}    -  Um elemento <span>
   */
  function createRemoveButton(hostId) {
    const span = document.createElement('span')
    const img = document.createElement('img')

    span.classList.add('icon')
    img.setAttribute('src', './icons/remove.svg')
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
   * @private
   *
   * Cria o elemento com a lógica de edição de um Host
   *
   * @param {number} hostId     - Identificação do host
   *
   * @returns {HTMLSpanElement}  - um elemento <span>
   */
  function createEditButton(hostId) {
    const span = document.createElement('span')
    const img = document.createElement('img')

    span.classList.add('icon')
    img.setAttribute('src', './icons/edit.svg')
    img.setAttribute('alt', 'edit icon')

    span.addEventListener('click', () => {
      formComponent.setupForEditHost(hostId)
      tabsComponent.changeToTab(Tabs.FORM)
    })

    span.appendChild(img)

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
