
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
var config_duel_win_switch = 0;
var config_duel_win_delete = 0;
var duel_config_color = 'red';
var color = "blue";
var config_duel_winner_big_font = 0;
var config_duel_select_bg = 0; //1 - left_winner 2 - right_winner;
var config_current_color = 0;
var config_colors = ['#de5d4e', 'purple', 'orange', 'blue'];
var duel_vs_panel = 0;
var duel_bg_panel = 0;
var duel_bg_panel_type = 'main';
var config_duel_bg_main = 'var1';
var config_duel_bg_left = 'var1';
var config_duel_bg_right = 'var1';

function duel_leftwinner_prop(){
	console.log('left arrow');
	$(".winner_left").css('left', '0');
	$(".duel_photo_container").css('left', '800px');
	$(".duel_header").addClass('win_left');
	}
	
function duel_leftwinner_prop_back(){
	console.log('left arrow');
	$(".winner_left").css('left', '');
	$(".duel_photo_container").css('left', '');
	$(".duel_header").removeClass('win_left');
	}	
function duel_rightwinner_prop(){
	console.log('right arrow');
	$(".winner_right").css('left', '0');
	$(".duel_photo_container").css('left', '-800px');
	$(".duel_header").addClass('win_right');
	}
function duel_rightwinner_prop_back(){
	console.log('right arrow');
	$(".winner_right").css('left', '');
	$(".duel_photo_container").css('left', '');
	$(".duel_header").removeClass('win_right');
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
 function duel_percent_delete(value, toselector, spinselector, animation){
	$(spinselector).spincrement({
    from: 0,                
    to: value,              
    decimalPlaces: 0,
    decimalPoint: ".",      
    thousandSeparator: ",", 
    duration: 1
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
function duel_percent_delete_columns(value, toselector, spinselector){
	$(spinselector).spincrement({
    from: 0,                
    to: value,              
    decimalPlaces: 0,
    decimalPoint: ".",      
    thousandSeparator: ",", 
    duration: 1
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




$('.duel_main_container > .duel_arrow.left').click( function() {
	if (duel_left_arrow_active == 0 & duel_right_arrow_active == 0) {
		setTimeout(function() {
		duel_bg_panel_type = 'left';
		duel_left_arrow_active = 1;
		
		
		if (duel_vs_panel == 1) {
			duel_vs_panel = 0;
			$('.duel_vs_panel_container').removeClass('ph2');
			setTimeout(function() {
				$('.duel_vs_panel_slider').addClass('duel_display');
				}
			, 200);	
		}
		if (duel_config_vs == '1var') {
		$('.duel_versus, .duel_versus svg').fadeOut("fast");
		}
		
		if (duel_bg_panel == 1) {
			$('.duel_bg_panel_container').removeClass('ph2')
			
			setTimeout(function() {
				$('.duel_bg_panel_slider.'+duel_bg_panel_type).removeClass('duel_display');
				$('.duel_bg_panel_slider.main').addClass('duel_display');
				$('.duel_bg_panel_container').addClass('ph2');
			}
			, 500);									
		}
		$('.duel_versus').fadeOut("fast");
		duel_leftwinner_prop();
		$('.duel_main_container > .duel_arrow.left').css('background', 'none').css('cursor', 'default');
		$('.duel_chose_bg').removeClass('duel_main_bg_switch').removeClass('duel_right_bg_switch').addClass('duel_left_bg_switch').append(' первого объекта');
		setTimeout(function() {duel_percent_insert(55, '.duel_pie .circle2', ".duel_win_percent.left.spincrement", 'grow')
		}, 100);
		}, 100)
		
		config_duel_select_bg = 1;
	}
	else if (duel_left_arrow_active == 0 & duel_right_arrow_active == 1) {
		setTimeout(function() {
		duel_bg_panel_type = 'main';	
		duel_right_arrow_active = 0;
		duel_rightwinner_prop_back();
		$('.duel_vs_panel_slider').removeClass('duel_display');
		$('.duel_chose_bg').removeClass('duel_right_bg_switch').removeClass('duel_left_bg_switch').addClass('duel_main_bg_switch').text('Выберите фон');
		config_duel_select_bg = 0;
		if (duel_bg_panel == 1) {
			$('.duel_bg_panel_container').removeClass('ph2')
			
			setTimeout(function() {
				$('.duel_bg_panel_slider.'+duel_bg_panel_type).removeClass('duel_display');
				$('.duel_bg_panel_slider.right').addClass('duel_display');
				$('.duel_bg_panel_container').addClass('ph2');
			}
			, 500);									
		}
		$('.duel_arrow.right').css('background', '').css('cursor', '');
		setTimeout(function() {
			if (duel_config_vs == '1var') {
			$('.duel_versus, .duel_versus svg').fadeIn("fast");	}
			$('.duel_versus').fadeIn("fast");
			duel_percent_delete(0, '.duel_pie .circle2', ".duel_win_percent.right.spincrement", 'grow')
		}
		, 100);
		}, 100)
	}
	else if (duel_left_arrow_active == 1 & duel_right_arrow_active == 0) {
			console.log('click disabled');
	}	
}	);

$('.duel_main_container > .duel_arrow.right').click( function() {
	if (duel_left_arrow_active == 0 & duel_right_arrow_active == 0) {
		setTimeout(function() {
		duel_bg_panel_type = 'right';
		duel_right_arrow_active = 1;
		if (duel_vs_panel == 1) {
			duel_vs_panel = 0;
			$('.duel_vs_panel_container').removeClass('ph2');
			setTimeout(function() {
				$('.duel_vs_panel_slider').addClass('duel_display');
				}
			, 200);	
		}
		if (duel_config_vs == '1var') {$('.duel_versus svg').fadeOut("fast");	}
		$('.duel_versus').fadeOut("fast");		
		if (duel_bg_panel == 1) {
			$('.duel_bg_panel_container').removeClass('ph2')
			
			setTimeout(function() {
				$('.duel_bg_panel_slider.'+duel_bg_panel_type).removeClass('duel_display');
				$('.duel_bg_panel_slider.main').addClass('duel_display');
				$('.duel_bg_panel_container').addClass('ph2');
			}
			, 500);									
		}
		duel_rightwinner_prop();
		$('.duel_main_container > .duel_arrow.right').css('background', 'none').css('cursor', 'default');		
		$('.duel_chose_bg').removeClass('duel_main_bg_switch').removeClass('duel_left_bg_switch').addClass('duel_right_bg_switch').append(' второго объекта');
		setTimeout(function() {duel_percent_insert(55, '.duel_pie .circle2', ".duel_win_percent.right.spincrement", 'grow')
		}
		, 100);
		config_duel_select_bg = 2;
		}, 100)
	}
	else if (duel_left_arrow_active == 0 & duel_right_arrow_active == 1) {
		console.log('click disabled');
	}
	else if (duel_left_arrow_active == 1 & duel_right_arrow_active == 0) {
		setTimeout(function() {	
		duel_bg_panel_type = 'main';	
		duel_leftwinner_prop_back();
		$('.duel_vs_panel_slider').removeClass('duel_display');
		$('.duel_arrow.left').css('background', '').css('cursor', '');
		duel_left_arrow_active = 0;
		if (duel_bg_panel == 1) {
			$('.duel_bg_panel_container').removeClass('ph2')
			
			setTimeout(function() {
				$('.duel_bg_panel_slider.'+duel_bg_panel_type).removeClass('duel_display');
				$('.duel_bg_panel_slider.left').addClass('duel_display');
				$('.duel_bg_panel_container').addClass('ph2');
			}
			, 500);									
		}
		$('.duel_chose_bg').removeClass('duel_right_bg_switch').removeClass('duel_left_bg_switch').addClass('duel_main_bg_switch').text('Выберите фон');
		config_duel_select_bg = 0;
		setTimeout(function() {
			if (duel_config_vs == '1var') {$('.duel_versus svg').fadeIn("fast");}
			$('.duel_versus').fadeIn("fast");
			duel_percent_delete(0, '.duel_pie .circle2', ".duel_win_percent.left.spincrement", 'grow')
		}, 100);
		}, 100)

	}	
}	);



$('.duel_versus').click( function() {
	$('.duel_vs_panel_container').toggleClass('ph2');
	if (duel_vs_panel == 0) {
		duel_vs_panel = 1;
		$('.duel_bg_panel_container').removeClass('ph2')}
	else {
		if (duel_bg_panel = 1) {duel_bg_panel = 0}
		duel_vs_panel = 0; 

		$('.duel_bg_panel_container').removeClass('ph2');
		$('.duel_bg_panel_slider.'+duel_bg_panel_type).addClass('duel_display');
		}
});

$('.duel_chose_bg').click( function() {
	$('.duel_bg_panel_container').toggleClass('ph2');
	console.log('.duel_bg_left_panel_slider.'+duel_bg_panel_type);
	
	if (duel_bg_panel == 0) {
		duel_bg_panel = 1;
		$('.duel_bg_panel_slider.'+duel_bg_panel_type).toggleClass('duel_display');
		$('.duel_vs_panel_container').removeClass('ph2')}
	else {
		duel_bg_panel = 0; 
		$('.duel_vs_panel_container').removeClass('ph2');
		setTimeout( function () {$('.duel_bg_panel_slider.'+duel_bg_panel_type).toggleClass('duel_display');}, 200);
		}

});

$('.duel_edit_panel').on('click', function(e) {

  if ((!$(e.target).closest(".duel_versus").length)&&(!$(e.target).closest(".duel_vs_panel").length))  {
    $('.duel_vs_panel_container').removeClass('ph2');
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
	$('.duel_versus').fadeOut();
	setTimeout(function () {	
	$('.duel_versus').css('background-image', 'none');
	}, 100);

	$('.duel_versus').fadeIn(); 
	$('.duel_versus svg').fadeIn(); 	

	}
	else {
		$('.duel_versus svg').fadeOut(); 	
		asd = $(this).css('background-image');
		$('.duel_versus').css('background-image', asd);
	}
	duel_config_vs = $(this).attr('class');
	console.log('switch vs style:', duel_config_vs)
		
});



	
$('.duel_bg_panel_slider.main .duel_bg_variants').click( function() {
	var asd;			
	asd = $(this).css('background-image');
	$('#duel_frame').css('background-image', asd);	
	config_duel_bg_main = $(this).attr('class');
	console.log('switch main bg:', config_duel_bg_main)		
});



	
$('.duel_bg_panel_slider.left .duel_bg_variants').click( function() {	
	var asd;			
	asd = $(this).css('background-image');
	$('.duel-frame-win-bg.left-win').css('background-image', asd);	
	config_duel_bg_left = $(this).attr('class');
	console.log('switch main bg:', config_duel_bg_left)		
});


	
$('.duel_bg_panel_slider.right .duel_bg_variants').click( function() {	
	var asd;			
	asd = $(this).css('background-image');
	$('.duel-frame-win-bg.right-win').css('background-image', asd);	
	config_duel_bg_right = $(this).attr('class');
	console.log('switch main bg:', config_duel_bg_right);		
});

$('.duel-result-body').hide();

$('.my_tooltip.circle .tooltip_switch_icon').on('click', function() {
	console.log('!!!!!');
	config_duel_win_switch = 1;
	$('.duel_circle').fadeOut(setTimeout(function() {
		duel_percent_delete(0, '.duel_pie .circle2', ".duel_win_percent.spincrement", 'grow')
	}, 100));
	$('.duel-result-body').css('display','flex');
	setTimeout(function() {	$('.duel-result-body').css('opacity','1');}, 500);
	duel_percent_insert_columns(25, ".duel-result-column-grow.left", '.duel-percent-one');
	duel_percent_insert_columns(75, ".duel-result-column-grow.right", '.duel-percent-two');	

	;
});

$('.my_tooltip.circle .tooltip_delete_icon').on('click', function() {
	console.log('asdasdasdas');
	config_duel_win_delete = 1;
	config_duel_winner_big_font = 1;
	$('.duel_circle').fadeOut(setTimeout(function() {
		duel_percent_delete(0, '.duel_pie .circle2', ".duel_win_percent.spincrement", 'grow');
	}, 100));
	$('.duel-result-body').css('display','none');
	setTimeout(function() {	$('.duel-result-body').css('opacity','0');}, 500);
	$('.duel_winner_title').addClass('big_font');
	$('.duel_winner_container').css('justify-content', 'space-around');
	$('.duel_winner_back').fadeIn();
});

$('.my_tooltip.columns .tooltip_switch_icon').on('click', function() {
	console.log('!!!!!');
	config_duel_win_switch = 0;
	$('.duel_circle').fadeIn(duel_percent_insert(55, '.duel_pie .circle2', ".duel_win_percent.spincrement", 'grow'));
	$('.duel-result-body').css('display','none');
	setTimeout(function() {	$('.duel-result-body').css('opacity','0');}, 500);
	duel_percent_insert_columns(0, ".duel-result-column-grow.left", '.duel-percent-one')
	duel_percent_insert_columns(0, ".duel-result-column-grow.right", '.duel-percent-two')

	;
});

$('.my_tooltip.columns .tooltip_delete_icon').on('click', function() {
	console.log('asdasdasdas');
	config_duel_win_delete = 1;
	config_duel_winner_big_font = 1;
	$('.duel-result-body').fadeOut();
	$('.duel_winner_back').fadeIn();
	$('.duel_winner_title').addClass('big_font');
	$('.duel_winner_container').css('justify-content', 'space-around');
	
});

setTimeout( function(){duel_percent_insert(55, '.duel_pie .circle2', ".duel-percent.spincrement", 'grow')}, 4000);



$('.duel_winner_back').on('click', function() {
	config_duel_win_delete = 0;
	config_duel_winner_big_font = 0;
	$('.duel_winner_back').fadeOut();
	$('.duel_winner_title').removeClass('big_font');
	$('.duel_winner_container').css('justify-content', 'space-between');	
	if (config_duel_win_switch == 0) {
	console.log('1');
	$('#duel1_circle').fadeOut();
	$('.duel_circle').fadeIn(duel_percent_insert(55, '.duel_pie .circle2', ".duel_win_percent.spincrement", 'grow'));	
	
	}
	else {
	console.log('2');
	
	$('.duel-result-body').css('display','flex');
	setTimeout(function() {	$('.duel-result-body').css('opacity','1');}, 500);
	duel_percent_insert_columns(25, ".duel-result-column-grow.left", '.duel-percent-one');
	duel_percent_insert_columns(75, ".duel-result-column-grow.right", '.duel-percent-two');		
	}
	});

$('.color_picker a').click( function() {
	duel_color = $(this).attr('data');
	duel_switch_color(duel_color);
});

$('.duel-flag, .duel-header-circle').click( function() {
	config_current_color = ++config_current_color;
	if (config_current_color > config_colors.length) {
		config_current_color = 0
	}
	duel_switch_color(config_colors[config_current_color]);
	if (config_current_color == 'orange') {}
});

duel_switch_color('#de5d4e')


var duel_vs_slider_counter = 0;
var duel_vs_slider_length = 0;
var duel_vs_slider_current_left = '0px';

$('.duel_vs_panel_container > .duel_arrow.right').click( function() {
	duel_vs_slider_length = $('.duel_vs_panel_slider .duel_vs_variants').length - 5;
	// duel_vs_slider_current_left = $('.duel_vs_panel_slider').css('left');
	if (duel_vs_slider_length > duel_vs_slider_counter) {
	duel_vs_slider_current_left1 = +duel_vs_slider_current_left.replace(/px/g, '');
	console.log(duel_vs_slider_current_left);
	duel_vs_slider_counter = ++duel_vs_slider_counter;
	duel_vs_slider_current_left1 = duel_vs_slider_current_left1-115;
	duel_vs_slider_current_left = duel_vs_slider_current_left1+'px'
	$('.duel_vs_panel_slider').css('left', duel_vs_slider_current_left);
	}
});

$('.duel_vs_panel_container > .duel_arrow.left').click( function() {
	
	duel_vs_slider_length = $('.duel_vs_panel_slider .duel_vs_variants').length - 5;
	// duel_vs_slider_current_left = $('.duel_vs_panel_slider').css('left');
	if ((duel_vs_slider_length - 5 < duel_vs_slider_counter)&&(duel_vs_slider_counter > 0)) {
	duel_vs_slider_counter = --duel_vs_slider_counter;
	duel_vs_slider_current_left1 = +duel_vs_slider_current_left.replace(/px/g, '');
	duel_vs_slider_current_left1 = duel_vs_slider_current_left1+115;
	duel_vs_slider_current_left = duel_vs_slider_current_left1+'px'
	console.log(duel_vs_slider_current_left)
	$('.duel_vs_panel_slider').css('left', duel_vs_slider_current_left);
	}
});
