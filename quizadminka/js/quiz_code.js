
// quiz_code
$( document ).ready(function() {

	// незаконченая функция
	var quizdata = '{ "title": "Как хорошо вы знаете<br>экзотических грызунов?", "id": 45523, "totalquestions": 3, "ansvers": 500, "bg_startimg": "images/quiz_start.jpg", "bg_endimg": "images/quiz_start.jpg", "iconstheme": "royal", "mediatheme": "ivanvasilich", "quiz_list": [ { "id": 2, "title": "Что это за зверек?", "bg": "images/quiz.jpg", "questions": [ {"ansver": "первый ответ", "count": 125, "true": true}, {"ansver": "второй ответ", "count": 125, "true": true}, {"ansver": "третий ответ", "count": 125, "true": true}, {"ansver": "четвертый ответ", "count": 125, "true": true} ] }, { "id": 2, "title": "Что это за зверек?", "bg": "images/quiz.jpg", "questions": [ {"ansver": "первый ответ", "count": 125, "true": true}, {"ansver": "первый ответ", "count": 125, "true": true}, {"ansver": "первый ответ", "count": 125, "true": true}, {"ansver": "первый ответ", "count": 125, "true": true} ] } ] }';
	function getdata(jsondata){
	var quizparsed = jQuery.parseJSON(quizdata);
	var quiz_list;
	list_ansvers = quizparsed.quiz_list[0].questions;
	console.log(list_ansvers);
	var ul = $('<ul></ul>');
	for (i=0;i<list_ansvers.length;i++){
			$('<li id=ansver1'+i+'><div class="percents"></div><span>'+list_ansvers[i].ansver+'</span><span class="numbers"><div></div>%</span></span></li>').appendTo(ul);		
			console.log(list_ansvers[i].ansver);
		}
	console.log(ul);
	var ansvers = $('<div class="quiz_answers"></div>');
	ul.appendTo(ansvers);
	$('#test').html(ansvers);
}
	function baluem(){
		
	elements = $('li');
	firstli = elements.get(0);
	element = $(firstli);
	newli = $('<span>novoe span</span>');
		element.append(newli);
	}

baluem();

console.log( 'готов!' );
var slidecounter;
slidestotal = 1;
slidecounter = 0;
//показ след. слаида
function quiz_nextslide(){		
	slidecounter++;
	console.log('Текущий слайд', slidecounter );
	$('.quiz_block_wrap').css('left', -600*(slidecounter));
	console.log( 'Слайдер прокручен на', -600*(slidecounter) );
	console.log('slidecounter, slidestotal',slidecounter, slidestotal);
	quiz_progress();
	}
//прогрессбар
function quiz_progress(){
	$('.quiz_progresscounter').css('width', (100*(slidecounter)/(slidestotal+1))+"%");
	$('.quiz_progress').css('opacity', 0.7);
	}
//показать результаты ответа
function quiz_showresult(){
	setTimeout( function() {$('.quiz_resultimg').css('-webkit-animation-name', 'scale-in');
	$('.quiz_textcontent').css('-webkit-animation-name', 'from-left');
	}, 1);
	console.log('показ результат');	
}
//сюда будет выведена функция показа гифки
function quiz_show_media (right) {
	
}
//след слайд по нажатию стартовой кнопки
$('#nextslide, .btn').bind('click', function(){	
	$('.btn').addClass('animate');
	setTimeout( function() {quiz_nextslide();}, 500);
	} );
$('.quiz_answers ul li').click(lalala);

function lalala() {
	console.log('по нему кликнули',$(this));
	$(this).css('-webkit-animation-name', 'scale-out');
}

//обработка кликов по неверным ответам
$('.quiz_answers ul li#quiz_answer11, .quiz_answers ul li#quiz_answer12, .quiz_answers ul li#quiz_answer14').bind('click', function(){
	$('.quiz_media_overlay, img.wrong, .quiz_title#wrong').css('display', 'block').css('z-index', '11000');
	setTimeout( function(){ $('.quiz_media_overlay').addClass('display').addClass('wrong');
	console.log('показ гифка');	
		setTimeout( function(){ console.log('конец гифка');	
			$('.quiz_media_overlay').removeClass('display');
				setTimeout( function(){ $('.quiz_media_overlay').css('z-index', '-100')}, 500);			
			}, 1100);
			
	}, 500);
	setTimeout( function(){	
		$('#quiz_answer11').addClass('wrong');
		$('#quiz_answer12').addClass('wrong');
		$('#quiz_answer14').addClass('wrong');
		$('#quiz_answer13').addClass('right');
		$('#quiz_answer11 div.percents').css('width', '10%');
		$('#quiz_answer12 div.percents').css('width', '15%');
		$('#quiz_answer13 div.percents').css('width', '10%');
		$('#quiz_answer14 div.percents').css('width', '65%');
		$('#quiz_answer11 span.numbers div').text('10');
		$('#quiz_answer12 span.numbers div').text('15');
		$('#quiz_answer13 span.numbers div').text('10');
		$('#quiz_answer14 span.numbers div').text('65');
		$('.quiz_answers ul li .numbers').css('opacity', '1');
		$('.quiz_answers ul li .numbers div').spincrement();
	}, 1500);
	console.log('slidecounter, slidestotal',slidecounter, slidestotal);
	setTimeout( function(){quiz_nextslide()
	if (slidecounter == (slidestotal+1)) {	
	quiz_showresult();
	}}, 4000);
	
	
	
	});
//тупо клик по верному ответу
$('.quiz_answers ul li#quiz_answer13').bind('click', function(){
	$('.quiz_media_overlay, img.right, .quiz_title#right').css('display', 'block');
	setTimeout( function(){ $('.quiz_media_overlay').addClass('display').addClass('right');
		setTimeout( function(){		
			$('.quiz_media_overlay').removeClass('display');
			}, 2000);
	}, 650);
	setTimeout( function(){	
		$('#quiz_answer11').addClass('wrong');
		$('#quiz_answer12').addClass('wrong');
		$('#quiz_answer14').addClass('wrong');
		$('#quiz_answer13').addClass('right');
		$('#quiz_answer11 div.percents').css('width', '10%');
		$('#quiz_answer12 div.percents').css('width', '15%');
		$('#quiz_answer13 div.percents').css('width', '10%');
		$('#quiz_answer14 div.percents').css('width', '65%');
		$('#quiz_answer11 span.numbers div').text('10');
		$('#quiz_answer12 span.numbers div').text('15');
		$('#quiz_answer13 span.numbers div').text('10');
		$('#quiz_answer14 span.numbers div').text('65');
		$('.quiz_answers ul li .numbers').css('opacity', '1');
		$('.quiz_answers ul li .numbers div').spincrement();
	}, 3000);
	setTimeout( function(){quiz_nextslide()
	if (slidecounter == (slidestotal+1)) {	
	quiz_showresult();
	}}, 4000);
	
	
	
	});
	
	
})