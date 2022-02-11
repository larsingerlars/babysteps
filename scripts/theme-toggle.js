const config = {
    STORAGE_KEY: 'theme-preference',
    MEDIA_QUERY: 'prefers-color-scheme',
    THEME_DARK: 'dark',
    THEME_LIGHT: 'light'
}

const getColorPreference = () => {
    if (localStorage.getItem(config.STORAGE_KEY)) {
        return localStorage.getItem(config.STORAGE_KEY)
    } else {
        return window.matchMedia(config.MEDIA_QUERY).matches
            ? config.THEME_DARK
            : config.THEME_LIGHT
    }
}

const theme = { value: getColorPreference() }

const setColorPreference = () => {
    localStorage.setItem(config.STORAGE_KEY, theme.value)
    reflectColorPreference()
}

const reflectColorPreference = () => {
    document.firstElementChild.setAttribute('data-theme', theme.value)

    document
        .querySelector('#theme__toggle')
        ?.setAttribute('aria-label', theme.value)
}

const onClick = () => {
    theme.value =
        theme.value === config.THEME_LIGHT
            ? config.THEME_DARK
            : config.THEME_LIGHT

    setColorPreference()
}

window.onload = () => {
    reflectColorPreference()

    document.querySelector('#theme__toggle').addEventListener('click', onClick)
}

window
    .matchMedia(config.MEDIA_QUERY)
    .addEventListener('change', ({ matches: isDark }) => {
        theme.value = isDark ? config.THEME_DARK : config.THEME_LIGHT
        setColorPreference()
    })

reflectColorPreference()
