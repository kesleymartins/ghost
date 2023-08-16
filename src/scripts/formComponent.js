function FormComponent() {
  this.form = document.querySelector('#form form')

  this.mount = (hostsStore) => {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault()
      
      const formData = new FormData(this.form)

      const newHost = {
        "name": formData.get('name'),
        "url": `${formData.get('protocol')}://${formData.get('url')}`
      }

      hostsStore.addHost(newHost)
    })
  }
}

export { FormComponent }
