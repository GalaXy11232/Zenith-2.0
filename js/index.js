function navbarDropdownMenuToggle(btnId) {
    let button = document.getElementById(btnId);
    let buttonParent = button.parentElement;
    let menu = document.getElementById('navbar-dropdown-menu');

    let radius = window.getComputedStyle(document.body).getPropertyValue('--navbar_borderRadius');
    console.log(radius);

    if (Number(menu.style.height.split('px')[0]) > 0) {
        menu.style.height = '0';
        buttonParent.style.borderRadius = `0 0 ${radius}px ${radius}px`;
    }
    else {
        menu.style.height =  '200px';
        buttonParent.style.borderRadius = `0 0 0 ${radius}px`;
    }
}