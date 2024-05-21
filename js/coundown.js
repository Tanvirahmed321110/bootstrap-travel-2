(function($) {
    $.fn.offerCountdown = function(options) {
        var settings = $.extend({
            endTime: null,
            onEnd: null
        }, options);

        var calculateTime = function(endTime) {
            var now = new Date().getTime();
            var distance = endTime - now;
            if (distance < 0) return null;

            var time = {
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            };
            return time;
        };

        return this.each(function() {
            var $this = $(this);
            var endTime = new Date(settings.endTime).getTime();

            function updateTimer() {
                var time = calculateTime(endTime);
                if (!time) {
                    clearInterval(timerInterval);
                    $this.html("Offer has ended");
                    if (typeof settings.onEnd === "function") {
                        settings.onEnd.call(this);
                    }
                    return;
                }

                $("#days").html(time.days);
                $("#hours").html(('0' + time.hours).slice(-2));
                $("#minutes").html(('0' + time.minutes).slice(-2));
                $("#seconds").html(('0' + time.seconds).slice(-2));
            }

            var timerInterval = setInterval(updateTimer, 1000);
            updateTimer();
        });
    };
}(jQuery));

$(document).ready(function() {
    $("#offer-countdown").offerCountdown({
        endTime: '2024-06-31T23:59:59',
        onEnd: function() {
            alert("The offer has ended!");
        }
    });
});