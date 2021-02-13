window.addEventListener('DOMContentLoaded', () => {

    

    // window.onload = function () {
    //   document.body.classList.add('loaded_hiding');
    //   window.setTimeout(function () {
    //     document.body.classList.add('loaded');
    //     document.body.classList.remove('loaded_hiding');
    //   }, 500);
    // }

    $('.discount').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      responsive: [
        {
          breakpoint: 989,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 479,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
    lightGallery(document.querySelector('.lightgallery'));
    lightGallery(document.querySelector('.lightgallery1'));
    lightGallery(document.querySelector('.lightfirst'));
    lightGallery(document.querySelector('.lightsecond'));

    $('img.img-svg').each(function(){
      var $img = $(this);
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');
      $.get(imgURL, function(data) {
        var $svg = $(data).find('svg');
        if(typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }
        $img.replaceWith($svg);
      }, 'xml');
    });

  
  $(document).ready(function(){
    $(".set > a").on("click", function(event){
      event.preventDefault();
      if($(this).hasClass('active')){
        $(this).removeClass("active");
        $(this).siblings('.content').slideUp(200);
        $(".set > a svg").removeClass("plus")
        $(this).find("svg").removeClass("plus");
      } else {
        $(".set > a svg").removeClass("plus");
        $(this).find("svg").addClass("plus")
        $(".set > a").removeClass("active");
        $(this).addClass("active");
        $('.content').slideUp(200);
        $(this).siblings('.content').slideDown(200);
      }
    });
  });
});

function modalShow(btn) {
  document.querySelector(`${btn}`).addEventListener('click', () => {
    console.log(document.querySelector('.modal'))
    document.querySelector('.modal').classList.add('showModal')
  })
}

modalShow('.booking__btn');
modalShow('.program__btn');
modalShow('.menu__btn');


function modalHide() {
  document.querySelector('.modal').addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
      document.querySelector('.modal').classList.remove('showModal')
    }
  })
}

