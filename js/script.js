$(document).ready(function (){



  $('.slider .owl-carousel').owlCarousel({

    loop:true,
    margin:0,
    nav:false,
    dots:true,
    autoplay:true,
    autoplayTimeout:5000,
    animateOut: 'fadeOut',
    autoplayHoverPause:true,
    navText:[],
    responsive:{
        0:{
            items:1,
            dots:true,
            nav:false,

        }
    }
});

$('.slider2 .owl-carousel').owlCarousel({

  loop:true,
  margin:0,
  nav:false,
  dots:true,
  autoplay:true,
  autoplayTimeout:5000,
  animateOut: 'fadeOut',
  autoplayHoverPause:true,
  navText:[],
  responsive:{
      0:{
          items:1,
          dots:true,
          nav:false,

      }
  }
});


});
