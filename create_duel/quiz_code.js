
/* animations block */
/* function duel_phase1_to2(){
 $(".phase1").removeClass("phase1").addClass('phase2');
 $(".btn").addClass('phase2');
}  */
/* function duel_firstwin_animation(){
$(".phase1").removeClass("phase1").addClass('phase2');
$(".phase2").removeClass("phase2").addClass('phase3');
$('.duel_img_subcontainer.right').addClass('loose');
$('.duel_img_subcontainer.left').addClass('win');
$(".winner_left").addClass('show').ready( function() {
	console.log( 'анимация winner1 готов!' );
	$(".winner_left").css('left', '0');
	$(".duel_photo_container").css('left', '800px');
});

$(".duel-agree").addClass('phase3');
$(".duel_image_container.left, .duel_image_container.right, .duel_img_subcontainer").addClass('nopointer');
}
function duel_secondwin_animation(){
$(".phase1").removeClass("phase1").addClass('phase2');
$(".phase2").removeClass("phase2").addClass('phase3');
$('.duel_img_subcontainer.right').addClass('winr');
$('.duel_img_subcontainer.left').addClass('lose');
$(".duel-agree").addClass('phase3');
$(".winner_right").addClass('show').ready( function() {
	$(".winner_left").addClass('show').ready( function() {
	console.log( 'анимация winner1 готов!' );
	$(".winner_left").css('left', '0');
	$(".duel_photo_container").css('left', '800px');
}); })
$(".duel_image_container.left, .duel_image_container.right, .duel_img_subcontainer").addClass('nopointer');
} */

var duel_left_arrow_active = 0;
var duel_right_arrow_active = 0;
var duel_versus_active = 0;
var duel_config_vs = '1var';
var config_duel_left_win_switch = 0;
var config_duel_left_win_delete = 0;
var config_duel_right_win_switch = 0;
var config_duel_right_win_delete = 0;
var duel_config_color = 'red';
var color = "blue";
var config_duel_winner_big_font = 0;
var config_duel_select_bg = 0; //1 - left_winner 2 - right_winner

function duel_leftwinner_prop(){
	console.log('left arrow');
	$(".winner_left").css('left', '0');
	$(".duel_photo_container").css('left', '800px');
	}
	
function duel_leftwinner_prop_back(){
	console.log('left arrow');
	$(".winner_left").css('left', '');
	$(".duel_photo_container").css('left', '');
	}	
function duel_rightwinner_prop(){
	console.log('right arrow');
	$(".winner_right").css('left', '0');
	$(".duel_photo_container").css('left', '-800px');
	}
function duel_rightwinner_prop_back(){
	console.log('right arrow');
	$(".winner_right").css('left', '');
	$(".duel_photo_container").css('left', '');
	}	
/* определние победителя */
	
	function duel_winner_determinate() {
	if (quizparsed.onevotes > quizparsed.twovotes) {
		return 1;} 
	else if (quizparsed.onevotes == quizparsed.twovotes) { 
		return 2;}
	if (quizparsed.onevotes < quizparsed.twovotes) {
		return 3;} 
};

	/* вставка голосов во флаги и нижний блок */

function duel_votes_insert() {
	$('.duel-flag.right').html(quizparsed.twovotes);
	$('.duel-flag.left').html(quizparsed.onevotes);
	$('#duel-total-votes').spincrement({
		from: quizparsed.onevotes+quizparsed.twovotes,
		to: quizparsed.onevotes+quizparsed.twovotes,
	});
	};	
	
	/* подсчет процентов */

function duel_votes_percent(vote1, vote2) {
	return Math.round((vote1/(vote1+vote2))*100);	
	};
	
	/* вставка процентов */

 function duel_percent_insert(value, toselector, spinselector, animation){
	$(spinselector).spincrement({
    from: 0,                
    to: value,              
    decimalPlaces: 0,
    decimalPoint: ".",      
    thousandSeparator: ",", 
    duration: 1000
	});
	$(toselector).css('animation-name', animation+Math.floor(value/5));
	};	
function duel_percent_insert_columns(value, toselector, spinselector){
	$(spinselector).spincrement({
    from: 0,                
    to: value,              
    decimalPlaces: 0,
    decimalPoint: ".",      
    thousandSeparator: ",", 
    duration: 1000
	});	
	$(toselector).addClass('phase3').css('height', Math.floor((value*250)/100)+'px');
	console.log( 'duel_percent_insert1 arguments:', value, toselector, spinselector);
	};	
	/* все анимации */
	
