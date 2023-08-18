import { Tabs } from '../enums/tabs.js'
import { HostsComponent } from './hostsComponent.js'

/**
  * Component para lidar com a troca da abas e mostrar a seção correta
  *
  * @param {HostsComponent} hostsComponent 
  * @param {Tabs} initialTab 
  */
function TabsComponent(hostsComponent, initialTab) {
  this.hostsComponent = hostsComponent

  this.tabs = document.querySelectorAll('#tabs ul li')
  this.sections = document.querySelectorAll('section.content')
  this.activeTab = initialTab

  /**
   * Lógica de inicialização
   */
  this.mount = () => {
    this.setupEvents()
    this.activateTab()
  }

  /**
   * Lógica para a mudança de abas com base no enum Tabs
   *
   * @params {string} tabName
   */
  this.changeToTab = (tabName) => {
    this.activeTab = tabName
    this.activateTab()
  }

  /**
   * Configura os eventos de click para mudança entre abas
   *
   * @private
   */
  this.setupEvents = () => {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', (event) => {
        event.preventDefault()

        if (tab.classList.contains('is-active')) {
          return
        }

        this.activeTab = tab.getAttribute('data-tab')
        this.activateTab()
      })
    }) 
  }

  /**
   * Ativa uma aba com base no atributo activeTab
   *
   * @private
   */
  this.activateTab = () => {
    if (this.activeTab === Tabs.HOSTS) {
        this.hostsComponent.update()
    }

    this.tabs.forEach(tab => {
      if (tab.getAttribute('data-tab') === this.activeTab) {
        tab.classList.add('is-active')
      } else {
        tab.classList.remove('is-active')
      }
    })

    this.sections.forEach(section => {
      if (section.getAttribute('data-section') === this.activeTab) {
        section.removeAttribute('hidden')
      } else {
        section.setAttribute('hidden', '')
      }
    })
  }
}

export { TabsComponent }
