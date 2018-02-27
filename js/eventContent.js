(function ($) {

    $(function () {
        attachEvents();
        ServiceContainer.setinfo();
        displayEventInfoModal();
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
        if (ServiceContainer.navigatorclicked) {
            e.stopPropagation();
            return false;
        }
        else {
            ServiceContainer.navigatorclicked = true;
        }
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
    var navigatorclicked = false;

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
            ServiceContainer.navigatorclicked = false;
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
            var serveDataContent = getCategorizedEventData(1, events);
            var growDataContent = getCategorizedEventData(2, events);
            var beHealthyDataContent = getCategorizedEventData(3, events);

            if (serveDataContent.length > 0) {
                handleServeEvents(serveDataContent);
            }
            if (growDataContent.length > 0) {
                handleGrowEvents(growDataContent);
            }
            if (beHealthyDataContent.length > 0) {
                handleBeHealthyEvents(beHealthyDataContent);
            }
        }
        ServiceContainer.navigatorclicked = false;
    };

    var getCategorizedEventData = function (categoryId, events) {

        return _.chain(events)
            .filter({ eventTypeId: categoryId })
            .map(function (event) { return _.pick(event, 'eventId', 'eventTitle', 'eventDate', 'eventTypeId') })
            .sortBy(events, function (event) { return new moment(event.eventDate); })
            .value();
    };

    var handleServeEvents = function (events) {
        var container = '#ServeEvents';
        handleEventsDisplay(container, events);
    };

    var handleGrowEvents = function (events) {
        var container = '#GrowEvents';
        handleEventsDisplay(container, events);
    };

    var handleBeHealthyEvents = function (events) {
        var container = '#BeHealthyEvents';
        console.log(events);
        handleEventsDisplay(container, events);
    };

    var handleEventsDisplay = function (container, events) {
        $(container + ' .eventinfo').remove();

        if (events != undefined && events.length > 0) {
            var currentmonthEvents = _.filter(events, function (event) {
                return new moment(event.eventDate).format('MMMM') == currentmonth;
            })
            var nextmonthEvents = _.filter(events, function (event) {
                return new moment(event.eventDate).format('MMMM') == nextmonth;
            })

            _.forEach(currentmonthEvents, function (event) {
                $(container + ' .month1').append('<div class="eventinfo">' + new moment(event.eventDate).format('DD')
                    + ' ' + event.eventTitle + '</div>');
            })

            _.forEach(nextmonthEvents, function (event) {
                $(container + ' .month2').append('<div class="eventinfo">' + new moment(event.eventDate).format('DD')
                    + ' ' + event.eventTitle + '</div>');
            })

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
        futuremonth: futuremonth,
        navigatorclicked: navigatorclicked
    }
}();