function duel_result(){
	if (duel_winner_determinate(quizparsed.onevotes, quizparsed.twovotes) == 1) {
		duel_percent = duel_votes_percent(quizparsed.onevotes, quizparsed.twovotes);
		duel_percentone = duel_votes_percent(quizparsed.onevotes, quizparsed.twovotes);
		duel_percenttwo = duel_votes_percent(quizparsed.twovotes, quizparsed.onevotes);
		duel_firstwin_animation();}
	else if (duel_winner_determinate(quizparsed.onevotes, quizparsed.twovotes) == 2) {
		duel_percent = 50;
		duel_percentone = 50;
		duel_percenttwo = 50;	
		duel_draw_animation();}
	else if (duel_winner_determinate(quizparsed.onevotes, quizparsed.twovotes) == 3) {
		duel_percent = duel_votes_percent(quizparsed.twovotes, quizparsed.onevotes);
		duel_percentone = duel_votes_percent(quizparsed.onevotes, quizparsed.twovotes);
		duel_percenttwo = duel_votes_percent(quizparsed.twovotes, quizparsed.onevotes);
		duel_secondwin_animation();}
		duel_votes_insert();

	$('.left-pie .page2.circle2').css('animation-name', 'lgrow'+Math.floor(duel_percentone/5));
	setTimeout(duel_percent_insert(duel_percentone,'.left-pie .page2.circle2','.duel-percent.left', 'lgrow'), 1000);
	setTimeout(duel_percent_insert(duel_percenttwo,'.right-pie .page2.circle2','#right-percent', 'lgrow'), 1000);
	setTimeout(function (){
	console.log('NACHALOS');
	duel_percent_insert(duel_percent, '#duel-pie .circle2', ".duel-percent.left,.duel-percent.right", 'grow')}, 4000);
	setTimeout(function(){
	duel_percent_insert_columns(duel_percenttwo, ".duel-result-column-grow.right", '.duel-percent-two')}, 3700);	
	setTimeout(function(){
	duel_percent_insert_columns(duel_percentone, ".duel-result-column-grow.left", '.duel-percent-one')}, 3700);

	
	};
	/* data-block, подтягивание данных из JSON-строки */

/* var quizdata = '{"title": "Самый ЖОСКИЙ персонаж Mad Max 2", "one": "Безумный Макс", "two": "Фьюриос", "onevotes": 10, "twovotes": 10}';
	var quizparsed = jQuery.parseJSON( quizdata );
	var quizparseone, quizparsedtwo
	quizparsedone = quizparsed.one.replace(/\s/ig, '</span><br><span>');
	quizparsedtwo = quizparsed.two.replace(/\s/ig, '</span><br><span>');
	$('#duel-header-content').html(quizparsed.title);
	$('.duel-title.left, #duel-left-win').text(quizparsed.one);
	$('.duel-title.right, #duel-right-win').text(quizparsed.two);
	$('#duel-left-win').html(quizparsed.one);
	$('#duel-right-win').html(quizparsed.two);
	$('#votes2').html(quizparsed.twovotes);
	$('#counter').html(quizparsed.onevotes+quizparsed.twovotes);	
	$('button.btn').bind('click', function(){
	$('#counter').html(quizparsed.onevotes+quizparsed.twovotes+1);});
	$('#duel-total-votes').html(quizparsed.onevotes+quizparsed.twovotes); */
	
	/* обработка кликов */
	/* var clickhapped = 'False';
$('.duel_image_container.left').bind('click', function(){
	if (clickhapped == 'False') {
	clickhapped = 'True';
	var duel_percent;
	quizparsed.onevotes = 1 + quizparsed.onevotes;
	duel_result();	
	};
	});
$('.duel_image_container.right').bind('click', function(){
	if (clickhapped == 'False') {
	clickhapped = 'True';
	var duel_percent;
	quizparsed.twovotes = 1 + quizparsed.twovotes;
	duel_result();	
	};
	}); */
	
	
/* $(".right").bind('click', function(){
$(".duel_header").removeClass("phase3").addClass('phase2, nopointer');
 $("#duel_frame_winner2,.duel_photo_container").removeClass("win2");
 $("#duel_frame_winner1,.duel_photo_container").removeClass("win1");
 $(".duel_image_container.left, .duel_image_container.right, .duel_img_subcontainer").addClass('nopointer');
});

$(".left").bind('click', function(){
$(".duel_header").removeClass("phase3").addClass('phase2, nopointer');
 $("#duel_frame_winner2,.duel_photo_container").removeClass("win2");
 $("#duel_frame_winner1,.duel_photo_container").removeClass("win1");
 $(".duel_image_container.left, .duel_image_container.right, .duel_img_subcontainer").addClass('nopointer');
}); */

function duel_switch_color(color) {
	$('.circle2 ').css('stroke', color);
	$('.duel_flag_svg').css('fill', color);
	$('.duel_versus_svg.circle_svg').css('fill', color);
}


$('.duel_vs_panel_wrap').hide();

$('.duel_arrow.left').click( function() {
	if (duel_left_arrow_active == 0 & duel_right_arrow_active == 0) {
		duel_left_arrow_active = 1;
		$('.duel_versus, h1.duel_header').hide("fast");
		duel_leftwinner_prop();
		$('.duel_arrow.left').css('background', 'none').css('cursor', 'default');
		$('.duel_choose_bg').removeClass('duel_main_bg_switch').removeClass('duel_right_bg_switch').addClass('duel_left_bg_switch').append(' первого победителя');
		config_duel_select_bg = 1;
	}
	else if (duel_left_arrow_active == 0 & duel_right_arrow_active == 1) {
		$('.duel_versus, h1.duel_header').show("fast");		
		duel_right_arrow_active = 0;
		duel_rightwinner_prop_back();
		$('.duel_choose_bg').removeClass('duel_right_bg_switch').removeClass('duel_left_bg_switch').addClass('duel_main_bg_switch').text('Выберите фон');
		config_duel_select_bg = 0;
	}
	else if (duel_left_arrow_active == 1 & duel_right_arrow_active == 0) {
			console.log('click disabled');
	}	
}	);

