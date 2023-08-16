import { HostsStore } from './hostsStore.js'
import { HostsComponent } from './hostsComponent.js'
import { TabsComponent } from './tabsComponent.js'

const hostsStore = new HostsStore()
const tabsComponent = new TabsComponent()
const hostsComponent = new HostsComponent()

hostsStore.fetchHosts()
tabsComponent.mount()
hostsComponent.mount(hostsStore.data)
