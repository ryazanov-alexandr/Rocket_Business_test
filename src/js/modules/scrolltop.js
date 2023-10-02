function scrollTop() {
    let header = document.querySelector('.header'),
    promo = document.querySelector('.promo');

    let lastScrollTop = 0; 
    window.addEventListener('scroll', function(e) {
        let st = window.scrollY;
        if (st > lastScrollTop){
            //down
            if(Math.round(st) >= header.offsetHeight) {
                header.classList.add('header__hidden');
                promo.classList.add('promo-mt');
            }
            header.classList.remove('header__fixed');
        } else {
            //up
            header.classList.add('header__fixed');

            if(st <= 0) {
                header.classList.remove('header__hidden');
                header.classList.remove('header__fixed');
                promo.classList.remove('promo-mt');
            }
        }

        lastScrollTop = st;

    });
}

export default scrollTop;