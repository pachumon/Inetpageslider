(function ($) {

    $(function () {
        attachEvents();
    });

    var attachEvents = function () {
        $('.eventcontent').on('click', '.eventinfo', displayEventInfoModal);
        $('.topnavigator').on('click', showEventData);
    };

    var displayEventInfoModal = function () {
        $('#myModal').modal({
            keyboard: true
        });
    };

    var showEventData = function () {
        // $('.month1,.month2').fadeOut(500, "swing");
        // setTimeout(function() {
        //     $('.month1,.month2').fadeIn(1000, "swing");    
        // }, 2000); 

        $('.month1,.month2').animate({ opacity: '0' }, 600, 'linear');

        setTimeout(function () {
            $('.month1,.month2').animate({ 'opacity': '1' }, 1400, 'linear');
        }, 1000);
    };

})(jQuery);
