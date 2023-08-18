import { Tabs } from '../enums/tabs.js'
import { HostsComponent } from './hostsComponent.js'

/**
  * Component para lidar com a troca da abas e mostrar a seção correta
  *
  * @param {HostsComponent} hostsComponent 
  * @param {Tabs} initialTab 
  */
function TabsComponent(hostsComponent, initialTab) {
  const tabs = document.querySelectorAll('#tabs ul li')
  const sections = document.querySelectorAll('section.content')
  let activeTab = initialTab
  
  /**
   * Lógica de inicialização
   */
  this.mount = () => {
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
    if (activeTab === Tabs.HOSTS) {
        hostsComponent.update()
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
