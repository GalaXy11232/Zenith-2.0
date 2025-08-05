// display settinds modal
window.addEventListener('load', () => {
    createLocalStorage();

    let settings_btns = document.getElementsByClassName('settings');
    for (const elem of settings_btns)
        elem.addEventListener('click', () => { 
            document.getElementById('settings-modal').style.display = 'block';
        })
})

document.addEventListener('mousedown', (ev) => {
    if (
        ev.target == document.getElementById("settings-modal") ||
        ev.target == document.getElementById("settings-wrapper")
    )
        document.getElementById('settings-modal').style.display = 'none';
})
