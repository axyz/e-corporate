$(document).ready(function(){
  Pace.start();

  $('.clients').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
    ]
  });

  $('.slideshow').slick({
    slide: 'img',
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    ]
  });

  console.log(window.location.hash);

});

var filterMasonry = function(masonry, hash) {
  if(hash !== "" && hash != "#portfolio") {
    masonry.find('img').hide();
    masonry.masonry();
    masonry.find('.' + hash.slice(1)).show();
    masonry.masonry();
    document.getElementById('portfolio').scrollIntoView(true);
  }else {
    if(hash == "#portfolio") {
      document.getElementById('portfolio').scrollIntoView(true);
    }
    masonry.find('img').show();
    masonry.masonry();
  }
};

window.onhashchange = function() {
  filterMasonry($('#masonry'), window.location.hash);
};


window.onload = function () {
  var $masonry = $('#masonry');
    $("img.lazy").lazyload({
      appear: function() {
          $masonry.masonry();
      }
    }
    );

    $masonry.imagesLoaded(function(){
      $masonry.masonry({
        isFitWidth: true,
        columnWidth: 410
      });
    });

    $masonry.masonry();

    filterMasonry($masonry, window.location.hash);

};
