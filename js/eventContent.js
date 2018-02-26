(function ($) {

    $(function () {
        attachEvents();
        DataContainer.setinfo();
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

        $('.month1,.month2').animate({ opacity: '0' }, 1000, 'linear');

        setTimeout(function () {
            $('.month1,.month2').animate({ 'opacity': '1' }, 700, 'swing');
        }, 300);
    };

})(jQuery);

var DataContainer = function () {
    var months = moment.months();
    var pastmonth = '', currentmonth = '', nextmonth = '', futuremonth = '';

    console.log(moment().month(0).format('MMMM'));

    console.log(moment().add(0, "month").format('MMMM'));

    var setinfo = function (monthindex) {
        index = monthindex || moment().month()
        pastmonth = moment().add(index - 1, 'month').format('MMMM');
        currentmonth = moment().format('MMMM');
        nextmonth = moment().add( 1, 'month').format('MMMM');                
        futuremonth = moment().add( 2, 'month').format('MMMM');
        console.log(pastmonth + ' ' + currentmonth + ' ' + nextmonth + ' ' + futuremonth);                
    }

    return {
        setinfo: setinfo,
        pastmonth: pastmonth,
        currentmonth: currentmonth,
        nextmonth: nextmonth,
        futuremonth: futuremonth
    }
}();