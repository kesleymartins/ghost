import { Tabs } from '../enums/tabs.js'
import { HostsStore } from '../stores/hostsStore.js'
import { HostsComponent } from './hostsComponent.js'
import { TabsComponent } from './tabsComponent.js'

/**
 * Component para lidar com o formulário de criação de Hosts
 *
 * @constructor
 */
function FormComponent() {
  /** @type {HTMLFormElement} */
  const formElement = document.querySelector('#form form')
  
  /** @type {NodeListOf<HTMLInputElement>} */
  const formInputs = formElement.querySelectorAll('input.input')

  /** @type {boolean} */
  let formIsValid = false

  /** @type {HostsStore} */
  let hostsStore

  /** @type {TabsComponent} */
  let tabsComponent

  /** @type {HostsComponent} */
  let hostsComponent

  /**
   * Lógica de inicialização
   *
   * @param {HostsStore} hs     - Instância de HostsStore
   * @param {TabsComponent} tc  - Instância de TabsComponent
   * @param {HostsComponent} hc - Instância de HostsComponent
   */
  this.mount = (hs, tc, hc) => {
    hostsStore = hs
    tabsComponent = tc
    hostsComponent = hc

    setupSubmitEvent()
    setupValidationEvent()
  }

  /**
   * Prepara o formulário para a criação de um novo host
   */
  this.setupForNewHost = () => {
    resetForm()
  }

  /**
   * Prepara o formulário para a edição de um host
   */
  this.setupForEditHost = (hostId) => {
    const host = hostsStore.fetchById(hostId)
    
    resetForm()
    fillForm(host)
  }
  
  /**
   * Preenche o formulário com as informações do host
   *
   * @param {Host} host - dados de um host
   *
   * @private
   */
  function fillForm(host) {
    const idField = formElement.querySelector('input[name="id"]')
    const nameField = formElement.querySelector('input[name="name"]')
    const domainField = formElement.querySelector('input[name="domain"]')
    const protocols = formElement.querySelectorAll('input[name="protocol"]')

    idField.value = host.id
    nameField.value = host.name
    domainField.value = host.domain

    protocols.forEach(protocol => {
      if (protocol.value != host.protocol) {
        return
      }

      protocol.checked = true
    })
  }

  /**
   * Limpa os dados do formulário e remove 
   * informações de successo e erro
   *
   * @private
   */
  function resetForm() {
    formElement.reset()

    const classesToRemove = ['has-error', 'ok']  
    
    formInputs.forEach(input => {
      classesToRemove.forEach(className => input.classList.remove(className)) 
    })
  }

  /**
   * Configura evento de validação dos inputs do formulário
   *
   * @private
   */
  function setupValidationEvent() {
    formInputs.forEach(input => {
      input.addEventListener('input', () => {
        updateValidationStatus(input)
      }) 
    })  
  }

  /**
   * Configura evento de quando o formulario é enviado
   *
   * @private
   */
  function setupSubmitEvent() {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault()
      validateForm()

      if (false === formIsValid) {
        return
      }
      
      const host = buildHost()


      hostsStore.addHost(newHost)
      hostsComponent.update()
      tabsComponent.changeToTab(Tabs.HOSTS)
    })
  }

  /**
   * Realiza a validação do formulário
   *
   * @private
   */
  function validateForm() {
    formIsValid = [...formInputs].every(input => input.value.trim() !== "")

    if (false === formIsValid) {
      formInputs.forEach(input => updateValidationStatus(input))
    }
  }
  
  /**
   * Atualiza o status de validação mostrando de forma visual 
   * se aquele campo preenche os requisitos necessários
   *
   * @private
   *
   * @param {HTMLInputElement} input
   */
  function updateValidationStatus(input) {
    if (input.value.trim() === "") {
      input.classList.remove('ok')
      input.classList.add('has-error')

      return
    }

    input.classList.remove('has-error')
    input.classList.add('ok')
  }
  
  /**
   * Retorna um novo Host {Object} usando as informações do formulário
   * 
   * @private
   * 
   * @returns {Host}
   */
  function buildHost() {
    const formData = new FormData(formElement)

    return {
      "id": formData.get('id'),
      "name": formData.get('name'),
      "domain": formData.get('domain'),
      "protocol": formData.get('protocol')
    }
  }
}

export { FormComponent }