modalHide();
  // function hideImg() {
  //   if (window.location.href != "https://www.pracasofar.com.ua/" || window.location.href != "https://www.pracasofar.com.ua/thankyou") {
  //     document.querySelector('.header').style.cssText = "height: 100%"
  //   }
  //   console.log(window.location.href)
  //   if (window.location.href == "https://www.pracasofar.com.ua/thankyou/") {
  //     document.querySelector('.header').style.cssText = "height: 100vh"
  //   }
  // }
  // hideImg()

  // function menu() {
  //   const humburger = document.querySelector('.menu__humburger'),
  //   menu = document.querySelector('.menu__mobile'),
  //   close = document.querySelector('.menu__mobile--close');
  //   document.querySelectorAll('.menu__list--mobile .menu__item a').forEach(item => {
  //     item.addEventListener('click', () => {
  //       menu.style.cssText = 'right: -100%'
  //     })
  //   })
  //   humburger.addEventListener('click', () => {
  //     menu.style.cssText = 'right: 0px'
  //   })
  //   close.addEventListener('click', () => {
  //     menu.style.cssText = 'right: -100%'
  //   })
  // }
  // menu();  

  // function menuNum() {
  //   document.body.addEventListener('click', (event) => {      
  //       if (event.target == document.querySelectorAll('.menu__num li a')[0] ||
  //       event.target == document.querySelectorAll('.menu__num li a')[1] ||
  //       event.target == document.querySelectorAll('.menu__num li a')[2]
  //       ) {
  //         document.querySelectorAll('.menu__num li').forEach((item) => {
  //           item.classList.add('menu__num--active')
  //         })
  //         document.querySelector('.menu__num--tr svg').style.cssText = 'transform: rotate(360deg)'
  //       } else {
  //         document.querySelectorAll('.menu__num li').forEach((item) => {
  //           item.classList.remove('menu__num--active')
  //         })
  //         document.querySelector('.menu__num--tr svg').style.cssText = 'transform: rotate(180deg)'
  //         document.querySelector('.menu__num--first').classList.add('menu__num--active')
  //       }      
  //   })
  // }
  // menuNum();

  // function modalShow(button, modal, oldModal) {
  //   document.querySelectorAll(button).forEach(function (item) {
  //     item.addEventListener('click', function(event) {
  //       document.querySelector(modal).style.cssText = 'opacity: 1; z-index: 200;';
  //       if(oldModal) {
  //         if (this.hasAttribute('data-title-name')) {
  //           document.querySelector('.modal-content__title').textContent = `${event.target.parentNode.parentNode.parentNode.childNodes[1].textContent}`;
  //           if (event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1] != undefined) {
  //             document.querySelector(".modal-content__img--buy img").src = `${event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].getAttribute('src')}`;
  //           }   
  //         } else {
  //           document.querySelector('.modal-content__title').textContent = `${event.target.parentNode.parentNode.childNodes[1].textContent}`;
  //           if (event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1] != undefined) {
  //             document.querySelector(".modal-content__img--buy img").src = `${event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].getAttribute('src')}`;
  //           } 
  //         }
  //         document.querySelector(oldModal).style.cssText = 'opacity: 0; z-index: -1;';
          
  //       }
  //       if (modal) {
  //         if (this.hasAttribute('data-title-name')) {
  //           let titleStr = event.target.parentNode.parentNode.parentNode.childNodes[1].textContent;
  //           titleStr = titleStr.trim();
  //           $('input[name="title"]').val(titleStr);
            
  //           let titleCountry = event.target.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].childNodes[1].childNodes[1].childNodes[3].textContent;
  //           titleCountry = titleCountry.trim();
  //           $('input[name="country-vacancies"]').val(titleCountry);
              
  //         } else {
  //           let titleStr = event.target.parentNode.parentNode.childNodes[1].textContent;
  //           titleStr = titleStr.trim();
  //           $('input[name="title-vacancies"]').val(titleStr);
            
  //           let titleCountry = event.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[3].textContent;
  //           titleCountry = titleCountry.trim();
  //           $('input[name="country-vacancies"]').val(titleCountry);
  //         }
  //         // document.querySelectorAll('.modal-block-title').forEach(item => {
  //         //   let titleStr = item.textContent;
  //         //   console.log(titleStr)
  //         //   titleStr = titleStr.trim();
            
  //         // })
  //         console.log(event.target.parentNode.parentNode.childNodes[3].childNodes[3].childNodes[3])
  //         document.querySelector('.vacancies-list__price').textContent = `${event.target.parentNode.parentNode.childNodes[3].childNodes[3].childNodes[3].textContent}`;
  //         document.querySelector('.vacancies-list__time').textContent = `${event.target.parentNode.parentNode.childNodes[3].childNodes[5].childNodes[3].textContent}`;
  //         document.querySelector('.vacancies-list__priceNew').textContent = `${event.target.parentNode.parentNode.childNodes[3].childNodes[7].childNodes[3].textContent}`;

  //         document.querySelector('.vacancies-list__new').textContent = `${event.target.parentNode.parentNode.childNodes[5].textContent}`;
  //         document.querySelector('.vacancies-list__more').textContent = `${event.target.parentNode.parentNode.childNodes[5].textContent}`;
  //         document.querySelector('.modal-block__title').textContent = `${event.target.parentNode.parentNode.childNodes[1].textContent}`;
  //         document.querySelector('.modal-content__buy').dataset.titleName = `${event.target.parentNode.parentNode.childNodes[1].textContent}`;
  //         if (event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1] != undefined) {
  //           document.querySelector(".modal-content__img img").src = `${event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].getAttribute('src')}`;
  //         }
          
  //       }
        
  //     })
  //   })
  // }
  // modalShow(".vacancies-buttons__info", ".modal--info");
  // modalShow(".vacancies-buttons__buy", ".modal--buy", '.modal--info');

  // function modalClose(button, modal) {
  //   document.querySelectorAll(button).forEach(item => {
  //     item.addEventListener('click', () => {
  //       document.querySelectorAll(modal).forEach(mod => {
  //         mod.style.cssText = 'opacity: 0; z-index: -1;';
  //       })
  //     })
  //   })
  // }
  // modalClose('.modal-block__close', '.modal')

