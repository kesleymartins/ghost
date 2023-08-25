import { Tabs } from './enums/tabs.js'
import { HostsStore } from './stores/hostsStore.js'
import { HostsComponent } from './components/hostsComponent.js'
import { TabsComponent } from './components/tabsComponent.js'
import { FormComponent } from './components/formComponent.js'
import './utils/types.js'

const hostsStore = new HostsStore()
const hostsComponent = new HostsComponent()
const tabsComponent = new TabsComponent()
const formComponent = new FormComponent()

tabsComponent.mount(hostsComponent, formComponent, Tabs.HOSTS)
formComponent.mount(hostsStore, tabsComponent, hostsComponent)
hostsComponent.mount(hostsStore, tabsComponent, formComponent)
