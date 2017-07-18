////////////////////////////////////////////////////////////////////////////////
//////////////// Plugins - prepros will concatenate them into global.min.js
////////////////////////////////////////////////////////////////////////////////
//@prepros-prepend vendor/jquery.fitvids.js
//@prepros-prepend vendor/flickity.pkgd.js


////////////////////////////////////////////////////////////////////////////////
//////////////// Custom scripts below...
////////////////////////////////////////////////////////////////////////////////

$(function() { // on document ready do all the things

    ////////////////////////////////////////
    //////// DOM Adjustments - n2 hacks
    ////////////////////////////////////////
    $('#pageHeader h2').appendTo('#pageHeader a');
    $('#productFlagTitle').insertBefore('#productFlag');
    $('#searchkeyword').attr('placeholder', 'Search for a product...');

    
    ////////////////////////////////////////
    //////// Mobile Menu
    ////////////////////////////////////////
    
    // Add hamburger menu
    $('#navigation').append('<button class="menu-toggle" aria-label="Main Navigation"><i class="fa fa-bars" aria-hidden="true"></i></button>')

    // Moves login and cart links to mobile menu
    checkSize();
    $(window).resize(checkSize);
    function checkSize(){
        if ($('.menu-toggle').css('display') == 'block' ){
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

    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////// Accordion Sidebar Menu
    ////////////////////////////////////////////////////////////////////////////

    // Adjusting the DOM
    $('.menu-item-depth-2').each(function() {
      var parentID = $(this).attr('data-parent');
      $(this).appendTo('#' + parentID);
    });

    // Check for second level items
    $('.menu-item-depth-1 > a').each(function(){
      if ( $(this).siblings().length > 0 ) {
        $(this).addClass('has-children');
      }
    });

    // The accordion functionality
    $('.menu-item-depth-1 > a.has-children').on('click', function(e){
      e.preventDefault();
      $(this).parent().toggleClass('active');
    });

    
    ////////////////////////////////////////
    //////// Responsive Tables and Embeds
    ////////////////////////////////////////

    $('table#prodDisplayBlock').wrap('<div class="responsive-table" />');
    $('table#cart').wrap('<div class="responsive-table" />');

    $('#mainbox').fitVids();

    ////////////////////////////////////////
    //////// Carousels
    ////////////////////////////////////////
    $('.featuredProductsContainer').flickity({
        cellSelector: '.featuredProductsProduct',
        cellAlign: 'left',
        contain: true,
        imagesLoaded: true,
        wrapAround: true
    });

    $('.line-card-box').flickity({
        cellAlign: 'left',
        wrapAround: true,
        pageDots: false,
        autoPlay: true,
        prevNextButtons: false,
        imagesLoaded: true,
        lazyLoad: 12
    });
    
    $('#productFlag').flickity({
        cellAlign: 'left',
        contain: true,
        imagesLoaded: true,
        groupCells: true
    })

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