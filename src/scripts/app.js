import { Tabs } from './enums/tabs.js'
import { HostsStore } from './stores/hostsStore.js'
import { HostsComponent } from './components/hostsComponent.js'
import { TabsComponent } from './components/tabsComponent.js'
import { FormComponent } from './components/formComponent.js'

const hostsStore = new HostsStore()
const hostsComponent = new HostsComponent(hostsStore)
const formComponent = new FormComponent(hostsStore)
const tabsComponent = new TabsComponent(hostsComponent, Tabs.HOSTS)

hostsComponent.mount()
formComponent.mount()
tabsComponent.mount()
