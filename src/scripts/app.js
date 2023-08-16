import { HostsStore } from './hostsStore.js'
import { HostsComponent } from './hostsComponent.js'
import { TabsComponent } from './tabsComponent.js'
import { FormComponent } from './formComponent.js'

const hostsStore = new HostsStore()
const tabsComponent = new TabsComponent()
const hostsComponent = new HostsComponent()
const formComponent = new FormComponent()

tabsComponent.mount(hostsStore)
hostsComponent.mount(hostsStore)
formComponent.mount(hostsStore)
