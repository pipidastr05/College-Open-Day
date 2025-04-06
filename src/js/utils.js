export const darkModeHandle = () => {
    const darkModeSwither = document.getElementById('toggleDarkMode')
    const htmlElement = document.documentElement

    if (localStorage.getItem('mode') === 'dark') {
        htmlElement.classList.add('dark')
        darkModeSwither.checked = true
    }

    darkModeSwither.addEventListener('click', () => {
        htmlElement.classList.toggle('dark')

        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('mode', 'dark')
        } else {
            localStorage.setItem('mode', 'light')
        }
    })

}
