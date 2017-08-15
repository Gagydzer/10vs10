
// quiz_code


var slidecounter;
slidecounter = 1;
function quiz_nextslide(){	
	$('.quiz_block_wrap').css('left', -600*slidecounter);
	console.log( 'Слайдер прокручен на', -600*slidecounter );
	slidecounter++;
	console.log( slidecounter );
	}
function quiz_previousslide(){
	$('.quiz_block_wrap').css('left', 600*slidecounter);
	console.log( 'Слайдер прокручен на', 600*slidecounter );
	slidecounter--;
	console.log( slidecounter );
	}
$('#nextslide, .btn').bind('click', function(){
	quiz_nextslide();
	console.log('sdelan click')} );
$('#previousslide').bind('click', function(){
	quiz_previousslide();
	console.log('sdelan click')} );
$('.quiz_answers ul li').bind('click', function(){
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
	}, 500);
	setTimeout( function(){quiz_nextslide()}, 1500);
	});

