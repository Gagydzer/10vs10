window.onload=function(){
	
	var vm = new Vue({ 
	  
        el: '.quiz_edit_container',
        data: { 
		quizId: 1,
		quizTitle: 'Разбираетесь ли вы в дикой природе Великого Казахстана?',
		startTitle: 'Начать',
		categories: categories,		
		asks: asks,
		mediaBgs: mediaBgs,
		mediaTest: media,
		mediaQuiz: mediaQuiz,
		mediaQuizResults: mediaQuizResults,
		mediaTestResults: mediaTestResults,
		quizResults: quizResults,
		testResults: testResults,
		isTest: true,
		showCover: true,
		showAutor: true,
		startBgConfig: {
				id: 2,
				//image: '',
				bgblur: 0,
				darkness: 1,
				compStyle: '',
				},
		endBgConfig: {
				id: 2,
				//image: 'images/quiz.jpg',
				bgblur: 0,
				darkness: 1,
				compStyle: '',
				},		
		nextaskIndex: 3,
		nextResultIndex: 5, // индекс след результата квиза
		//nextTestResultId: 5, // индекс след результата теста		
		currentask: '', // далее временные данные
		currentanswer: '',
		currentResult: '',
		tempMediaId: 0,
		tempNextAnswerIndex: '',
		tempAns: '', // временный объект текущего вопроса
		tempBgType: '', // 'start', 'ask, 'del'
		showpopup: false,
		showresultpopup: false,
		showBgPopup: false,
		showMedia: false,
		},
		computed: {
			resultTestImg: function() {
				
				if (this.currentResult) {
					if (this.testResults[this.currentResult].mediaId == 'none') {return false}
					else {
						return this.mediaTestResults.find((element) => {
							if (element.id == this.testResults[this.currentResult].mediaId) {
								return element
								}
							}).url
					}	
				}
				else {
					return this.mediaTestResults.find((element) => {
						if (element.id == this.testResults[0].mediaId) {
							return element
							}
						}).url
				}
			},
			media: function() { // массив с гифками
				if (this.isTest) return this.mediaTest;
				else return this.mediaQuiz
			},
			mediaResults: function() {
				if (this.isTest) return this.mediaTestResults;
                else return this.mediaQuizResults
			},
			results: function() {
				if (this.isTest) {return this.testResults;}
                else {return this.quizResults}
			},
			asksTotal: function() {
			return this.asks.length
			},
			CurrentMediaIndex: function() {	// dlya vsplivayshei gifki	
				var self = this;
				return this.media.findIndex(function callback(element) {
					if (element.id == self.tempMediaId) return element });
			},
			answersContainerHeight: function() {
				var arr = [];
				for (var i = 0; i < this.asks.length; i++) {
					arr.push(130+51*(this.asks[i].nextAnswerId-3)+'px')
					}
				return arr
			},
			testResultsLength: function() { return this.testResults.length },
			nextTestResultId: function() {
				return this.testResults[this.testResultsLength - 1].id+1
			},
			testResultsIntervals: function() {
				var self = this;
				var arr = [];
				var reslength = this.testResultsLength;				
				for (i = 0; i < reslength; i++) {
					arr.push(String(100*self.resultsArr[i]) + ' - ' + String(100*self.resultsArr[i+1]) + ' %')
				}
				return arr
			},
			resultsArr: function() {
				var arrlength = this.testResultsLength;
				if (this.testResultsLength == 2) { return [1, 0.5, 0]}
				if (this.testResultsLength == 3) {return [1, 0.66, 0.33, 0]}
				if (this.testResultsLength == 4) {return [1, 0.75, 0.5, 0.25, 0]}
				if (this.testResultsLength == 5) {return [1, 0.8, 0.6, 0.4, 0.2,  2]}
				},
			currentmediatitle: function() {
				if (this.isTest) {
					if (this.asks[this.currentask].answers[this.currentanswers].isCorrect == true) {
						return this.asks[this.currentask].answers[this.currentanswers].mediaTitleRight}
					else {return this.asks[this.currentask].answers[this.currentanswers].mediaTitleWrong}
				}
				else {return this.asks[this.currentask].answers[this.currentanswers].mediaTitle}
			}
		},
		methods: {
			
			// функции вопросов
			
			addNewAsk: function () {				
				this.asks.push({
				id: this.nextaskIndex++,
				mediaId: ' ',
				title: 'Voprosikkk',
				image: 'images/quiz3.jpg',
				answers: [	
					{	
						id: 1,
						title: 'ответ',
						isCorrect: false,
						points: 3,
						mediaId: 1,
						mediaTitle: 'reaction',
						mediaTitleRight: 'исходный правильный ответ',
						mediaTitleWrong: 'исходный неправильный ответ',	
						
					}		
					],
				config: { // otnositsya k background'y
					id: '',
					image: 'images/quiz3.jpg',
					bgblur: 0,
					darkness: 1,
					compStyle: ' ', //vichislyaetsa pri inicialisacii
				},
				nextAnswerId: 2
				});		
				this.addAska(this.nextaskIndex);				
			},
			addAska: function (askIndex) { //animatciya dobavleniya
				var resultBlock = document.querySelectorAll(".quiz_result");
				var lastAskId = document.querySelectorAll("#ask"+askIndex-1);
				Velocity(lastAskId, "scroll", { duration: 1000 });
			},
			deleteAsk: function(index) {
				this.asks.splice(index, 1);
				this.nextaskIndex--;
				this.ShiftPopuup(index, '', 'delask');
				if (index < this.currentask) {this.currentask--}				
			},
			// функции ответов
			addNewAnswer: function(askIndex) {	
				if (this.asks[askIndex].nextAnswerId < 6){					
					this.asks[askIndex].answers.push({
					id: this.asks[askIndex].nextAnswerId++,
					title: '',
					isCorrect: false,
					points: 3,
					mediatype: 1,
					mediaTitle: 'reakciya',
					mediaTitleRight: 'исходный правильный ответ',
					mediaTitleWrong: 'исходный неправильный ответ',	
					}
					)
					this.quizanswers(askIndex);
					this.ShiftPopuup( askIndex , '', 'add');
				}	
			},			
			//анимация прозрачной подложки блока с вопросами и кнопки			
			quizanswers: function (askIndex) {
				var quiz_answers = document.querySelectorAll("#ask"+askIndex);
				var quiz_answers_button = document.querySelectorAll("#ask"+askIndex+' .button_wrap');
				  Velocity(quiz_answers, { height: 130+51*(this.asks[askIndex].nextAnswerId-3)+'px'}, { duration: 300 });
				  Velocity(quiz_answers_button, { bottom: 15+'px'}, { duration: 300 });				  
			},
			
			deleteAnswer: function(askIndex, index) {
				this.asks[askIndex].answers.splice(index, 1);
				this.asks[askIndex].nextAnswerId--;				
				this.quizanswers(askIndex);
				this.ShiftPopuup(askIndex, index, 'del')
				//askIndex = 0;
			},
			
			
			//функции результатов квиза
			addNewQuizResult: function() {	
				if (this.nextResultIndex < 10){					
					this.quizResults.push({
						title: 'Батя игры',
						description: 'Введите описание',
						points: this.testResultsLength-1,
						id: this.nextResultIndex++,
						mediaId: 1,
					}
					) 
					//this.ShiftPopuup( askIndex , '', 'add');
				}	
			},
			deleteQuizResult: function(index) {
				this.quizResults.splice(index, 1);
				this.nextResultIndex--;				
				
				this.hidePopUp('result')
				//askIndex = 0;
			},
			
			// функции результатов теста
			addNewTestResult: function() {	
				if (this.testResultsLength < 6){					
					this.testResults.push({
						title: 'Батя игры',
						description: 'Введите описание',
						points: this.nextTestResultId,
						id: this.nextTestResultId++,
						mediaId: 1,
					}) 
				}	
			},
			deleteTestResult: function(index) {
				if (this.nextTestResultId > 3) {
				this.testResults.splice(index, 1);
				}
			},
					
			// функции вслпывающего окна настроек
			Asktools: function(index, askIndex) {
				this.currentask = askIndex;
				this.currentanswer = index;
				this.tempNextAnswerIndex = this.asks[askIndex].nextAnswerId-1;
				this.tempAns = this.asks[askIndex].answers[index];
				this.showpopup = true;
				this.showBgPopup = false;
				this.hidePopUp('bg');
			},
			Resulttools: function(index) {
				this.currentResult = index;
				this.tempNextAnswerIndex = this.nextResultIndex-1;
				this.showresultpopup = true

			},
			bgTools: function(type, index) {	
				
				if (type == 'start') {
				this.showBgPopup = true;
				}
				if (type == 'ask') {
				this.tempNextAnswerIndex = this.asks[index].nextAnswerId;
				this.currentask = index;
				this.showpopup = false;
				}
				if (type == 'end') {
				this.showpopup = false;
				}
				this.showBgPopup = true;
				this.tempBgType = type;
			},
			
			 // его сдвиг
			ShiftPopuup: function(askIndex, index, type) { //type: del, add, body]
				if ((askIndex === '')&&(index === '')&&(type == 'body')) {					
				this.currentanswer = '';
				this.currentask = '';
				this.tempNextAnswerIndex = '';
				this.showpopup = false;
				}
				if ((this.currentask == askIndex)&&(this.currentanswer == index)&&(type == 'del')) {	
					this.currentask = '';
					this.currentanswer = '';
					this.tempNextAnswerIndex = '';
					this.showpopup = false;
				}
				if ((this.currentask == askIndex)&&(this.currentanswer > index)&&(type == 'del')) {
					this.currentanswer--;		
					this.tempNextAnswerIndex--;
				}
				if ((this.currentask == askIndex)&&(this.currentanswer < index)&&(type == 'del')) {
					this.tempNextAnswerIndex--;
				}
				if ((this.currentask == askIndex)&&(type == 'add')) {
					this.tempNextAnswerIndex++;
				}
				if ((askIndex == this.currentask)&&(type == 'delask')) {
					this.showpopup = false;
					this.showBgPopup = false;
					this.showMedia = false;
					this.currentask = ''
					}
				
					
			},
			hidePopUp: function(type) {
				if (type == 'bg') {
					this.showBgPopup = false;
				}
				if (type == 'result') {
					this.showBgPopup = false
					this.showresultpopup = false
				}
				if (type == 'all') {
					this.showBgPopup = false
					this.showpopup = false;
					this.showresultpopup = false;
				}				
			},
			
			
			hideButton: function (value) {
				if (value > 6) {
				return 'Button_hide'
				}
			},
			fadeButton: function (value) {
				if (value > 5) {
				return 'disabled'
				}
			},
			
			// анимации списка вопросов
			
			
			
			
			
			//обновление ИзКоррект
			
			updateIsCorrect: function(value) {
				var askindex = value[1];
				var ansindex = value[0];
				var isCorr = value[2];
				this.tempAns.isCorrect = isCorr;
				this.asks[askindex].answers[ansindex].isCorrect = isCorr;
			},
			
			//оьновление веса вопроса
			
			updatePoints: function(value) {
				var askindex = value[0];
				var ansindex = value[1];
				var pnts = +value[2];
				this.tempAns.points = pnts;
				this.asks[askindex].answers[ansindex].points = pnts;
			},
			quizUpdateMediaId: function(value) {
				var askindex = value[0];
				var ansindex = value[1];
				var id = value[2].mediaId;
				this.tempAns.mediaId = id;
				this.asks[askindex].answers[ansindex].mediaId = id;
				if (this.asks[askindex].answers[ansindex].isCorrect) {this.asks[askindex].answers[ansindex].mediaTitleRight = value[2].mediaTitleRight}
				if (!this.asks[askindex].answers[ansindex].isCorrect) {this.asks[askindex].answers[ansindex].mediaTitleWrong = value[2].mediaTitleWrong}		
				this.animateMediaId(askindex, ansindex);
			},
			
			updateBgConfig: function(arguments) { //[{value}, type=['start', 'end', 'ask'] , currentask]
				console.log(arguments);
				if (arguments[1] == 'start') {this.startBgConfig.id = arguments[0].id; console.log(this.id);}
				if (arguments[1] == 'end') { this.endBgConfig = arguments[0] }
				if (arguments[1] == 'ask') { this.asks[arguments[2]].config = arguments[0] }
			},

			updateMediaResult: function(arguments){
				this.results[arguments[0]].mediaId = arguments[1]
			},
			updateTempAns: function(value) {
				var askIndex = value[0];
				var ansIndex = value[1];
				var tempAns = value[2];
				if (this.isTest) {
					this.asks[askIndex].answers[ansIndex].mediaTitleRight = tempAns.mediaTitleRight
					this.asks[askIndex].answers[ansIndex].mediaTitleWrong = tempAns.mediaTitleWrong
				}
				else {
					this.asks[askIndex].answers[ansIndex].mediaTitle = tempAns.mediaTitle
				}	
			},
			// анимации 
			beforeChangeNextAskId: function(el) {				
				var lastAskId = document.querySelectorAll("#wrapask"+(this.nextaskIndex-1));
				var results  = document.querySelectorAll(".quiz_result");
				var button = document.querySelectorAll(".quiz_button_add_q");
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
				if (this.currentMediaIndex != -1) {
				var self = this;
				this.tempMediaId = asks[askindex].answers[ansindex].mediaId;
				this.showMedia = true;
				setTimeout(function() {self.showMedia = false}, 3000);}				
			},
			addNewUserMedia: function(value){ 
//arguments: type: 'startbg', 'endbg', 'quizbg', 'rightAnswer', 'wrongAnswer', 'titul', ...
			var arr = value[0];
			this.mediaBgs = arr;
			
			
			},						
		},		
		created: function() {
			var self = this;
						function compStyle(currentValue) {
							var id = currentValue.id;
							var url = currentValue.image;
							
							if (!url)  {
								this.mediaBgs.findIndex((element) => {if (id == element.id) {							
								
								url = element.url}})
							}													
							var bgblur = currentValue.bgblur;
							var dark = currentValue.darkness;
							var comp = 'background-image: url(' + url + '); filter: blur(' + bgblur + 'px) brightness(' + dark + ')';							
							currentValue.image = url;
							currentValue.compStyle = comp;			
						}
						this.asks.forEach(function callback(currentValue) {compStyle(currentValue.config)} );
						compStyle(this.startBgConfig);
						compStyle(this.endBgConfig);									
				}
	  }); 
    }