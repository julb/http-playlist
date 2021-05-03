$(function () {
    $.fn.initialize = function (urls) {
        // Remove all nodes.
        this.empty();

        // Create iframes.
        for (var i in urls) {
            $('<iframe>', {
                src: urls[i],
            })
                .hide()
                .appendTo(this);
        }

        return this;
    };

    $.fn.play = function (timeInterval) {
        // Get ref
        var scope = this;

        // Toggle Sswitch
        scope.toggleSwitchScreens();

        // Play every x ms
        window.setInterval(function () {
            scope.toggleSwitchScreens();
        }, timeInterval);
        return this;
    };

    $.fn.toggleSwitchScreens = function () {
        // Create iframes.
        var indexOfVisibleScreen = this.children('iframe.active').index();
        if (indexOfVisibleScreen == -1) {
            indexOfNextScreen = 0;
        } else {
            indexOfNextScreen = (indexOfVisibleScreen + 1) % this.children('iframe').length;
        }

        // Debug
        console.log('> Displaying screen: ', indexOfNextScreen + 1);

        // Hide the current iframe
        this.children('iframe.active').removeClass('active').fadeOut(1000);

        // Add the active flag on the current iframe.
        this.children('iframe').eq(indexOfNextScreen).addClass('active').fadeIn();

        return this;
    };
});

$(document).ready(function () {
    $('body').empty();

    $.get(
        './config.json',
        function (result) {
            // Adds the message.
            if (result.urls.length == 0) {
                $('<div>', {
                    id: 'message',
                    class: 'info',
                })
                    .append(
                        $('<img>', {
                            src: require('../images/info.png').default,
                        })
                    )
                    .append($('<p>').html('No URLs to display.'))
                    .append(
                        $('<a>', {
                            href: '/',
                        }).html('Reload page')
                    )
                    .appendTo($('body'));
            } else {
                const rotationDelay = result.rotationDelay || 60000;

                // Debug
                console.log('There are ', result.urls.length, ' URLs to display.');
                console.log('Rotation is configured for every ', result.rotationDelay, ' ms.');

                $('<div>', {
                    id: 'container',
                })
                    .appendTo($('body'))
                    .initialize(result.urls)
                    .play(rotationDelay);
            }
        },
        'json'
    )
        .fail(function () {
            $('<div>', {
                id: 'message',
                class: 'error',
            })
                .append(
                    $('<img>', {
                        src: require('../images/error.png').default,
                    })
                )
                .append($('<p>').html('Unable to load configuration.'))
                .append(
                    $('<a>', {
                        href: '/',
                    }).html('Reload page')
                )
                .appendTo($('body'));
        })
        .always(function () {
            $('body').show();
        });
});
