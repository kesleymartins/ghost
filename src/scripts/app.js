import { HostsStore } from './hostsStore.js'
import { HostsComponent } from './hostsComponent.js'
import { TabsComponent } from './tabsComponent.js'

const hostsStore = new HostsStore()
const hostsComponent = new HostsComponent()
const tabsComponent = new TabsComponent()

hostsStore.fetchHosts()
hostsComponent.mount(hostsStore.data)
tabsComponent.mount()
