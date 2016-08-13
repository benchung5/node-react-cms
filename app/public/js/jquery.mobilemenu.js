// * ben - non dropdown select version. ----------------//
(function($){
$.fn.custom_mobileMenu = function() {
    
    //attach the down arrow for submenu
    $( "#menu-custom-mobile-menu li" ).has( "ul" ).prepend("<span class='submenu-slide' href='#'><i class='fa fa-angle-down fa-6'></i></span>");

//    $( "h2" ).appendTo( $( ".container" ) );

    /* toggle nav */
    $("#mobile-selector").on("click", function(){
        $("#menu-custom-mobile-menu").slideToggle('fast');
        $(this).toggleClass("active");
    });
    
    /* toggle submenu items*/
    $("#menu-custom-mobile-menu li span.submenu-slide").on("click", function(){
        $(this).siblings( "ul.sub-menu" ).slideToggle('fast');
    });

};
})(jQuery);
