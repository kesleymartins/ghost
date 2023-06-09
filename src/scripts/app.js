const storagePrefix = "ghost"

let config = localStorage.getItem(`${storagePrefix}_config`)

if (config) {
    config = JSON.parse(config)
} else {
    default_config = {
        "menu_option":"list"
    }

    localStorage.setItem(`${storagePrefix}_config`, JSON.stringify(default_config))

    config = default_config
}