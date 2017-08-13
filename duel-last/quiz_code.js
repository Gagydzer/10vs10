/* 10vs10 duel-script, documentation: */


/* animations block */
function quiz_phase1_to2(){
 $(".phase1").removeClass("phase1").addClass('phase2');
 $(".btn").addClass('phase2');
} 
function quiz_firstwin_animation(){
$(".phase1").removeClass("phase1").addClass('phase2');
$(".phase2").removeClass("phase2").addClass('phase3');
$('#quiz-overlay-winner-left').addClass('quiz-img-overlay-win');
$('#quiz-overlay-looser-right').addClass('quiz-img-overlay-lose');
$("#quiz-frame-winner1").ready( function() {
	console.log( 'готов!' );
	$("#quiz-frame-winner1,#quiz_photo_container").addClass('win1');
});
$("#quiz-frame-winner1").addClass('display');
$(".quiz-agree").addClass('phase3');
$("#quiz_image1_container, #quiz_image2_container, .quiz_img_subcontainer").addClass('nopointer');
}
function quiz_secondwin_animation(){
$(".phase1").removeClass("phase1").addClass('phase2');
$(".phase2").removeClass("phase2").addClass('phase3');
$('#quiz-overlay-winner-right').addClass('quiz-img-overlay-win');
$('#quiz-overlay-looser-left').addClass('quiz-img-overlay-lose');
$(".quiz-agree").addClass('phase3');
$("#quiz-frame-winner2").addClass('display');
$("#quiz-frame-winner2").ready( function() {
	console.log( 'готов!' );
	$("#quiz-frame-winner2,#quiz_photo_container").addClass('win2');

});
$("#quiz_image1_container, #quiz_image2_container, .quiz_img_subcontainer").addClass('nopointer');
}



/* data-block */

var quizdata = '{"title": "Самый ЖОСКИЙ персонаж Mad Max 2", "one": "Безумный Макс", "two": "Фьюриос", "onevotes": 10, "twovotes": 10}';
	var quizparsed = jQuery.parseJSON( quizdata );
	var quizparseone, quizparsedtwo
	quizparsedone = quizparsed.one.replace(/\s/ig, '</span><br><span>');
	quizparsedtwo = quizparsed.two.replace(/\s/ig, '</span><br><span>');
	$('#quiz-header-content').html(quizparsed.title);
	$('#quiz-lefttitle, #quiz-left-win').html('<span>'+quizparsedone+'</span>');
	$('#quiz-righttitle, #quiz-right-win').html('<span>'+quizparsedtwo+'</span>');
	$('#quiz-left-win').html(quizparsed.one);
	$('#quiz-right-win').html(quizparsed.two);

	$('#votes2').html(quizparsed.twovotes);
	$('#counter').html(quizparsed.onevotes+quizparsed.twovotes);
	
	$('button').bind('click', function(){
	$('#counter').html(quizparsed.onevotes+quizparsed.twovotes+1);});
	$('#quiz-total-votes').html(quizparsed.onevotes+quizparsed.twovotes);
	/* определние победителя */
	
	function quiz_winner_determinate() {
	if (quizparsed.onevotes > quizparsed.twovotes) {
	return 1;} 
	else if (quizparsed.onevotes == quizparsed.twovotes) { 
	return 2;}
	if (quizparsed.onevotes < quizparsed.twovotes) {
	return 3;} 
};

	/* вставка голосов во флаги и нижний блок */

function quiz_votes_insert() {
	$('#quiz-flag-right').html(quizparsed.twovotes);
	$('#quiz-flag-left').html(quizparsed.onevotes);
	$('#quiz-total-votes').spincrement({
	from: quizparsed.onevotes+quizparsed.twovotes,
	to: quizparsed.onevotes+quizparsed.twovotes,
	});
	};	
	
	/* подсчет процентов */

function quiz_votes_percent(vote1, vote2) {
	return Math.round((vote1/(vote1+vote2))*100);
	};
	
	/* вставка процентов */

function quiz_percent_insert(){
	$("#quiz-left-percent,#quiz-right-percent").spincrement({
    from: 0,                
    to: quiz_percent,              
    decimalPlaces: 0,
    decimalPoint: ".",      
    thousandSeparator: ",", 
    duration: 2000
	});
	$('.circle2').css('animation-name', 'grow'+Math.floor(quiz_percent/5));
	
	};

	/* все анимации */

function quiz_result(){
	if (quiz_winner_determinate(quizparsed.onevotes, quizparsed.twovotes) == 1) {
	quiz_percent = quiz_votes_percent(quizparsed.onevotes, quizparsed.twovotes);
	quiz_firstwin_animation();}
	else if (quiz_winner_determinate(quizparsed.onevotes, quizparsed.twovotes) == 2) {
	quiz_percent = 50;
	quiz_draw_animation();}
	else if (quiz_winner_determinate(quizparsed.onevotes, quizparsed.twovotes) == 3) {
	quiz_percent = quiz_votes_percent(quizparsed.twovotes, quizparsed.onevotes);
	quiz_secondwin_animation();}
	quiz_votes_insert();
	setTimeout(quiz_percent_insert, 3700);
	$('#quiz-pie.phase3 .circle2').css(animation-name, 'grow'+match.floor(quiz_percent/5));
	};
	
	/* обработка кликов */
	var clickhapped = 'False';
$('#quiz_image1_container').bind('click', function(){
	if (clickhapped == 'False') {
	clickhapped = 'True';
	var quiz_percent;
	quizparsed.onevotes = 1 + quizparsed.onevotes;
	quiz_result();	
	};
	});
$('#quiz_image2_container').bind('click', function(){
	if (clickhapped == 'False') {
	clickhapped = 'True';
	var quiz_percent;
	quizparsed.twovotes = 1 + quizparsed.twovotes;
	quiz_result();	
	};
	});
	
	
$(".right").bind('click', function(){
$("#quiz_header").removeClass("phase3").addClass('phase2, nopointer');
 $("#quiz-frame-winner2,#quiz_photo_container").removeClass("win2");
 $("#quiz-frame-winner1,#quiz_photo_container").removeClass("win1");
 $("#quiz_image1_container, #quiz_image2_container, .quiz_img_subcontainer").addClass('nopointer');
});

$(".left").bind('click', function(){
$("#quiz_header").removeClass("phase3").addClass('phase2, nopointer');
 $("#quiz-frame-winner2,#quiz_photo_container").removeClass("win2");
 $("#quiz-frame-winner1,#quiz_photo_container").removeClass("win1");
 $("#quiz_image1_container, #quiz_image2_container, .quiz_img_subcontainer").addClass('nopointer');
});