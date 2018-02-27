(function ($) {

    $(function () {
        attachEvents();
        ServiceContainer.setinfo();
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

    var showEventData = function (e) {
        // $('.month1,.month2').fadeOut(500, "swing");
        // setTimeout(function() {
        //     $('.month1,.month2').fadeIn(1000, "swing");    
        // }, 2000); 
        $('.month1,.month2').animate({ opacity: '0' }, 500, 'linear');

        setTimeout(function () {
            $('.month1,.month2').animate({ 'opacity': '1' }, 700, 'swing');
            ServiceContainer.setinfo(e.target);

        }, 300);
    };

})(jQuery);


var ServiceContainer = function () {
    var months = moment.months();
    var pastmonth = '', currentmonth = '', nextmonth = '', futuremonth = '';

    var GetAjaxBaseObject = function (method, url) {
        return $.ajax({
            type: method,
            url: url,
            contentType: "application/json",
            dataType: "json"
        });
    };

    var GetEventDetails = function () {
        GetAjaxBaseObject('GET', './js/event.json').then(function (data) {
            console.log(data);
        }).catch(function () {
            console.log('error');
        });
    };

    var GetEvents = function (cbsuccess, cbfailure) {
        GetAjaxBaseObject('GET', './js/events.json').then(function (data) {
            cbsuccess(data);
        }).catch(function () {
            console.log('error');
        });
    };

    var getEventsData = function (currentmonth, nextmonth) {
        GetEvents(handleEvents);
    };

    var handleEvents = function (events) {
        if (events != undefined) {
            var serveDataContent = _.filter(events, { eventTypeId: 1 });
            var growDataContent = _.filter(events, { eventTypeId: 2 });
            var beHealthyDataContent = _.filter(events, { eventTypeId: 3 });
            if (serveDataContent.length > 0) {
               handleServeEvents
            }
            if (growDataContent.length > 0) {
                console.log('growing');
            }
            if (beHealthyDataContent.length > 0) {
                console.log('becoming healthy');
            }
        }
    }

    var setinfo = function (navigationcontrol) {

        if (navigationcontrol == undefined) {
            index = moment().month();
        } else {
            var navigationControlId = $(navigationcontrol).find('span[id*="month"]').attr('id');
            var monthName = $(navigationcontrol).find('span[id*="month"]').text();
            if (monthName != undefined) {
                index = moment.months().indexOf(monthName);
                if (navigationControlId == 'futuremonth') {
                    index = index - 1;
                }
            }
        }

        pastmonth = moment().month(index - 1).format('MMMM');
        currentmonth = moment().month(index).format('MMMM');
        nextmonth = moment().month(index + 1).format('MMMM');
        futuremonth = moment().month(index + 2).format('MMMM');

        getEventsData(currentmonth, nextmonth);

        $('#pastmonth').text(pastmonth);
        $('#currentmonth').text(currentmonth);
        $('#nextmonth').text(nextmonth);
        $('#futuremonth').text(futuremonth);
    }

    return {
        setinfo: setinfo,
        pastmonth: pastmonth,
        currentmonth: currentmonth,
        nextmonth: nextmonth,
        futuremonth: futuremonth
    }
}();