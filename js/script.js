$(document).ready(function (){



  $('.slider .owl-carousel').owlCarousel({

    loop:true,
    margin:0,
    nav:false,
    dots:true,
    autoplay:false,
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
const iconSearch = document.querySelector('.icons__search');
const body = document.querySelector('body');

iconSearch.addEventListener('click', function(event){
  event.stopPropagation();
  iconSearch.classList.add('icons__search--active');
});

body.addEventListener('click', function(event){
  iconSearch.classList.remove('icons__search--active');
});
