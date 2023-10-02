function slider(container) {
    var slider = tns({
        container: container,
        items: 1,
        slideBy: 1,
        autoplay: false,
        startIndex: 0,
        nav: false,
        controlsPosition: 'bottom',
        controlsText: [
            '',
            ''
        ]
    });
    
    const prev = document.querySelector('[data-controls="prev"]');
          
    let sliderCounter = document.createElement('div');
    sliderCounter.classList.add('slider-counter');
    sliderCounter.innerHTML = `
            <span id="current"></span>
            /
            <span id="total"></span>
        `;
    prev.after(sliderCounter);
    
    const total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          tnsControls = document.querySelector('.tns-controls');
    
    current.textContent = slider.getInfo().displayIndex;
    total.textContent = slider.getInfo().slideCount;      
    
    tnsControls.addEventListener('click', (e) => {
        if(e.target.hasAttribute('data-controls')) {
            current.textContent = slider.getInfo().displayIndex;
        }
    })
}

export default slider;