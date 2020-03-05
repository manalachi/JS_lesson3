# JS_lesson3

Наши табы зависят от трёх елементов в нашей страницы(#1,#2,#3)

        tab = document.querySelectorAll('.#1'),           //необходимо подставить наши табы, классы
        info = document.querySelector('.#2'),             //блок с данными табами
        tabContent = document.querySelectorAll('.#3');    // и  собственно контент который будет переключатся 
     .
     .
     .
     .
     if (target && target.classList.contains('.#1'))      // происходит делегирование , подставляем наши табы для обработки событий
     .
     .
     .
