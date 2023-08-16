import { HostsStore } from './stores/hostsStore.js'
import { HostsComponent } from './components/hostsComponent.js'
import { TabsComponent } from './components/tabsComponent.js'
import { FormComponent } from './components/formComponent.js'

const hostsStore = new HostsStore()
const tabsComponent = new TabsComponent()
const hostsComponent = new HostsComponent()
const formComponent = new FormComponent()

tabsComponent.mount(hostsStore, hostsComponent)
hostsComponent.mount(hostsStore)
formComponent.mount(hostsStore)
