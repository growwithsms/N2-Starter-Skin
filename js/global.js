// on document ready do all the things
$(function() {

    ////////////////////////////////////////
    //////// Adjust Logo in DOM
    ////////////////////////////////////////
    $('#pageHeader h2').appendTo('#pageHeader a');

    ////////////////////////////////////////
    //////// Mobile Menu
    ////////////////////////////////////////
    
    // Add hamburger menu
    $('#navigation').append('<div class="menu-toggle"><i class="fa fa-bars" aria-hidden="true"></i></div>')
    
    // Toggle Menu
    $('.menu-toggle').on('click', function(e) {
        e.stopPropagation();
        $('body').toggleClass('show-menu');
        return false;
    });

    // Hide menu if click is outside of menu
    $(document).on('click', function(e) {
        $('body').removeClass('show-menu');
    });

    ////////////////////////////////////////
    //////// Product Pages
    ////////////////////////////////////////

    // Add wrapper to product table so we can enable scrolling on mobile
    $('#prodDisplayBlock').wrap('<div class="prodDisplayBlock-wrapper" />');

    // Move an element Down function
    $.fn.moveDown = function() {
        $.each(this, function() {
            $(this).before($(this).next());
        });
    };

    // Moves the Category name below picture in DOM
    $('#category > ul > li > h3').moveDown();


    ////////////////////////////////////////
    //////// General Improvements
    ////////////////////////////////////////

    // Wraps all symbols in SUP tag for proper styling
    $('body :not(script)').contents().filter(function() {
        return this.nodeType === 3;
    }).replaceWith(function() {
        return this.nodeValue.replace(/[™®©]/g, '<sup>$&</sup>');
    });

    // Enables smooth scrolling on anchor links
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    });

// end document ready
});
