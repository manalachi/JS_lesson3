function slider() {
    let sliderIndex = 1,
        sliders = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

showSliders(sliderIndex);

function showSliders(n) {

    if (n > sliders.length) {
        sliderIndex = 1;
    }
    if (n < 1) {
        sliderIndex = sliders.length;
    }

    sliders.forEach((item) => item.style.display = 'none');
    // for (let i = 0; i < slides.length; i++) {
    //     slides[i].style.display = none;
    // }
    dots.forEach((item) => item.classList.remove('dot-active'));

    sliders[sliderIndex - 1].style.display = 'block';
    dots[sliderIndex - 1].classList.add('dot-active');
    } 

    function plusSliders(n) {
        showSliders(sliderIndex += n);
    }
    function currentSlider(n) {
        showSliders(sliderIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSliders(-1);
    });
    next.addEventListener('click', function() {
        plusSliders(1);
    });

    dotsWrap.addEventListener('click', function(e) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (e.target.classList.contains('dot') && e.target == dots[i-1]) {
                currentSlider(i);
            }
        }
    });
}

module.exports = slider;