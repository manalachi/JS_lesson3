$(document).ready(function() {

    $('.main_btn, .main_btna, a[href="#sheldure"]').on('click',function() {
        $('.overlay').slideDown(1000);
        $('.modal').fadeIn(1000);
    });

    $('.close').click(function() {
        $('.overlay').slideUp(1000);
        $('.modal').fadeOut(1000);
    });

});