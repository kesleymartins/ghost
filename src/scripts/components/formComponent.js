import { Tabs } from '../enums/tabs.js'

function FormComponent(hostsStore, tabsComponent) {
  this.hostsStore = hostsStore
  this.tabsComponent = tabsComponent

  this.form = document.querySelector('#form form')

  this.mount = () => {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault()
     
      const newHost = this.buildNewHost()

      this.hostsStore.addHost(newHost)
      this.tabsComponent.changeToTab(Tabs.HOSTS)
      this.clearForm()
    })
  }

  this.buildNewHost = () => {
    const formData = new FormData(this.form)

    return {
      "name": formData.get('name'),
      "url": `${formData.get('protocol')}://${formData.get('url')}`
    }
  }

  this.clearForm = () => {
    this.form.reset()
  }
}

export { FormComponent }
