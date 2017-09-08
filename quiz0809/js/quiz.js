window.onload=function(){
	
		var media = [
		{
			id: 1,
			isCorrect: true,	
			title: '-В точку!',
			url: 'media/right.gif'
		},
		{
			id: 2,
			isCorrect: true,	
			title: '-Верно!',
			url: 'media/right.gif'
		},
		{
			id: 3,
			isCorrect: true,	
			title: '-Правильно!',
			url: 'media/right.gif'
		},
		{
			id: 4,
			isCorrect: false,	
			title: '-Мимо!',
			url: 'media/wrong.gif'
		},
		{
			id: 5,
			isCorrect: false,	
			title: '-Неверно!',
			url: 'media/wrong.gif'
		},
		{
			id: 1,
			isCorrect: true,	
			title: '-В точку!',
			url: 'media/right.gif'
		},
		{
			id: 2,
			isCorrect: true,	
			title: '-Верно!',
			url: 'media/right.gif'
		},
		{
			id: 3,
			isCorrect: true,	
			title: '-Правильно!',
			url: 'media/right.gif'
		},
		{
			id: 4,
			isCorrect: false,	
			title: '-Мимо!',
			url: 'media/wrong.gif'
		},
		{
			id: 5,
			isCorrect: false,	
			title: '-Неверно!',
			url: 'media/wrong.gif'
		},
		{
			id: 1,
			isCorrect: true,	
			title: '-В точку!',
			url: 'media/right.gif'
		},
		{
			id: 2,
			isCorrect: true,	
			title: '-Верно!',
			url: 'media/right.gif'
		},
		{
			id: 3,
			isCorrect: true,	
			title: '-Правильно!',
			url: 'media/right.gif'
		},
		{
			id: 4,
			isCorrect: false,	
			title: '-Мимо!',
			url: 'media/wrong.gif'
		},
		{
			id: 5,
			isCorrect: false,	
			title: '-Неверно!',
			url: 'media/wrong.gif'
		},
		]
		var photos = [
		{
			id: 1,
			title: '-В точку!',
			url: 'media/right.gif'
		},
		{
			id: 2,	
			title: '-Верно!',
			url: 'media/right.gif'
		},
		{
			id: 3,
			title: '-Правильно!',
			url: 'media/right.gif'
		},
		{
			id: 4,
			title: '-Мимо!',
			url: 'media/wrong.gif'
		},
		{
			id: 5,
			title: '-Неверно!',
			url: 'media/wrong.gif'
		},
		]		
		var mediaQuiz = [
		{
			id: 1,
			url: 'media/right.gif'
		},
		{
			id: 2,
			url: 'media/right.gif'
		},
		{
			id: 3,
			url: 'media/right.gif'
		},
		{
			id: 4,
			url: 'media/wrong.gif'
		},
		{
			id: 5,
			url: 'media/wrong.gif'
		},
		]		
		var categories = [
		{
			id: 1, 
			title: 'развлечения'},
			{	id: 2, 
			title: 'что-то еще'},
			{	id: 3, 
			title: 'и еще'},
			{	id: 4, 
			title: 'и еще'},
			{	id: 5, 
			title: 'и еще'},
			{	id: 6, 
			title: 'и еще'}					
		]
		var asks = [
			{
			id: 1,
			title: 'Vopros 1',
			answers: [	
				{	
					id: 1,
					title: 'ответ 1',
					isCorrect: true,
					points: 3,
					mediaId: 1,
					
				},
				{	
					id: 2,
					title: 'ответ 2',
					isCorrect: false,
					points: 3,
					mediaId: 1,
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
					mediaId: 1,					
				},
				{	
					id: 1,
					title: 'ответ 2 второго вопроса',
					isCorrect: false,
					points: 3,
					mediaId: 1,					
				}				
				],
			nextAnswerId: 3
			}
			]
		var quizResults = [	
		{
			title: 'Батя игры',
			description: 'Просто батя',
			points: 4,
			mediaId: 1,
		},
		{
			title: 'Мужик',
			description: 'Мужик',
			points: 3,
			mediaId: 1,
		},
		{
			title: 'Стремящийся',
			description: 'Стремящийся',
			points: 2,
			mediaId: 1,
		},
		{
			title: 'Петух',
			description: 'Петух',
			points: 1,
			mediaId: 1,
		}
		]
		var testResults = [	
		{
			title: 'Бох',
			points: 0.25,
			mediaId: 1,
		},
		{
			title: 'После бога',
			points: 0.5,
			mediaId: 1,
		},
		{
			title: 'Фуфел',
			points: 0.75,
			mediaId: 1,
		},
		{
			title: 'Огузог',
			points: 0.90,
			mediaId: 1,
		}
		]

		Vue.component('item', {
		template:'\
		<li\
		v-on:click="$emit(\'asktools\')"\
		>\
								<input\
								v-bind:value="title"\
								v-on:input="updateTitle($event.target.value)"\
								v-on:keyup.enter="$emit(\'add\')"\
								v-bind:key="index"\
								placeholder="Напишите ответ"\
								name="zaglushka"\
								class="quiz_ans" >\
							<div class="numbers">\
							<template v-if="!isTest">{{ showResultTitle }}</template>\
							<button title="Удалить ответ на вопрос" class="delete_ans_button" v-on:click="$emit(\'remove\')"></button>\
							</div>\
						</li>\
							',
		props: ['title', 'askIndex', 'index', 'isTest', 'points', 'results'],
		computed: {
				showResultTitle: function() {
					
					for (var result in this.results) {
						console.log('vot', this.results[result])
						if (this.points==this.results[result].points) {
							
							return this.results[result].title
						}
					}
				}
			},
		methods: {
			updateTitle: function(value)	{
				 var formattedTitle = value.trim()
				 this.$emit('input', formattedTitle)
				},
			
		},
		
	}),

       Vue.component('tools', {
		template:'\
		<transition name="popupshow">\
		<div\
		v-show="showpopup"\
		v-bind:key="currentanswer.currentask"\
		class="quiz_ask_popup" v-bind:style="{top : shift + \'px\'}">\
		<div class="popup_form">\
		<template v-if="isTest">\
		<input class="checkbox" type="checkbox" id="checkbox" \
		v-on:click="updateIsCorrect($event.target.checked)"\
		v-bind:checked="tempAns.isCorrect"\
		>\
		<label for="checkbox">Верный ответ</label>\
		</template>\
		<template v-else="isTest">\
		<select size="1"\
		@change="updatePoints($event.target.value)"\
		>\
					<option v-for="result in results" :value="result.points"  :selected="tempAns.points==result.points" >{{ result.title }}</option>\
				</select> Баллы за ответ\
		</template>\
		</div>\
		<div class="popup_mediacontainer_wrapper">\
			<div class="popup_mediacontainer" v-if="isTest">\
				<div\
				class=""\
				:key="item.id"\
				v-for="item in MediaArr"\
				:class="[item.id == tempAns.mediaId ? \'currentmedia\' : \' \',  \'popup_mediaconntent_wrap\']"\
				:style="{background: \'url(\' + item.url + \') center no-repeat\'}"\
				v-on:click="updatemediaId(item.id)"\
				><div class="popup_mediaconntent">{{ item.title }}</div></div>\
			</div>\
		</div>\
		</div>\
		</transition>\
		',
		props: ['currentanswer', 'currentask', 'nextanswerid', 'showpopup', 'tempAns', 'isTest', 'results', 'media'],
		data: function() {
				return {mediaIdWatcher : false}
		},
		computed: {
				shift: function () {
					console.log('otladka', this.nextanswerid);
				return ((600+100-200-30)+400+45+(this.currentask)*(600+100)+51*(this.currentanswer)-51*(this.nextanswerid-2))				
			},
				mediaRight: function() {
					var newwar = this.media.filter(function(value) {return value.isCorrect});
					console.log(newwar)
					return newwar
			},
				mediaWrong: function() {
					var newwar = this.media.filter(function(value) {return !value.isCorrect});
					console.log(newwar)
					return newwar
			},
				MediaArr: function() {
					if (this.tempAns.isCorrect == true) {
						return this.mediaRight
					}
					else { return this.mediaWrong}
				}
		},
		methods: {
				updateIsCorrect: function (value) {
					this.tempAns.mediaId = "0";
					console.log('updateiscorrect', value, this.currentask, this.currentanswer);
					return this.$emit('updateiscorrect', this.currentanswer, this.currentask, value)
					},
				updatePoints: function (value) {
					console.log('asdasdasd', value)
					return this.$emit('updatepoints', this.currentask, this.currentanswer, value)
					
					},
				updatemediaId: function(value) {
					var self = this;
					//if (this.mediaIdWatcher == false) {
						//this.mediaIdWatcher	= true;						
						this.tempAns.mediaId = value;
						console.log('new media id', this.tempAns.mediaId);
						return this.$emit('updatemediaid', this.currentask, this.currentanswer, value)
						//setTimeout(() => {self.mediaIdWatcher	= false}, 1500);
					//}
					}
		}
	}) 
	Vue.component('tools-quiz-results', {
		template:'\
		<transition name="popupshow">\
		<div\
		v-show="showpopup"\
		v-bind:key="currentresult"\
		class="quiz_result_popup" style="position: absolute" v-bind:style="{top : shift + \'px\'}">\
		<textarea :value="description" @input="updateDescription($event.target.value)"></textarea>\
		{{ results[currentresult].title }}\
		<div class="popup_mediacontainer">\
			<div\
			class=""\
			:key="item.id"\
			v-for="item in quizBgs"\
			:class="[item.id == results[currentresult].mediaId ? \'currentmedia\' : \' \',  \'popup_mediaconntent_wrap\']"\
			:style="{background: \'url(\' + item.url + \') center no-repeat\'}"\
			v-on:click="updateBackground(item.id)"\
			><div class="popup_mediaconntent"></div></div>\
		</div>\
		</div>\
		</transition>\
		',
		props: ['currentresult', 'results', 'nextresultindex', 'showpopup', 'asks', 'quizBgs' ],
		computed: {
				shift: function () {
					return ((this.asks)*630 + 565-(-51*(this.currentresult)+51*(this.nextresultindex)))				
				},
				description: function () {
					
					return (this.results[this.currentresult].description)					
				}
			
		},	
		methods: {
		updateDescription: function(value) {		
			return this.$emit('update:value', value) 
			},
		updateBackground: function(value) {
			this.results[this.currentresult].mediaId = value;
			return this.$emit('quiz-bg', this.currentresult, value)
			}
		}
	}) 
	
	Vue.component('tools-photo', {
		template:'\
		<transition name="popupshow">\
		<div\
		v-show="showpopup"\
		v-bind:key="currentresult"\
		class="quiz_result_popup" style="position: absolute" v-bind:style="{top : shift + \'px\'}">\
		{{ results[currentresult].title }}\
		<div class="popup_mediacontainer">\
			<div\
			class=""\
			:key="item.id"\
			v-for="item in photos"\
			:class="[item.id == results[currentresult].mediaId ? \'currentmedia\' : \' \',  \'popup_mediaconntent_wrap\']"\
			:style="{background: \'url(\' + item.url + \') center no-repeat\'}"\
			v-on:click="updateBackground(item.id)"\
			><div class="popup_mediaconntent"></div></div>\
		</div>\
		</div>\
		</transition>\
		',
		props: ['type', 'index', 'photos', 'showpopup'],
		computed: {
				shift: function () {
					return ((this.asks)*630 + 305-(-42*(this.currentresult)+42*(this.nextresultindex)))				
				},
				description: function () {
					
					return (this.results[this.currentresult].description)					
				}
			
		},	
		methods: {
		updateDescription: function(value) {		
			return this.$emit('update:value', value) 
			},
		updateBackground: function(value) {
			this.results[this.currentresult].mediaId = value;
			return this.$emit('quiz-bg', this.currentresult, value)
			}
		}
	}) 
	  	  	  
var quiz = new Vue({ 
	  
        el: '.quiz_edit_container',
        data: { 
		quizTitle: 'nazvanie',
		isTest: true,
		showAutor: true,
		media: media,
		tempMediaId: 0,
		categories: categories,		
		asks: asks,
		nextaskIndex: 3,
		showpopup: false,
		currentask: '',
		currentanswer: '',
		tempNextAnswerIndex: '',
		tempAns: '',
		quizResults: quizResults,
		NextResultId: 5,
		currentResult: '',
		showresultpopup: false,
		showphotopopup: false,
		testResults: testResults,
		nextTestResultId: 5,
		showMedia: false,
		mediaQuiz: mediaQuiz,
		},
		computed: {
			asksTotal: function () {
			return this.asks.length
			},
			CurrentMediaIndex: function () {
				return this.tempMediaId - 1
			}
			
		},
		methods: {
			// функции вопросов
			
			addNewAsk: function () {
				console.log('zarabotalo', this.nextaskIndex);					
				this.asks.push({
				id: this.nextaskIndex++,
				title: 'Voprosikkk',
				answers: [	
					{	
						id: 1,
						title: 'ответ',
						isCorrect: false,
						points: 3,					
					}		
					],
				nextAnswerId: 2
				});		
				this.addAska(this.nextaskIndex);				
			},
			
			addAska: function (askIndex) {
				console.log('zarabotalo', askIndex);
				var resultBlock = document.querySelectorAll(".quiz_result");
				var lastAskId = document.querySelectorAll("#ask"+askIndex-1);
				Velocity(lastAskId, "scroll", { duration: 1000 });
			},
			
			deleteAsk: function(index) {
				this.asks.splice(index, 1);
				this.nextaskIndex--;
				this.ShiftPopuup('', '', 'body');
			},
			
			
			// функции ответов
			addNewAnswer: function(askIndex) {	
				console.log('index voprosa', askIndex);
				if (this.asks[askIndex].nextAnswerId < 7){					
					this.asks[askIndex].answers.push({
					id: this.asks[askIndex].nextAnswerId++,
					title: '',
					isCorrect: false,
					points: 3,
					mediatype: 1
					}
					)
					console.log('nextAnswerId', this.asks[askIndex].nextAnswerId);
					this.quizanswers(askIndex);
					this.ShiftPopuup( askIndex , '', 'add');
				}	
			},			
			//анимация прозрачной подложки блока с вопросами и кнопки			
			quizanswers: function (askIndex) {
				var quiz_answers = document.querySelectorAll("#ask"+askIndex);
				var quiz_answers_button = document.querySelectorAll("#ask"+askIndex+' .button_wrap');
				  Velocity(quiz_answers, { height: 130+51*(this.asks[askIndex].nextAnswerId-3)+'px'}, { duration: 300 });
				  Velocity(quiz_answers_button, { bottom: 34-3*(this.asks[askIndex].nextAnswerId-3)+'px'}, { duration: 300 });				  
			},
			
			deleteAnswer: function(askIndex, index) {
				console.log("УДАЛЕН ответ С ИНДЕКСОМ:", index);
				console.log(askIndex, index);
				this.asks[askIndex].answers.splice(index, 1);
				this.asks[askIndex].nextAnswerId--;
				console.log(this.asks[askIndex]);				
				this.quizanswers(askIndex);
				this.ShiftPopuup(askIndex, index, 'del')
				//askIndex = 0;
			},
			
			
			//функции результатов квиза
			addNewQuizResult: function() {	
				if (this.NextResultId < 10){					
					this.quizResults.push({
						title: 'Батя игры',
						description: 'Введите описание',
						points: this.NextResultId,
						id: this.NextResultId++,
						mediaId: 1,
					}
					) 
					//this.ShiftPopuup( askIndex , '', 'add');
				}	
			},
			deleteQuizResult: function(index) {
				console.log("УДАЛЕН результат викторины С ИНДЕКСОМ:", index);
				this.quizResults.splice(index, 1);
				this.NextResultId--;				
				this.quizanswers(askIndex, this.asks[askIndex].nextAnswerId-1);
				//this.ShiftPopuup(askIndex, index, 'del')
				//askIndex = 0;
			},
			
			// функции результатов теста
			addNewTestResult: function() {	
				if (this.nextTestResultId < 6){					
					this.testResults.push({
						title: 'Батя игры',
						description: 'Введите описание',
						points: this.nextTestResultId,
						id: this.nextTestResultId++,
						mediaId: 1,
					}
					) 
					//this.ShiftPopuup( askIndex , '', 'add');
				}	
			},
			deleteTestResult: function(index) {
				console.log("УДАЛЕН результат теста С ИНДЕКСОМ:", index);
				this.testResults.splice(index, 1);
				this.nextTestResultId--;
			},
			
			// функции удаления
			
			
			
			
			
			
			// функции вслпывающего окна настроек
			Asktools: function(index, askIndex) {
				console.log("КЛИК ПО индексы", askIndex, index);
				this.currentask = askIndex;
				this.currentanswer = index;
				this.tempNextAnswerIndex = this.asks[askIndex].nextAnswerId-1;
				this.tempAns = this.asks[askIndex].answers[index];
				this.showpopup = true
				console.log(this.tempAns)
			},
			Resulttools: function(index) {
				console.log("КЛИК ПО индексу результата", index);
				this.currentResult = index;
				this.tempNextAnswerIndex = this.NextResultId-1;
				this.showresultpopup = true

			},
			
			 // его сдвиг
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
					console.log('smestili1', this.currentask, this.currentanswer, this.showpopup)
				}
				if ((this.currentask == askIndex)&&(this.currentanswer < index)&&(type == 'del')) {
					this.tempNextAnswerIndex--;
					console.log('smestili2', this.currentask, this.currentanswer, this.showpopup)
				}
				if ((this.currentask == askIndex)&&(type == 'add')) {
					this.tempNextAnswerIndex++;
					console.log('smestili3', this.currentask, this.currentanswer, this.showpopup)
				}
					
			},
			
			
			hideButton: function (value) {
				if (value > 7) {
				return 'Button_hide'
				}
			},
			
			// анимации списка вопросов
			
			
			
			
			
			//обновление ИзКоррект (переписать без лишних сущностей)
			
			updateIsCorrect: function(value) {
				var askindex = value[1];
				var ansindex = value[0];
				var isCorr = value[2];
				console.log('ask ans value', askindex, ansindex, isCorr)
				this.tempAns.isCorrect = isCorr;
				this.asks[askindex].answers[ansindex].isCorrect = isCorr;
				console.log(this.asks[askindex].answers[ansindex].isCorrect)
				console.log(askindex, ansindex, isCorr)
			},
			
			//оьновление веса вопроса
			
			updatePoints: function(value) {
				var askindex = value[0];
				var ansindex = value[1];
				var pnts = +value[2];
				this.tempAns.points = pnts;
				this.asks[askindex].answers[ansindex].points = pnts;
				console.log(this.asks[askindex].answers[ansindex].points)
				console.log(askindex, ansindex, pnts)
			},
			quizUpdateMediaId: function(value) {
				var askindex = value[0];
				var ansindex = value[1];
				var id = value[2];
				this.tempAns.mediaId = id;
				this.asks[askindex].answers[ansindex].mediaId = id;
				console.log('media ID obnovlen', askindex, ansindex, id );
				this.animateMediaId(askindex, ansindex)
			},
			updateQuizBg: function(value) {
				this.quizResults[value[0]].mediaId = value[1];
				console.log('current media Id', value[0], value[1])
			},
			
			// анимации 
			beforeChangeNextAskId: function(el) {				
				var lastAskId = document.querySelectorAll("#wrapask"+(this.nextaskIndex-1));
				var results  = document.querySelectorAll(".quiz_result");
				var button = document.querySelectorAll(".quiz_button_add_q");
				console.log('suka', lastAskId);
				el.style.opacity = 0;
				Velocity(el, {translateY: 300},{ duration: 0 });
				Velocity(results, {translateY: 100},{ duration: 300 });
				Velocity(button, {translateY: 100},{ duration: 300 });
			},
			enterChangeNextAskId: function() {
				var lastAskId = document.querySelectorAll("#wrapask"+(this.nextaskIndex-1));
				var results  = document.querySelectorAll(".quiz_result");
				var button = document.querySelectorAll(".quiz_button_add_q");
				Velocity(results, {translateY: 0},{ duration: 300 });
				Velocity(button, {translateY: 0},{ duration: 300 });
				Velocity(lastAskId, { opacity: 1, translateY: 0},{ duration: 500 });
				Velocity(lastAskId, "scroll", { duration: 300 });
			},
			animateMediaId: function(askindex, ansindex) {
				var self = this
				this.tempMediaId = asks[askindex].answers[ansindex].mediaId;
				console.log('animateMediaId', askindex, ansindex);
				console.log('this.tempMediaId', this.tempMediaId);
				this.showMedia = true;
				setTimeout(function() {self.showMedia = false}, 1000);				
			},

			
		},
		watch: {
			/* nextaskIndex: function() {
				console.log('zarabotalosss', this.nextaskIndex);
				var lastAskId = document.querySelectorAll("#wrapask"+(this.nextaskIndex-1));
				console.log('zarabotalosss', lastAskId);
				Velocity(lastAskId, "scroll", { duration: 1000 });
			} */
			
		}
      
	  
	  
	  
	  });
 
 
    }