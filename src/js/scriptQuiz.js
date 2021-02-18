window.addEventListener('DOMContentLoaded', () => {

    jQuery(function($){
        $("#tel").mask("+7(999) 999-9999");
    });

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

    function QuizShow() {
        if (!document.querySelector('.main').classList.contains('quizHide')) {
            function block() {
                document.querySelector('.main').style.cssText = 'opacity: 1; visibility: visible; '
            }
            setInterval(block, 20000)
        }
        
        document.querySelector('.main').addEventListener('click', event => {
            if (event.target.classList.contains('main')) {
                document.querySelector('.main').classList.add('quizHide')
                document.querySelector('.quizBtnOpen').style.cssText = 'opacity: 1; visibility: visible';
            }
        })

        document.querySelector('.quizBtnOpen').addEventListener('click', event => {
            document.querySelector('.main').classList.remove('quizHide')
        })
    }
    QuizShow();

    function firstScreenHide() {  // Скрытие приветственного окна и открытие окна с вопросами
        document.querySelector('.content-left__first-btn').addEventListener('click', function() {
            document.querySelector('.content__hi').style.cssText = "left: -100%; opacity: 0; visibility: hidden"
            function quizShow(){
                let block = document.querySelector('.content__all')
                block.style.cssText = "display: flex; right: 50%; opacity: 1; visibility: visible"
            }
            setTimeout(quizShow(), 1000)
        })
    }
    firstScreenHide();

    // Открытие блока с бонусами на моб версии
    function bonusShow() {
        if (window.screen.width < 460) {
            document.querySelector('.content-right').addEventListener('click', () => {
                if (document.querySelector('.content-right').classList.contains('bonusShow')) {
                    document.querySelector('.content-right').classList.remove('bonusShow');
                    document.querySelector('.content-right__arrow').style.cssText = 'transform: rotate(90deg)';
                    document.querySelector('.content-right--bonus').style.cssText = 'display: none';   
                } else {
                    document.querySelector('.content-right').classList.add('bonusShow');
                    document.querySelector('.content-right__arrow').style.cssText = 'transform: rotate(270deg)';
                    document.querySelector('.content-right--bonus').style.cssText = 'display: block';
                }
                
            })
        }
    }
    bonusShow();

    function optionClick() { // Выбор варианта ответа
        let selected = null;
        document.querySelectorAll('.content-quiz__block').forEach(item => {
            console.log(item)
            item.addEventListener('click', event => {
                console.log(event.target)
                if (event.target.parentNode.classList.contains('content-quiz__item')) {
                    if (selected) {
                        selected.classList.remove('check')
                    }
                    
                    selected = event.target.parentNode;
                    selected.classList.add('check');
                } else if (event.target.classList.contains('content-quiz__item')) {
                    if (selected) {
                        selected.classList.remove('check')
                    }
                    selected = event.target;
                    selected.classList.add('check');
                }
                document.querySelectorAll('.content-quiz__block').forEach(() => {
                    document.querySelectorAll('.content-quiz__item').forEach(item => {
                        if (item.classList.contains('check')) {
                            document.querySelector('.content-quiz__next').classList.add('nextActive');
                        }
                    });
                });
            }, false)
        })
    }
    optionClick();

  

function nextBlock() {
    let counter = 0,
        percentNum = 16, // Установка количества процентов за один ответ
        percent = 0,
        titles = {
            first: 'Какое количество гостей в туре для Вас является комфортным?',
            second: 'Какой трансфер Вы предпочитаете?',
            third: 'Размещение в каком отеле Вы предпочтете?',
            fourth: 'Где Вы предпочитаете обедать в туре?',
            fives: 'Что в программе Вас привлекает больше всего?',
            six: 'Что для Вас важно в сервисе тура?'
        };
    
    // Функция смены заголовка
    function setTitle() {
        let titleBlock = document.querySelector('.content-quiz__title'); // Заголовок
        let percentNum = document.querySelector('.content-quiz__progress--title span'); // Число процентов
        let percentLine = document.querySelector('.content-quiz__line'); // Линия процентов
        function setPercent() {
            percentNum.textContent = percent;
            percentLine.style.width = `${percent}%`;
        }
        switch(counter) {
            case 0:
                titleBlock.textContent = titles.first;
                setPercent();
                break;
            case 1:
                titleBlock.textContent = titles.second;
                setPercent();
                break;
            case 2: 
                titleBlock.textContent = titles.third;
                setPercent();
                break;
            case 3:
                titleBlock.textContent = titles.fourth;
                setPercent();
                break;
            case 4:
                titleBlock.textContent = titles.fives;
                setPercent();
                break;
            case 5:
                titleBlock.textContent = titles.six;
                setPercent();
                break;
            case 6:
                function hideTitle() {
                    document.querySelector('.content-quiz__progress').classList.add("blockHide");
                    titleBlock.classList.add("blockHide");
                    function hideNew() {
                        document.querySelector('.content-quiz__progress').classList.add("dNone");
                        titleBlock.classList.add("dNone");
                    }
                    setTimeout(hideNew, 250)
                }
                hideTitle();
                break;
            default:
                titleBlock.textContent = '';
        }
    }
    

    function slideToNextBlock() {
        document.querySelector(".content-quiz__next").addEventListener('click', function() {
            console.log(this)
            document.querySelectorAll('.content-quiz__item').forEach(item => {
                item.classList.remove('check');
            })
            if (this.classList.contains("nextActive")) {
            
                counter = counter + 1;
                percent = percent + percentNum;
                setTitle();
                
                // Функция скрытия блока с вариантами выбора
                function hide(block) {
                    document.querySelector(block).classList.add("blockHide");
                    function hideNew() {
                        document.querySelector(block).classList.add("dNone");
                    }
                    setTimeout(hideNew, 250)
                }
            
                // Функция показа следующего блока с вариантами выбора
                function show(block) {
                    function showNew() {
                        document.querySelector(block).classList.add("dBlock");
                        function s() {
                            document.querySelector(block).classList.add("blockShow")
                        }
                        setTimeout(s, 250)
                    }
                    setTimeout(showNew, 250)
                }

                switch(counter){
                    case 1: 
                        hide(".content-quiz__first");
                        show(".content-quiz__second");
                        document.querySelector(".content-quiz__prev").classList.add('prevActive');
                        break;
                    case 2:
                        hide(".content-quiz__second");
                        show(".content-quiz__third");
                        break;
                    case 3:
                        hide(".content-quiz__third");
                        show(".content-quiz__fourth");
                        break;
                    case 4:
                        hide(".content-quiz__fourth");
                        show(".content-quiz__fives");
                        break;
                    case 5:
                        hide(".content-quiz__fives");
                        show(".content-quiz__six");
                        break;
                    case 6:
                        hide(".content-quiz__six");
                        function nShow() {
                        
                            function showNew() {
                                document.querySelector(".form-send").classList.add("dBlock");
                                function s() {
                                    document.querySelector(".form-send").classList.add("blockShow")
                                }
                                setTimeout(s, 150)
                            }
                            setTimeout(showNew, 250)
                        }
                        nShow();
                        document.querySelector(".content-quiz__navigation").classList.add("dNoneHigh");
                        break;
                    default:
                        
                }
    
                document.querySelector(".content-quiz__next").classList.remove("nextActive");
            }
        })
    }
    slideToNextBlock();

    function slideToPrevBlock() {
        document.querySelector(".content-quiz__prev").addEventListener('click', function() {
            console.log(this)
            if (this.classList.contains("prevActive")) {
            
                counter = counter - 1;
                percent = percent - percentNum;
                setTitle();
                
                function hide(blockHide) {
                    document.querySelector(blockHide).classList.add("blockShow");
                    function hideNew() {
                        document.querySelector(blockHide).classList.remove("dBlock");
                    }
                    setTimeout(hideNew, 250)
                }
                function show(block) {
                    
                    function showNew() {
                        document.querySelector(block).classList.remove("dNone");
                        function s() {
                            document.querySelector(block).classList.remove("blockHide")
                        }
                        setTimeout(s, 250)
                    }
                    setTimeout(showNew, 250)
                }
                switch(counter){
                    case 0: 
                        hide(".content-quiz__second");
                        show(".content-quiz__first");
                        document.querySelector(".content-quiz__prev").classList.remove('prevActive');
                        break;
                    case 1:
                        hide(".content-quiz__third");
                        show(".content-quiz__second");
                        break;
                    case 2:
                        hide(".content-quiz__fourth");
                        show(".content-quiz__third");
                        break;
                    case 3:
                        hide(".content-quiz__fives");
                        show(".content-quiz__fourth");
                        break;
                    case 4:
                        hide(".content-quiz__six");
                        show(".content-quiz__fives");
                        break;
                    case 5:
                        hide(".content-quiz__fourth");
                        function nShow() {
                        
                            function showNew() {
                                document.querySelector(".form-send").classList.add("dBlock");
                                function s() {
                                    document.querySelector(".form-send").classList.add("blockShow")
                                }
                                setTimeout(s, 150)
                            }
                            setTimeout(showNew, 250)
                        }
                        nShow();
                        document.querySelector(".content-quiz__navigation").classList.add("dNone");
                    default:

                }
    
                document.querySelector(".content-quiz__next").classList.remove("nextActive");
            }
        })
    }
    slideToPrevBlock();

    
}
nextBlock();


// nextBlock('.content-quiz__first', '.content-quiz__second', '.content-quiz__next');
// nextBlock('.content-quiz__second', '.content-quiz__third', '.nextBtnSecond');
// nextBlock('.content-quiz__third', '.content-quiz__fourth', '.nextBtnThird');
// nextBlock('.content-quiz__fourth', '.form-send', '.nextBtnFourth');


// function prevBlock(block, prevBlock, prevBtn) {
//     document.querySelector(prevBtn).addEventListener('click', () => {
//         document.querySelector(block).style.cssText = "z-index: -100;  opacity: 0; ";
//         document.querySelector(prevBlock).style.cssText = "z-index: 2; opacity: 1; ";
//     })
// }
// prevBlock('.content-quiz__second', '.content-quiz__first', '.prevBtnSecond');
// prevBlock('.content-quiz__third', '.content-quiz__second', '.prevBtnThird');
// prevBlock('.content-quiz__fourth', '.content-quiz__third', '.prevBtnFourth');


var mh = Math.max.apply(Math, $('.content-quiz').map(function(){  
    return $(this).height();
}).get());
$(".content-quiz").height(mh);

function FormSend() {
    $('.content-quiz__item').on('click', function(event) {
        var all_data = $(this).data();
        for (var key in all_data) {
            var data = all_data[key];
            var key = key;
        }
        if ($('.quiz-form').children('input[name="' + key + '"]').length > 0) {
            $('input[name="' + key + '"]').val($(this).data(key));
        } else {
            $(".quiz-form").append('<input type="hidden" name="' + key + '" value="' + $(this).data(key) + '">');
        }
    });
    // $('.content-quiz__options').on('click', function(event) {
    //     var all_data = $(this).data();
    //     for (var key in all_data) {
    //         var data = all_data[key];
    //         var key = key;
    //     }
    //     if ($('.quiz-form').children('input[name="' + key + '"]').length > 0) {
    //         $('input[name="' + key + '"]').val($(this).data(key));
    //     } else {
    //         $(".quiz-form").append('<input type="hidden" name="' + key + '" value="' + $(this).data(key) + '">');
    //     }
    // });

}
FormSend();
})