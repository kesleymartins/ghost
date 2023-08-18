import { Tabs } from '../enums/tabs.js'
import { HostsComponent } from './hostsComponent.js'
import { FormComponent } from './formComponent.js' 
/**
  * Component para lidar com a troca da abas e mostrar a seção correta
  *
  * @param {HostsComponent} hostsComponent  - Instância de HostsComponent 
  * @param {Tabs} initialTab                - Aba inicial 
  */
function TabsComponent() {
  /** @type {NodeListOf<HTMLLIElement>} */
  const tabs = document.querySelectorAll('#tabs ul li')
  
  /** @type {NodeListOf<HTMLDivElement>} */
  const sections = document.querySelectorAll('div.content')

  /** @type {Tabs} */
  let activeTab

  /** @type {HostsComponent} */
  let hostsComponent

  /** @type {FormComponent} */
  let formComponent

  /**
   * Lógica de inicialização
   *
   * @param {HostsComponent} hc   - Instância de HostsComponent
   * @param {FormComponent} fc    - Instância de FormComponent
   * @param {string} initialTab   - Aba a ser montada inicialmente
   */
  this.mount = (hc, fc, initialTab) => {
    hostsComponent = hc
    formComponent = fc
    activeTab = initialTab

    setupEvents()
    activateTab()
  }

  /**
   * Lógica para a mudança de abas com base no enum Tabs
   *
   * @params {string} tabName
   */
  this.changeToTab = (tabName) => {
    activeTab = tabName
    activateTab()
  }

  /**
   * Configura os eventos de click para mudança entre abas
   *
   * @private
   */
  function setupEvents() {
    tabs.forEach(tab => {
      tab.addEventListener('click', (event) => {
        event.preventDefault()

        if (tab.classList.contains('is-active')) {
          return
        }

        activeTab = tab.getAttribute('data-tab')
        activateTab()
      })
    }) 
  }

  /**
   * Ativa uma aba com base no atributo activeTab
   *
   * @private
   */
  function activateTab() {
    switch (activeTab) {
      case Tabs.HOSTS:
        hostsComponent.update()
        break
      case Tabs.FORM:
        formComponent.resetForm()
        break
    }

    if (activeTab === Tabs.HOSTS) {
    }

    tabs.forEach(tab => {
      if (tab.getAttribute('data-tab') === activeTab) {
        tab.classList.add('is-active')
      } else {
        tab.classList.remove('is-active')
      }
    })

    sections.forEach(section => {
      if (section.getAttribute('data-section') === activeTab) {
        section.removeAttribute('hidden')
      } else {
        section.setAttribute('hidden', '')
      }
    })
  }
}

export { TabsComponent }
