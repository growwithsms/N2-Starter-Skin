////////////////////////////////////////////////////////////////////////////////
//////////////// Plugins - prepros will concatenate them into global.min.js
////////////////////////////////////////////////////////////////////////////////
//@prepros-prepend jquery.fitvids.js
//@prepros-prepend jquery.stacktable.js


////////////////////////////////////////////////////////////////////////////////
//////////////// Custom scripts below...
////////////////////////////////////////////////////////////////////////////////

$(function() { // on document ready do all the things

    ////////////////////////////////////////
    //////// DOM Adjustments - n2 hacks
    ////////////////////////////////////////
    $('#pageHeader h2').appendTo('#pageHeader a');

    // Move an element Down function
    $.fn.moveDown = function() {
        $.each(this, function() {
            $(this).before($(this).next());
        });
    };

    // Moves the Category name below picture in DOM
    $('#category > ul > li > h3').moveDown();

    
    ////////////////////////////////////////
    //////// Mobile Menu
    ////////////////////////////////////////
    
    // Add hamburger menu
    $('#navigation').append('<button class="menu-toggle"><i class="fa fa-bars" aria-hidden="true"></i></button>')

    // Moves login and cart links to mobile menu
    checkSize();
    $(window).resize(checkSize);
    function checkSize(){
        if ($(".menu-toggle").css("display") == "block" ){
            // Move all the things to off-canvas mobile menu
            $('#intro #login').appendTo('#navigation > ul');
            $('#intro #tinycart').appendTo('#navigation > ul');
        } else {
            // Move all the things back on resize 
            $('#intro #login').appendTo('#intro');
            $('#intro #tinycart').appendTo('#intro');
        }
    }

    // Toggle Menu
    $('.menu-toggle').on('click', function() {
        $('body').toggleClass('show-menu');
    });


    ////////////////////////////////////////
    //////// Responsive Tables and Embeds
    ////////////////////////////////////////

    $('table#prodDisplayBlock').wrap('<div class="responsive-table" />')
    $('table#cart').wrap('<div class="responsive-table" />');

    $("#mainbox").fitVids();


    ////////////////////////////////////////
    //////// Other General Improvements
    ////////////////////////////////////////

    // Wraps all symbols in SUP tag for proper styling
    $('#mainbox :not(script)').contents().filter(function() {
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


}); // end document ready