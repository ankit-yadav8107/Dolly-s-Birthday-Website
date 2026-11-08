
$(window).on('load', function () {
    $('.loading').fadeOut('fast');
    $('.container').fadeIn('fast');
});

$(document).ready(function () {

    var vw;

    // Position balloons in the centre
    function arrangeBalloons() {
        vw = $(window).width() / 2;

        var positions = [
            -350, -250, -150, -50, 50, 150, 250
        ];

        for (var i = 1; i <= 7; i++) {
            var balloon = $('#b' + i);

            if (balloon.length) {
                balloon.stop(true, false).animate({
                    top: 240,
                    left: vw + positions[i - 1]
                }, 500);
            }
        }
    }

    $(window).on('resize', function () {
        if ($('#b11').length) {
            arrangeFinalBalloons();
        }
    });

    function arrangeFinalBalloons() {
        vw = $(window).width() / 2;

        var ids = ['#b11', '#b22', '#b33', '#b44', '#b55', '#b66', '#b77'];
        var positions = [-350, -250, -150, -50, 50, 150, 250];

        ids.forEach(function (id, index) {
            $(id).stop(true, false).animate({
                top: 240,
                left: vw + positions[index]
            }, 500);
        });
    }

    // 1. Turn on the lights
    $('#turn_on').click(function () {
        $('#bulb_yellow').addClass('bulb-glow-yellow');
        $('#bulb_red').addClass('bulb-glow-red');
        $('#bulb_blue').addClass('bulb-glow-blue');
        $('#bulb_green').addClass('bulb-glow-green');
        $('#bulb_pink').addClass('bulb-glow-pink');
        $('#bulb_orange').addClass('bulb-glow-orange');

        $('body').addClass('peach');

        $(this).fadeOut('slow').delay(5000).promise().done(function () {
            $('#play').fadeIn('slow');
        });
    });

    // 2. Play birthday music
    $('#play').click(function () {
        var audio = $('.song')[0];

        if (audio) {
            var playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise.catch(function (error) {
                    console.log('Music could not start:', error);
                });
            }
        }

        $('#bulb_yellow').addClass('bulb-glow-yellow-after');
        $('#bulb_red').addClass('bulb-glow-red-after');
        $('#bulb_blue').addClass('bulb-glow-blue-after');
        $('#bulb_green').addClass('bulb-glow-green-after');
        $('#bulb_pink').addClass('bulb-glow-pink-after');
        $('#bulb_orange').addClass('bulb-glow-orange-after');

        $('body').css('background-color', '#FFF');
        $('body').addClass('peach-after');

        $(this).fadeOut('slow').delay(6000).promise().done(function () {
            $('#bannar_coming').fadeIn('slow');
        });
    });

    // 3. Decorate the birthday banner
    $('#bannar_coming').click(function () {
        $('.bannar').addClass('bannar-come');

        $(this).fadeOut('slow').delay(6000).promise().done(function () {
            $('#balloons_flying').fadeIn('slow');

            $('.album-photo').fadeIn('slow');
            $('.can-zoom').fadeIn('slow');
        });
    });

    // Balloon movement
    function balloonLoop(id) {
        var balloon = $('#' + id);

        if (!balloon.length) return;

        var maxLeft = Math.max(100, $(window).width() - 120);
        var maxBottom = Math.max(100, $(window).height() - 150);

        function move() {
            if (!balloon.length || !balloon.is(':visible')) return;

            balloon.animate({
                left: Math.random() * maxLeft,
                bottom: Math.random() * maxBottom
            }, 10000, move);
        }

        move();
    }

    // 4. Fly the balloons
    $('#balloons_flying').click(function () {
        $('.balloon-border').animate({ top: -500 }, 8000);

        $('#b1, #b4, #b5, #b7').addClass('balloons-rotate-behaviour-one');
        $('#b2, #b3, #b6').addClass('balloons-rotate-behaviour-two');

        for (var i = 1; i <= 7; i++) {
            balloonLoop('b' + i);
        }

        $(this).fadeOut('slow').delay(5000).promise().done(function () {
            $('#cake_fadein').fadeIn('slow');
        });
    });

    // 5. Show the birthday cake
    $('#cake_fadein').click(function () {
        $('.cake').fadeIn('slow');

        $(this).fadeOut('slow').delay(3000).promise().done(function () {
            $('#light_candle').fadeIn('slow');
        });
    });

    // 6. Light the candle
    $('#light_candle').click(function () {
        $('.fuego').fadeIn('slow');

        $(this).fadeOut('slow').promise().done(function () {
            $('#wish_message').fadeIn('slow');
        });
    });

    // 7. Show Dolly's birthday balloons
    $('#wish_message').click(function () {
        $('#b1, #b2, #b3, #b4, #b5, #b6, #b7').stop(true, false);

        $('#b1').attr('id', 'b11');
        $('#b2').attr('id', 'b22');
        $('#b3').attr('id', 'b33');
        $('#b4').attr('id', 'b44');
        $('#b5').attr('id', 'b55');
        $('#b6').attr('id', 'b66');
        $('#b7').attr('id', 'b77');

        arrangeFinalBalloons();

        $('.balloons').css('opacity', '0.9');
        $('.balloons h2').fadeIn(3000);

        $(this).fadeOut('slow').delay(3000).promise().done(function () {
            $('#story').fadeIn('slow');
        });
    });

    // 8. Show the personal birthday story
    $('#story').click(function () {
        $(this).fadeOut('slow');

        $('.cake').fadeOut('fast').promise().done(function () {
            $('.message').fadeIn('slow');
        });

        var $messages = $('.message p');
        var totalMessages = $messages.length;

        function msgLoop(i) {
            if (i < totalMessages - 1) {
                $messages.eq(i)
                    .fadeIn('slow')
                    .delay(1500)
                    .fadeOut('slow')
                    .promise()
                    .done(function () {
                        msgLoop(i + 1);
                    });
            } else {
                $messages.eq(i).fadeIn('slow').promise().done(function () {
                    $('.cake').fadeIn('fast');
                });
            }
        }

        msgLoop(0);
    });

    // Birthday photo zoom / lightbox
    $(document).on('click', '.album-photo', function () {
        var src = $(this).attr('src');

        if (src) {
            $('#lightbox img').attr('src', src);
            $('#lightbox').css('display', 'flex').hide().fadeIn('fast');
        }
    });

    // Close photo zoom when clicking outside the photo
    $('#lightbox').click(function (e) {
        if (e.target === this) {
            $('#lightbox').fadeOut('fast');
        }
    });

});