$(function(){
    $('input[name="phone"]').mask("99 999 9999");
  });

  $(function(){
    var input = document.querySelectorAll('input[name="phone"]');
    

    input.forEach(function(item) {

      errorMsg = document.querySelector("#error-msg"),
      validMsg = document.querySelector("#valid-msg");

      var iti = window.intlTelInput(item, {
        onlyCountries: [ "ua", "al", "ad", "at", "by", "be", "ba", "bg", "hr", "cz", "dk",
  "ee", "fo", "fi", "fr", "de", "gi", "gr", "va", "hu", "is", "ie", "it", "lv",
  "li", "lt", "lu", "mk", "mt", "md", "mc", "me", "nl", "no", "pl", "pt", "ro",
  "ru", "sm", "rs", "sk", "si", "es", "se", "ch", "gb"],
      hiddenInput: "full_phone",
      initialCountry:"ru",
      autoHideDialCode: false,
      separateDialCode: true,
      preferredCountries: [ "ru", "by", "ua"]
      });
      
      // let str = document.querySelector('.iti__selected-flag').getAttribute("title");
      //   str = str.split("+");
      //   document.querySelector('input[name="input-hidden"]').value = str[1];
      
      // document.body.addEventListener('click', () => {
      //   let str = document.querySelector('.iti__selected-flag').getAttribute("title");
      //   str = str.split("+");
      //   document.querySelector('input[name="input-hidden"]').value = str[1];
      // })

    //   var reset = function() {
    //     input.classList.remove("error");
    //     errorMsg.innerHTML = "";
    //     errorMsg.classList.add("hide");
    //     validMsg.classList.add("hide");
    //   };
    
    // // on blur: validate
    // item.addEventListener('blur', function() {
    //   reset();
    //   if (input.value.trim()) {
    //     if (iti.isValidNumber()) {
    //       validMsg.classList.remove("hide");
    //     } else {
    //       input.classList.add("error");
    //       var errorCode = iti.getValidationError();
    //       errorMsg.innerHTML = errorMap[errorCode];
    //       errorMsg.classList.remove("hide");
    //     }
    //   }
    // });
    //   // on keyup / change flag: reset
    //   item.addEventListener('change', reset);
    //   item.addEventListener('keyup', reset);

    });
  })
  


// const anchors = document.querySelectorAll('a[href*="#"]')

// for (let anchor of anchors) {
//   anchor.addEventListener('click', function (e) {
//     const menu = document.querySelector('.navigation-menu')
//     menu.classList.toggle('navigation-menu_active')
//     e.preventDefault()
    
//     const blockID = anchor.getAttribute('href').substr(1)
    
//     document.getElementById(blockID).scrollIntoView({
//       behavior: 'smooth',
//       block: 'start'
//     })
//   })
// }

 
// function scrollDownEvent(item) {
// 	$(item).on("click","a", function (event) {
// 		//забираем идентификатор бока с атрибута href
// 		var id  = $(this).attr('href'),
			
// 		//узнаем высоту от начала страницы до блока на который ссылается якорь
// 		top = $(id).offset().top;
		
// 		if(id.includes('http')){
// 			document.location.href=id;
// 		}
//     //отменяем стандартную обработку нажатия по ссылке
// 		event.preventDefault();
		
// 		//анимируем переход на расстояние - top за 1500 мс
// 		$('body,html').animate({scrollTop: top}, 1500);
// 	});
// };
// scrollDownEvent('.header .menu__list');

// $('.scroll-down').on("click", function (event) {
//   //отменяем стандартную обработку нажатия по ссылке
//   event.preventDefault();

//   //забираем идентификатор бока с атрибута href
//   var id  = $(this).attr('href'),

//   //узнаем высоту от начала страницы до блока на который ссылается якорь
//     top = $(id).offset().top;
  
//   //анимируем переход на расстояние - top за 1500 мс
//   $('body,html').animate({scrollTop: top}, 1500);
// });


// $(document).on('click', 'div[class^="vacancies-buttons"]', function(e) {
//   e.preventDefault();
//   console.log(e.target);
//   console.log(this);
//   alert('Вы кликнули по ссылке с классом ' + this.className);
// });