const STORAGE_ENTRYNAME = "Settings";
const defaultStorageStructure = {
    sqNum: INIT_SQ_NUM
}

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



function createLocalStorage() {
    if (
        localStorage.getItem(STORAGE_ENTRYNAME) == null ||
        Object.keys(JSON.parse(localStorage.getItem(STORAGE_ENTRYNAME))).length != Object.keys(defaultStorageStructure).length
    ) {
        localStorage.setItem(STORAGE_ENTRYNAME, JSON.stringify(defaultStorageStructure));
        console.log(`created new Storage for settings`);
    }
}