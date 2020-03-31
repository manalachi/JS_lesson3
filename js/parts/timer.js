function timer() {
    
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
}

module.exports = timer;