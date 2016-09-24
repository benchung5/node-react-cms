;(function ( $, window, document, undefined ) {
    
    $.fn.onePixel = function ( options ) {
        
        //enable all transition effects after page load (.preload class prevents them)
        $(window).load(function () {
            $("body").removeClass("preload");
        });
        
        
        // // fadein on page load --------------------------------------------------------//
        // to display loading animation before it's ready
        $(document).ready(function() {
            
            //first check if there is a loading container on the page
            if ( $( ".loading-container" ).length ) {
 
                //to show loading animation
                $imgloader = $('.loading-container');
                $loadingimg = $( '<div id="canvasloader-container" class="onepix-imgloader"></div>' );
                

    //          $loadingimg.attr("src","images/flexslider/loading.gif");
                $imgloader.prepend( $loadingimg );
                
    //          canvasloader code
                var cl = new CanvasLoader('canvasloader-container');
                cl.setColor('#ffa937'); // default is '#000000'
                cl.setDiameter(45); // default is 40
                cl.setDensity(75); // default is 40
                cl.setRange(0.7); // default is 1.3
                cl.setSpeed(3); // default is 2
                cl.setFPS(22); // default is 24
                cl.show(); // Hidden by default
                
                $(window).load(function () {
                    $('.onepix-imgloader').fadeOut();
                    // fade in content (using opacity instead of fadein() so it retains it's height.
                    //if home slider doesn't exist (else the slider callback handles this)...
                    if (!$('.homeslider').length) {
                        fade_in_page();
                    }

                });
            
            }
                
        });
        
        //        used to bind loading for the page and flexslider ()
        function fade_in_page() {
            $('.loading-container > *:not(.onepix-imgloader)').fadeTo(8000, 100);
        }
        

        // mobile menu------------------------------------------------------------//
        $(document).ready(function() {
       
            // non dropdown select version mobile menu
            $('#mobile-menu .menu').custom_mobileMenu();
        });


        // "stellar" parallax --------------------------------------------------//

        //the window width threshhold to deactivat stellar
        var widthThresh = 1550;

        $(document).ready(function() {
            
            if ($(window).width() > widthThresh) {
                $.stellar({
                    horizontalScrolling: false,
                    //responsive: true
                    
                    //set vertical offset in the data in the element as:
                    // data-stellar-vertical-offset="-700"
                    //because it needs to load on the fly if page refresh in mobile mode
                });
            }

        })

        $(document).ready(function() {
            react_to_window();
        });
        
//      only activate stellar for window widths above or equal to 1550
        var stellarActivated = false;
        
        $(window).resize(function() {
            react_to_window();
        });
        
        function react_to_window() {
            if ($(window).width() <= widthThresh) {
                if (stellarActivated == true) {
                    $(window).data('plugin_stellar').destroy();
                    stellarActivated = false;
                }
            } else {
                if (stellarActivated == false) {

                    $.stellar({
                       horizontalScrolling: false
                   });
                    
                    $(window).data('plugin_stellar').init();
                    stellarActivated = true;
                }
            }
        }
        
        //header search form ----------------------------------------------------//

        //must do this since css won't allow it while controlling the shortcode
        $(function () {
            //copy the colour and hover color of the element (set by the shortcode) and apply it to the hover bg
            $('#searchform #searchclose').click(
                    function () {
                       $('#searchform #searchwrap').hide();
                    });
            $('#searchform #searchbtn').click(
                    function () {
                       $('#searchform #searchwrap').show();
                    });
                
        });
        

        //back to top --------------------------------------------------//

        $(function() {
            $(window).scroll(function() {
                //important -> height: auto must be set or jquery scrollTop() won't work
                if($(this).scrollTop() > 100) {
                    $('#toTop').fadeIn(3000);
                } else {
                    $('#toTop').fadeOut();
                }
            });
            $('#toTop').click(function() {
                $('html, body').animate(
                {
                    scrollTop:0
                },
                800,
                "easeInOutExpo",
                function() {
                    $('#toTop').fadeOut(1200);
                });
            });
        });

        
    //end $.fn.onePixel = function ( options )
    }
    
    // call the plugin (must use body since it will only work when an element is called)
    $('body').onePixel();

    
})( jQuery, window, document );