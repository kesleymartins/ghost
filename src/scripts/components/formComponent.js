import { Tabs } from '../enums/tabs.js'

function FormComponent(hostsStore, tabsComponent) {
  this.hostsStore = hostsStore
  this.tabsComponent = tabsComponent

  this.form = document.querySelector('#form form')

  this.mount = () => {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault()
      
      const formData = new FormData(this.form)

      const newHost = {
        "name": formData.get('name'),
        "url": `${formData.get('protocol')}://${formData.get('url')}`
      }

      this.hostsStore.addHost(newHost)
      this.tabsComponent.changeToTab(Tabs.HOSTS)
    })
  }
}

export { FormComponent }
