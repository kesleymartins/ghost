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

hostsComponent.mount(hostsStore)
formComponent.mount(hostsStore, tabsComponent)
tabsComponent.mount(hostsComponent, Tabs.HOSTS)