$('.duel_arrow.right').click( function() {
	if (duel_left_arrow_active == 0 & duel_right_arrow_active == 0) {
		duel_right_arrow_active = 1;
		$('.duel_versus, h1.duel_header').hide("fast");		
		duel_rightwinner_prop();
		$('.duel_choose_bg').removeClass('duel_main_bg_switch').removeClass('duel_left_bg_switch').addClass('duel_right_bg_switch').append(' второго победителя');
		config_duel_select_bg = 2;

	}
	else if (duel_left_arrow_active == 0 & duel_right_arrow_active == 1) {
		console.log('click disabled');
	}
	else if (duel_left_arrow_active == 1 & duel_right_arrow_active == 0) {
		duel_leftwinner_prop_back()
		$('.duel_arrow.left').css('background', '').css('cursor', '');
		$('.duel_versus, h1.duel_header').show("fast");
		duel_left_arrow_active = 0;
		$('.duel_choose_bg').removeClass('duel_right_bg_switch').removeClass('duel_left_bg_switch').addClass('duel_main_bg_switch').text('Выберите фон');
		config_duel_select_bg = 0;

	}	
}	);

$('.duel_versus').click( function() {
	if (duel_versus_active == 0) {
	console.log('duel_vs_panel_wrap show');
	duel_versus_active = 1;
	$('.duel_vs_panel_wrap').show();
	$('.duel_choose_bg').hide();
	}
	else if (duel_versus_active == 1) {
	$('.duel_vs_panel_wrap').hide();
	$('.duel_choose_bg').show();
	duel_versus_active = 0;}
});

$(document).on('click', function(e) {
	
  if (!$(e.target).closest(".duel_versus").length) {
	console.log('yoyoyo');	
    $('.duel_vs_panel_wrap').hide();
	$('.duel_choose_bg').show();
	duel_versus_active = 0;
  }
  e.stopPropagation();
});


/* Удаление элемента, не реализовано пока */
/* $('.duel-flag').on('click', function() {
	$(self).after()
	var elem_width;
	var elem_height;
	elem_width = $(this).(width);
	elem_height = $(this).(height); 
	var thisid;
	console.log('hz');
	thisid = $(this).attr('id');
	$(this).after('<div class="duel_delete_element" data='+thisid+' style="width:26px; height: 26px; background: red; position: absolute; right: -13px; top:-13px; z-index: 100000000000"></div>');
	$('#'+thisid+' .duel_delete_element').show();
});

$('.duel_delete_element').on('click', function() {
	console.log('udalen:', id_to_del);
	var id_to_del;
	id_to_del = $(this).attr('data');
	$('#'+id_to_del).hide();
}); */


$('.duel_vs_variants').click( function() {
	var asd;
	if ($(this).attr('class') == 'duel_vs_variants var1'){
		$('.duel_versus svg').show(); 	
		$('.duel_versus').css('background-image', 'none');
	}
	else {
		$('.duel_versus svg').hide(); 	
		asd = $(this).css('background-image');
		$('.duel_versus').css('background-image', asd);
	}
	duel_config_vs = $(this).attr('class');
	console.log('switch vs style:', duel_config_vs)
	
	
});

$('.my_tooltip.circle .tooltip_switch_icon').on('click', function() {
	console.log('!!!!!');
	config_duel_win_switch = 1;
	$('.duel_circle').hide();
	$('.duel-result-body').show().css('display','flex');
});

$('.my_tooltip.circle .tooltip_delete_icon').on('click', function() {
	console.log('asdasdasdas');
	config_duel_win_delete = 1;
	config_duel_winner_big_font = 1;
	$('.duel_circle').hide();
	$('.duel_winner_back').show();
	$('.duel_winner_title').addClass('big_font');
});

$('.my_tooltip.columns .tooltip_switch_icon').on('click', function() {
	console.log('!!!!!');
	config_duel_win_switch = 0;
	$('.duel_circle').show();
	$('.duel-result-body').hide();
});

$('.my_tooltip.columns .tooltip_delete_icon').on('click', function() {
	console.log('asdasdasdas');
	config_duel_win_delete = 1;
	config_duel_winner_big_font = 1;
	$('.duel-result-body').hide();
	$('.duel_winner_back').show();
	$('.duel_winner_title').addClass('big_font');
	
});





$('.duel_winner_back').on('click', function() {
	config_duel_win_delete = 0;
	config_duel_win_switch = 0;
	config_duel_winner_big_font = 0;
	$('#duel1_circle').show();
	$('.duel_winner_title').removeClass('big_font');
});

$('.color_picker a').click( function() {
	duel_color = $(this).attr('data');
	duel_switch_color(duel_color);
});

