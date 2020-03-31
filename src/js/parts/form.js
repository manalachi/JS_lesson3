function form() {
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
}

module.exports = form;