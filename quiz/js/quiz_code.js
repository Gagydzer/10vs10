
// quiz_code


var slidecounter;
slidestotal = 1;
slidecounter = 0;
function quiz_nextslide(){		
	slidecounter++;
	console.log('Текущий слайд', slidecounter );
	$('.quiz_block_wrap').css('left', -600*(slidecounter));
	console.log( 'Слайдер прокручен на', -600*(slidecounter) );
	console.log('slidecounter, slidestotal',slidecounter, slidestotal);
	quiz_progress();
	}

function quiz_progress(){
	$('.quiz_progresscounter').css('width', (100*(slidecounter)/(slidestotal+1))+"%");
	$('.quiz_progress').css('opacity', 0.7);
	}
function quiz_showresult(){
	setTimeout( function() {$('.quiz_resultimg').css('-webkit-animation-name', 'scale-in');
	$('.quiz_textcontent').css('-webkit-animation-name', 'from-left');
	}, 1);
	console.log('показ результат');	
}
function quiz_show_media (right) {
	
}
$('#nextslide, .btn').bind('click', function(){
	$('.btn').addClass('animate');
	quiz_nextslide();
	} );
$('#previousslide').bind('click', function(){
	quiz_previousslide();
	console.log('sdelan click')} );
$('.quiz_answers ul li').click(lalala);

function lalala() {
	console.log('по нему кликнули',$(this));
	$(this).css('-webkit-animation-name', 'scale-out');
}

$('.quiz_answers ul li#quiz_answer11, .quiz_answers ul li#quiz_answer12, .quiz_answers ul li#quiz_answer14').bind('click', function(){
	$('.quiz_media_overlay, .quiz_title#wrong').css('display', 'block');
	setTimeout( function(){ $('.quiz_media_overlay').addClass('display').addClass('wrong');
	console.log('показ гифка');	
		setTimeout( function(){ console.log('конец гифка');	
			$('.quiz_media_overlay').removeClass('display')
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

$('.quiz_answers ul li#quiz_answer13').bind('click', function(){
	$('.quiz_media_overlay, .quiz_title#right').css('display', 'block');
	setTimeout( function(){ $('.quiz_media_overlay').addClass('display').addClass('right');
		setTimeout( function(){ 
			$('.quiz_media_overlay').removeClass('display')
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
	}, 3000);
	setTimeout( function(){quiz_nextslide()
	if (slidecounter == (slidestotal+1)) {	
	quiz_showresult();
	}}, 4000);
	
	
	
	});