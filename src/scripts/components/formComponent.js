import { Tabs } from '../enums/tabs.js'
import { HostsStore } from '../stores/hostsStore.js'
import { TabsComponent } from './tabsComponent.js'

/**
  * Component para lidar com o formulário de criação de Hosts
  *
  * @constructor
  *
  * @param {HostsStore} hostsStore 
  * @param {TabsComponent} tabsComponent 
  */
function FormComponent(hostsStore, tabsComponent) {
  let formIsValid = false
  let formElement = document.querySelector('#form form')

  /**
   * Lógica de inicialização
   */
  this.mount = () => {
    const formInputs = formElement.querySelectorAll('input.input')

    formInputs.forEach(input => {
      input.addEventListener('input', () => {
        updateValidationStatus(input)
      })
    })

    formElement.addEventListener('submit', (event) => {
      event.preventDefault()
      
      validateForm()

      if (false === formIsValid) {
        return
      }

      const newHost = buildNewHost()

      hostsStore.addHost(newHost)
      tabsComponent.changeToTab(Tabs.HOSTS)
      clearForm()
    })
  }

  /**
   * Realiza a validação do formulário
   *
   * @private
   */
  function validateForm() {
    const formInputs = formElement.querySelectorAll('input.input')
    
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
   * @return {Host}
   */
  function buildNewHost() {
    const formData = new FormData(formElement)

    return {
      "name": formData.get('name'),
      "url": `${formData.get('protocol')}://${formData.get('url')}`
    }
  }
  
  /**
   * Limpa os dados do formulário
   *
   * @private
   */
  function clearForm() {
    formElement.reset()
  }
}

export { FormComponent }
