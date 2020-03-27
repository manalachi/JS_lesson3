window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');
    
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(e) {
        let target = e.target;
        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if(target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //таймер

    let deadline = "2020-03-08";

    function getTimeRemaining(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));
        //  days = Math.floor((t / (1000 * 60 * 60 * 24)));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endTime) {
        let timer = document.getElementById(id),
             hours = timer.querySelector('.hours'),
             minutes = timer.querySelector('.minutes'),
             seconds = timer.querySelector('.seconds'),
             timeInterval = setInterval(updateClock, 1000);
        
        function updateClock() {
            let t = getTimeRemaining(endTime);

            function zeroNum(num) {
                if (num < 10) {
                    return '0' + num;
                } else return num;
            }

                hours.textContent = zeroNum(t.hours);
                minutes.textContent = zeroNum(t.minutes);
                seconds.textContent = zeroNum(t.seconds);
                        

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);

    // Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');
    
    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splah');
        document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // Form

//     let message = {
//         loading: 'Загрузка...',
//         succes: 'Спасибо! Скоро мы с вами свяжемся!',
//         failure: 'Что-то пошло не так...'
//     };

//     let form = document.querySelector('.main-form'),
//         input = form.getElementsByTagName('input'),
//         statusMessage = document.createElement('div');

//         statusMessage.classList.add('status');

//     form.addEventListener('submit', function(e) {
//         e.preventDefault();
//         form.appendChild(statusMessage);

//         let request = new XMLHttpRequest();
//         request.open('POST', 'server.php');
//         request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

//         let formData = new FormData(form);

//         let obj = {};
//         formData.forEach(function(value, key) {
//             obj[key] = value;
//         });
//         let json = JSON.stringify(obj);

//         request.send(json);

//         request.addEventListener('readystatechange', function() {
//             if (request.readyState < 4) {
//                 statusMessage.innerHTML = message.loading;
//             } else if (request.readyState === 4 && request.status == 200){
//                 statusMessage.innerHTML = message.succes;
//             }else {
//                 statusMessage.innerHTML = message.failure;
//             }
//         });

//             for (let i = 0; i < input.length; i++) {
//                 input[i].value = '';
//             }
//     });
// });

    let message = {
        loading: 'Загрузка...',
        succes: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        formBottom = document.getElementById('form'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

    function sendForm(elem) {
        elem.addEventListener('submit', function(e) {
            e.preventDefault();
                elem.appendChild(statusMessage);
                let formData = new FormData(elem);              
                                
            function formPromise(data) {
                return new Promise(function(resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');                  
                    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                    
                    request.onreadystatechange = function() {
                        if (request.readyState < 4) {
                            resolve()
                        } else if (request.readyState === 4) {
                            if (request.status == 200 && request.status < 300){
                                let obj = {};
                                formData.forEach(function(value, key) {
                                    obj[key] = value;
                                })
                                    let json = JSON.stringify(obj); 
                                    request.send(json);                
                                resolve();
                            }
                            else {
                                reject()
                            }
                        }                         
                    }
                    request.send(data);                                        
                })                          
            }//end formPromise            

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }
            formPromise(formData)
                .then(() => statusMessage.innerHTML = message.loading)
                .then(() => statusMessage.innerHTML = message.succes) 
                .catch(() => statusMessage.innerHTML = message.failure)
                .then(clearInput)
        });
    }
    sendForm(form);
    sendForm(formBottom);

    // Slider

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

    //Calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = 0;

        persons.addEventListener('change', function() {
            personsSum = +this.value;
            total = (daysSum + personsSum) * 4000;

            if (restDays.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = zeroTotal();
            }
        });
        restDays.addEventListener('change', function() {
            daysSum = +this.value;
            total = (daysSum + personsSum) * 4000;

            if (persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = zeroTotal();
            }
        });
        function zeroTotal() {
            if (restDays.value == '' || persons.value == '') {
                return (totalValue.innerHTML = 0);
            } else {
                return (totalValue.innerHTML = total);
            }
        }
        place.addEventListener('change', function() {
            if (restDays.value == '' || persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        });    
});
