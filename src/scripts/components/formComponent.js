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
  this.hostsStore = hostsStore
  this.tabsComponent = tabsComponent
  this.isValid = false

  this.form = document.querySelector('#form form')

  /**
   * Lógica de inicialização
   */
  this.mount = () => {
    const formInputs = this.form.querySelectorAll('input.input')

    formInputs.forEach(input => {
      input.addEventListener('input', () => {
        this.updateValidationStatus(input)
      })
    })

    this.form.addEventListener('submit', (event) => {
      event.preventDefault()
      
      this.validateForm()

      if (false === this.isValid) {
        return
      }

      const newHost = this.buildNewHost()

      this.hostsStore.addHost(newHost)
      this.tabsComponent.changeToTab(Tabs.HOSTS)
      this.clearForm()
    })
  }

  /**
   * Realiza a validação do formulário
   *
   * @private
   */
  this.validateForm = () => {
    const formInputs = this.form.querySelectorAll('input.input')
    
    this.isValid = [...formInputs].every(input => input.value.trim() !== "")

    if (false === this.isValid) {
      formInputs.forEach(input => this.updateValidationStatus(input))
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
  this.updateValidationStatus = (input) => {
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
  this.buildNewHost = () => {
    const formData = new FormData(this.form)

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
  this.clearForm = () => {
    this.form.reset()
  }
}

export { FormComponent }
