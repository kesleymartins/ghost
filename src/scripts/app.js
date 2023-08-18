import { Tabs } from './enums/tabs.js'
import { HostsStore } from './stores/hostsStore.js'
import { HostsComponent } from './components/hostsComponent.js'
import { TabsComponent } from './components/tabsComponent.js'
import { FormComponent } from './components/formComponent.js'
import './utils/types.js'

const hostsStore = new HostsStore()
const hostsComponent = new HostsComponent(hostsStore)
const tabsComponent = new TabsComponent(hostsComponent, Tabs.HOSTS)
const formComponent = new FormComponent(hostsStore, tabsComponent)

hostsComponent.mount()
formComponent.mount()
tabsComponent.mount()
