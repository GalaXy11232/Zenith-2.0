const STORAGE_ENTRYNAME = "Settings";
const defaultStorageStructure = {
    sqNum: INIT_SQ_NUM,
    animatedBG: true
}


function switchBGAnimated() {
    let animated_backgrounds = document.querySelectorAll('.slightzoom');
    let animbtn = document.getElementById('animBg-btn');
    let storageDict = JSON.parse(localStorage.getItem(STORAGE_ENTRYNAME));

    storageDict['animatedBG'] = !storageDict['animatedBG'];

    if (storageDict['animatedBG']) { 
        animbtn.style.color = 'lime'; 
        animbtn.textContent = 'Pornit'; 
        for (let node of animated_backgrounds) 
            node.classList.remove('disableAnimation');
    }
    else {
        animbtn.style.color = 'red'; 
        animbtn.textContent = 'Oprit'; 
        for (let node of animated_backgrounds)
            node.classList.add('disableAnimation');
    }

    localStorage.setItem(STORAGE_ENTRYNAME, JSON.stringify(storageDict));
}



function createLocalStorage() {
    if (
        localStorage.getItem(STORAGE_ENTRYNAME) == null ||
        Object.keys(JSON.parse(localStorage.getItem(STORAGE_ENTRYNAME))).length != Object.keys(defaultStorageStructure).length
    ) {
        localStorage.setItem(STORAGE_ENTRYNAME, JSON.stringify(defaultStorageStructure));
        console.log(`created new/updated Storage for settings`);
    }

    loadFromStorageAccordingly();
}


function loadFromStorageAccordingly() {
    let storageDict = JSON.parse(localStorage.getItem(STORAGE_ENTRYNAME));
    
    // setup floating squares
    document.getElementById('prg').value = storageDict['sqNum'];
    document.getElementById('square-setting').textContent = storageDict['sqNum'];
    for (let i = 0; i < storageDict['sqNum']; i++) 
        spawnSquare();

    // establish animated bg
    let animated_backgrounds = document.querySelectorAll('.slightzoom');
    let animbtn = document.getElementById('animBg-btn');
    if (!storageDict['animatedBG']) {
        animbtn.style.color = 'red';
        animbtn.textContent = 'Oprit';
        for (let node of animated_backgrounds) 
            node.classList.add('disableAnimation');
    }
    else {
        animbtn.style.color = 'lime';
        animbtn.textContent = 'Pornit';
        for (let node of animated_backgrounds)
            node.classList.remove('disableAnimation');
    }
    
}
