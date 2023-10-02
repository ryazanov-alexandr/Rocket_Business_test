function hamburger() {
    const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      openIcon = document.querySelector('.hamburger__icon'),
      closeIcon = document.querySelector('.hamburger__close');

    hamburger.addEventListener('click', () => {
        if(menu.classList.contains('active')) {
            menu.classList.remove('active');
            openIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        } else {
            menu.classList.add('active');
            openIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        } 
    });
}

export default hamburger;