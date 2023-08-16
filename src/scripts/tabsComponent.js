function TabsComponent() {
  this.tabs = document.querySelectorAll('#tabs ul li')
  this.activeTab = tabs.querySelector('.is-active')

  this.mount = (hostsStore) => {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', (event) => {
        event.preventDefault()

        if (tab.classList.contains('is-active')) {
          return
        }

        hostsStore.fetchHosts()
        this.activateTab(tab)
      })
    }) 
  }

  this.activateTab = (tab) => {
    const activeSectionId = this.activeTab.getAttribute('data-section-id')
    const activeSection = document.querySelector(`#${activeSectionId}`)
    
    activeSection.setAttribute('hidden', '')
    this.activeTab.classList.remove('is-active')

    const sectionToActivateId = tab.getAttribute('data-section-id')
    const sectionToActivate = document.querySelector(`#${sectionToActivateId}`)

    sectionToActivate.removeAttribute('hidden')
    tab.classList.add('is-active')

    this.activeTab = tab
  }
}

export { TabsComponent }
