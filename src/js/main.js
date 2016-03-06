$(document).ready(function(){
  // googlemap
  
  // scroll header
  $(function(){
    var shrinkHeader = 300;
    $(window).scroll(function() {
      var scroll = getCurrentScroll();
        if ( scroll >= shrinkHeader ) {
             $('.header').addClass('header_small');
          }
          else {
              $('.header').removeClass('header_small');
          }
    });
    function getCurrentScroll() {
      return window.pageYOffset || document.documentElement.scrollTop;
      }
    });

  // lang switch
  $('.lang').mouseenter(function(){
    $(this).addClass('open');
  });

  $('.lang').mouseleave(function(){
    $(this).removeClass('open');
  });

  $('.lang--item').click(function(){
    var setLang = $('.lang').data('location'),
        dataLangSelect = $(this).data('lang');

    $('.lang-select').data('location', dataLangSelect);

    $('ul li').removeClass('lang--item--active');
        $(this).toggleClass('lang--item--active');
       });

  // search
  var submitIcon = $('.search');
  var inputBox = $('.searchbox--input');
  var searchbox = $('.searchbox');
  var isOpen = false;

  submitIcon.click(function(){
     if(isOpen === false){
         searchbox.addClass('searchbox--open');
         inputBox.focus();
         isOpen = true;
     } else {
         searchbox.removeClass('searchbox--open');
         inputBox.focusout();
         isOpen = false;
     }
  });
});
