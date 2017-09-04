    window.onload=function(){
		
		Vue.component('answer-item', {
		template:'\
		<li\
		v-on:click="$emit(\'asktools\')"\
		>\
		<div class="percents"></div>\
							<span>\
								<input\
								v-bind:value="title"\
								v-on:input="updateTitle($event.target.value)"\
								v-on:keyup.enter="$emit(\'add\')"\
								v-bind:key="index"\
								placeholder="Напишите ответ"\
								name="zaglushka"\
								class="quiz_ans" >\
							</span>\
							<span class="quiz_ask_points" v-if="!isTest">{{ points }}</span>\
							<span class="numbers">\
							<button v-on:click="$emit(\'remove\')">X</button>\
							</span>\
						</li>\
							',
		props: ['title', 'askIndex', 'index', 'isTest', 'points'],
		methods: {
		updateTitle: function(value)	{
			 var formattedTitle = value.trim()
			 this.$emit('input', formattedTitle)
			},
		},
		
	})	
       Vue.component('answertools', {
		template:'\
		<transition name="popupshow">\
		<div\
		v-show="showpopup"\
		v-bind:key="currentanswer.currentask"\
		class="quiz_ask_popup" v-bind:style="{top : shift + \'px\'}">\
		{{ tempAns.title }}, {{ currentask }}, {{ currentanswer }}\
		{{ shift }}\
		<div class="popup_form">\
		<template v-if="isTest">\
		<input type="checkbox"\
		v-on:click="updateIsCorrect($event.target.checked)"\
		v-bind:checked="this.tempAns.isCorrect"\
		>Correct?\
		</template>\
		<template v-else="isTest">\
		<select size="1"\
		@change="updatePoints($event.target.value)"\
		>\
					<option :selected="this.tempAns.points==1" value="1">1</option>\
					<option :selected="this.tempAns.points==2" value="2">2</option>\
					 <option :selected="this.tempAns.points==3" value="3">3</option>\
					 <option :selected="this.tempAns.points==4" value="4">4</option>\
					 <option :selected="this.tempAns.points==5" value="5">5</option>\
				</select> Баллы за ответ\
		</template>\
		</div>\
		<div class="popup_mediacontainer">\
			<div class="popup_mediaconntent"></div>\
			<div class="popup_mediaconntent"></div>\
			<div class="popup_mediaconntent"></div>\
			<div class="popup_mediaconntent"></div>\
			<div class="popup_mediaconntent"></div>\
			<div class="popup_mediaconntent"></div>\
			<div class="popup_mediaconntent"></div>\
			<div class="popup_mediaconntent"></div>\
		</div>\
		</div>\
		</transition>\
		',
		props: ['currentanswer', 'currentask', 'nextanswerid', 'showpopup', 'tempAns', 'isTest'],
		computed: {
				shift: function () {
				return ((this.currentask+1)*630 + 305-(-42*(this.currentanswer)+42*(this.nextanswerid)))				
			}
		},
		methods: {
		updateIsCorrect: function (value) {
			console.log(value)
			return this.$emit('updateiscorrect', this.currentanswer, this.currentask, value)
			},
		updatePoints: function (value) {
			return this.$emit('updatepoints', this.currentanswer, this.currentask, value)
			}
		}
	})
	  	  	  
var quiz = new Vue({ 
	  
        el: '.quiz_edit_container',
        data: { 
		quizTitle: 'nazvanie',
		categoryId: 10,
		categoryTitle: 'развлечения',
		isTest: true,
		asks: 
			[
			{
			id: 1,
			title: 'Vopros 1',
			answers: [	
				{	
					id: 1,
					title: 'ответ 1',
					isCorrect: true,
					points: 3,
					mediatype: 1,
					
				},
				{	
					id: 2,
					title: 'ответ 2',
					isCorrect: false,
					points: 3,
					mediatype: 1,
				}			
				],
			nextAnswerId: 3
			},
			
			{
			id: 2,
			title: 'Vopros 2',
			answers: [	
				{	
					id: 1,
					title: 'ответ 1 второго вопроса',
					isCorrect: false,
					points: 3,
					mediatype: 1,					
				}			
				],
			nextAnswerId: 2
			}
			],
		nextaskIndex: 3,
		showpopup: false,
		currentask: '',
		currentanswer: '',
		tempNextAnswerIndex: '',
		tempAns: '',
		},
		computed: {
			asksTotal: function () {
			return this.asks.length
			}
		},
		methods: {
			addNewAsk: function () {
			this.asks.push({
			id: this.nextaskIndex++,
			title: 'Voprosikkk',
			answers: [	
				{	
					id: 1,
					title: 'ответ',
					isCorrect: false,
					points: 3,
					mediatype: 1,					
				}		
				],
			nextAnswerId: 2
			}			
			)
			},
			addNewAnswer: function(askIndex) {	
				console.log(askIndex);
				if (this.asks[askIndex].nextAnswerId < 7){					
					this.asks[askIndex].answers.push({
					id: this.asks[askIndex].nextAnswerId++,
					title: '',
					isCorrect: false,
					points: 3,
					mediatype: 1
					}
					) 
					this.quizanswers(askIndex);
					this.ShiftPopuup( askIndex , '', 'add');
				}	
			},
			deleteAnswer: function(askIndex, index) {
				console.log("УДАЛЕН ответ С ИНДЕКСОМ:", index);
				console.log(askIndex, index);
				this.asks[askIndex].answers.splice(index, 1);
				this.asks[askIndex].nextAnswerId--;
				console.log(this.asks[askIndex]);				
				this.quizanswers(askIndex, this.asks[askIndex].nextAnswerId-1);
				this.ShiftPopuup(askIndex, index, 'del')
				askIndex = 0;
			},
			deleteAsk: function(index) {
				alert(index);
				this.asks.splice(index, 1);
				this.nextaskIndex--;
				this.ShiftPopuup('', '', 'body');
			},
			Asktools: function(index, askIndex) {
				console.log("КЛИК ПО индексы", askIndex, index);
				this.currentask = askIndex;
				this.currentanswer = index;
				this.tempNextAnswerIndex = this.asks[askIndex].nextAnswerId-1;
				this.tempAns = this.asks[askIndex].answers[index];
				this.showpopup = true
				console.log(this.tempAns)

			},
			ShiftPopuup: function(askIndex, index, type) { //type: del, add]
				if ((askIndex === '')&&(index === '')&&(type == 'body')) {
				console.log('click po body', this.currentask, this.currentanswer, this.showpopup)					
				this.currentask = '';
				this.currentanswer = '';
				this.tempNextAnswerIndex = '';
				this.showpopup = false;
				}
				if ((this.currentask == askIndex)&&(this.currentanswer == index)&&(type == 'del')) {	
					this.currentask = '';
					this.currentanswer = '';
					this.tempNextAnswerIndex = '';
					this.showpopup = false;
					console.log('udalili', this.currentask, this.currentanswer, this.showpopup)
				}
				if ((this.currentask == askIndex)&&(this.currentanswer > index)&&(type == 'del')) {
					this.currentanswer--;		
					this.tempNextAnswerIndex--;
					console.log('smestili', this.currentask, this.currentanswer, this.showpopup)
				}
				if ((this.currentask == askIndex)&&(this.currentanswer < index)&&(type == 'del')) {
					this.tempNextAnswerIndex--;
					console.log('smestili', this.currentask, this.currentanswer, this.showpopup)
				}
				if ((this.currentask == askIndex)&&(type == 'add')) {
					this.tempNextAnswerIndex++;
					console.log('smestili', this.currentask, this.currentanswer, this.showpopup)
				}
					
			},
			quizanswers: function (askIndex) {
				var quiz_answers = document.querySelectorAll("#ask"+askIndex);
				  Velocity(quiz_answers, { height: 130+42*(this.asks[askIndex].nextAnswerId-3)+'px'}, { duration: 300 })
			},
			hideButton: function (nextAnswerId) {
				if (nextAnswerId > 6) {
				return 'Button_hide'
				}
			},
			updateIsCorrect: function(value) {
				var askindex = value[0];
				var ansindex = value[1];
				var isCorr = value[2];
				this.tempAns.isCorrect = isCorr;
				this.asks[askindex].answers[ansindex].isCorrect = isCorr;
				console.log(this.asks[askindex].answers[ansindex].isCorrect)
				console.log(askindex, ansindex, isCorr)
			},
			updatePoints: function(value) {
				var askindex = value[0];
				var ansindex = value[1];
				var pnts = +value[2];
				this.tempAns.points = pnts;
				this.asks[askindex].answers[ansindex].points = pnts;
				console.log(this.asks[askindex].answers[ansindex].points)
				console.log(askindex, ansindex, pnts)
			}			
		}
      
	  
	  
	  
	  });
 
 
    }