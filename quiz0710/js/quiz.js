
Array.prototype.getIndexById = function (id) {
	var index = this.findIndex(function callback(element) {
		if (element.id == id) return true });
	return index
}

Array.prototype.getItemById = function (id) {
	var index = this.findIndex(function callback(element) {
		if (element.id == id) return true });
	return this[index]
}

Array.prototype.getIdByIndex = function (index) {
	return this[index].id
}
Array.prototype.pushUserMedia = function (index) {
	return this[index].id
}
Array.prototype.filterByCategoryId = function (categoryId) {
	var newArr = this.filter((element) => {if (element.categoryId == categoryId) return true})
	return newArr
}



window.onload=function(){

	

	var vm = new Vue({ 
	  
        el: '.quiz_edit_container',
        data: { 
		quizId: 1,
		quizTitle: 'Насколько хорошо вы знаете гангстеров Америки?',
		startTitle: 'Начать',
		categories: categories,
		bgCategories: bgCategories,
		mediaCategories: mediaCategories,		
		asks: asks,
		userMedia: userMedia,
		userBgs: userBgs,
		promoList: promoList,
		promo: promo,
		userPromo: userPromo,
		userMediaTestResults: userMediaTestResults,
		userMediaQuizResults: userMediaQuizResults,
		testResults: testResults,
		quizResults: quizResults,
		quizResultsCategories: resultMedia.quiz,
		testResultsCategories: resultMedia.test,
		isTest: true,
		showCover: true,
		showAutor: true,
		startBgConfig: {
			id: 1,
			category: 2,
			image: '',
			bgblur: 0,
			darkness: .8,
			compStyle: ' ',
			},
		endBgConfig: {
			id: 4,
			category: 2,
			image: '',
			bgblur: 0.1,
			darkness: .8,
			compStyle: ' ',
			},			
		currentask: '', // далее временные данные
		currentPromoId: undefined,
		currentPromoType: undefined,
		currentanswer: '',
		currentResult: 0,
		tempMediaId: '',
		tempMediaCategory: '',
		tempNextAnswerIndex: '',
		tempAns: '', // временный объект текущего вопроса
		tempBgType: '', // 'start', 'ask, 'del'
		showpopup: false,
		showresultpopup: false,
		showBgPopup: false,
		showMedia: false,
		closeToolsCategories: false,
		mediaResultWatcher: false,
		showPromoPopup: false,
		promoListIndex: undefined,
		promoArrayLength: undefined,
		promoArrayIndex: undefined
		},
		computed: { 
			currentPromoIndex: function () {
				var index; 
				if (this.currentPromoType) {
					index = this.userPromo.getIndexById(this.currentPromoId)
				}
				else {
					index = this.promo.getIndexById(this.currentPromoId)
				}
				return index
			},
			userResultMedia: function () {
				if (this.isTest) {
					return this.userMediaTestResults
				}
				else return this.userMediaQuizResults
			},
			currentResultMediaCategory: function () {
				if (this.currentResult !== '') {
					var id = this.results[this.currentResult].category;
					
				console.log('cur id',id);
					if (this.isTest) var arr = this.quizResultsCategories;
					else arr = this.testResultsCategories;
					var index = arr.getIndexById(id)

					return arr[index].media
				}
				else return this.testResultsCategories[0].media
			},
			currentResultCategoryId: function () { // iz RESULTATOV A NE IZ MEDIA
				if (this.currentResult !== "") return this.results[this.currentResult].category
				else return undefined
			},
			currentResultCaterogies: function() {
				if (this.isTest) return this.testResultsCategories
				else return this.quizResultsCategories
			},
			userResults: function () {
				if (this.isTest) return this.userMediaTestResults
				else return this.userMediaQuizResults
			},
			mediaUrl: function() {
				if (this.tempAns.mediaFromUser) {
					var mediaCategory = this.userMedia.filterByCategoryId(this.tempAns.mediaCategoryId)
					console.log(mediaCategory[mediaCategory.getIndexById(this.tempAns.mediaId)].url);
					return mediaCategory[mediaCategory.getIndexById(this.tempAns.mediaId)].url
				}
				else {
					var mediaCategory = this.mediaCategories[this.mediaCategories.getIndexById(this.tempAns.mediaCategoryId)].media
					return mediaCategory[mediaCategory.getIndexById(this.tempAns.mediaId)].url
				}
			},
			currentMediaCategoryId: function() {
				return this.tempAns.mediaCategoryId
			},
			tempMediaTitle: function() {
				if (this.isTest) {
					if (this.tempAns.isCorrect) { 
						return this.tempAns.mediaTitleRight}
					else {
						return this.tempAns.mediaTitleWrong }
				}
				else {return this.tempAns.mediaTitle}
			
			},
			resultTestImg: function() {
				if (this.currentResult !== '') {
					console.log('11111111111111111111')
					var curRes = this.results[this.currentResult]
					if (curRes.mediaId == 'none') {console.log('2222222222222222222222'); return false}
					else {
						console.log('333333333333333333')
						if (!curRes.mediaFromUser) {
							console.log('44444444444444')
							return this.currentResultMediaCategory[this.currentResultMediaCategory.getIndexById(curRes.mediaId)].url						
						}
						else {
							console.log('555', this.userMediaTestResults, curRes.mediaId, this.userMedia.getIndexById(curRes.mediaId))

							return this.userResultMedia[this.userResultMedia.getIndexById(curRes.mediaId)].url
						}
					}	
				}
				else {
					console.log('666666666666666666666666666666666666')
					return this.testResultsCategories[0].media.find((element) => {
						if (element.id == this.results[0].mediaId) {
							return true
							}
						}).url
				}
			},
			media: function() { // массив с гифками
				if (this.isTest) {return this.mediaTest;}
				else {return this.mediaQuiz}
			},
			results: function() {
				if (this.isTest) {return this.testResults}
                else {return this.quizResults}
			},
			asksTotal: function() {
			return this.asks.length
			},
			answersContainerHeight: function() {
				var arr = [];
				for (var i = 0; i < this.asks.length; i++) {
					arr.push(130+51*(this.asks[i].nextAnswerId-3)+'px')
					}
				return arr
			},
			NextTestIndex: function() {return this.testResults.length},
			NextAskIndex: function() {return this.asks.length},
			NextAnswersIndex: function() {
				return this.asks[this.currentask].answers.length},
			NextQuizIndex: function() {return this.quizResults.length},
			nextResultIndex: function() {return ( (this.isTest) ? this.NextTestIndex :  this.NextQuizIndex)},
			
			nextResultId: function() {
				return this.testResults[this.nextResultIndex - 1].id + 1
			},
			testResultsIntervals: function() { // procent intervals
				if (this.isTest) {
					var self = this;
					var arr = [];
					var reslength = this.NextTestIndex;				
					for (i = 0; i < reslength; i++) {
						arr.push(String(100*self.resultsArr[i]) + ' - ' + String(100*self.resultsArr[i+1]) + ' %')
					}
					return arr
				}
				else return false
			},
			resultsArr: function() { // procent intervals
				var arrlength = this.nextResultIndex;
				if (this.nextResultIndex == 2) { return [1, 0.5, 0]}
				if (this.nextResultIndex == 3) {return [1, 0.66, 0.33, 0]}
				if (this.nextResultIndex == 4) {return [1, 0.75, 0.5, 0.25, 0]}
				if (this.nextResultIndex == 5) {return [1, 0.8, 0.6, 0.4, 0.2,  0]}
				}
		},
		methods: {
			
			// функции вопросов
			
			addNewAsk: function () {				
				this.asks.push({
				id: this.NextAskIndex, // DOPILIT UNIKALNOST ID
				title: 'Voprosikkk',
				answers: [	
					{	
						id: 1,
						title: 'ответ',
						isCorrect: false,
						points: 1,
						mediaId: 1,
						mediaFromUser: false,
						mediaCategoryId: 1,
						mediaTitle: 'reaction',
						mediaTitleRight: 'исходный правильный ответ',
						mediaTitleWrong: 'исходный неправильный ответ',	
						
					}		
					],
				config: { // otnositsya k background'y
					id: 1,
					category: 1,
					image: 'images/quiz3.jpg',
					mediaFromUser: false,
					bgblur: 0,
					darkness: 1,
					compStyle: ' ', //vichislyaetsa pri inicialisacii
				},
				nextAnswerId: 2
				});		
				this.addAska(this.NextAskIndex);				
			},
			addAska: function (askIndex) { //animatciya dobavleniya
				var resultBlock = document.querySelectorAll(".quiz_result");
				var lastAskId = document.querySelectorAll("#ask"+askIndex-1);
				Velocity(lastAskId, "scroll", { duration: 1000 });
			},
			deleteAsk: function(index) {
				this.asks.splice(index, 1);
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
					mediaId: 1,
					mediaFromUser: false,
					mediaCategoryId: 1,
					points: 3, // ????????????????????????????????????????????????????????????????????????????
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
				  Velocity(quiz_answers, { height: 130+58*(this.asks[askIndex].nextAnswerId-3)+'px'}, { duration: 300 });
				  Velocity(quiz_answers_button, { bottom: 15+'px'}, { duration: 300 });				  
			},
			
			deleteAnswer: function(askIndex, index) {
				if (this.asks[askIndex].answers.length > 2) {
					this.asks[askIndex].answers.splice(index, 1);
					this.asks[askIndex].nextAnswerId--;				
					this.quizanswers(askIndex);
					this.ShiftPopuup(askIndex, index, 'del')
				}
			},

			addNewResult: function() {
				if (this.nextResultIndex < 5){					
					this.results.push({
						title: 'Батя игры',
						description: 'Введите описание',
						points: this.nextResultIndex,
						id: this.nextResultId,
						mediaId: 1,
						category: 1,
						mediaFromUser: false,
					})
				}
			},
			deleteResult: function(index) {
				if (this.nextResultIndex > 2) {
				this.results.splice(index, 1);
				this.hidePopUp('result')
				};
				this.shiftResultPopup(index, 'del')
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
				if (index === '') {
					this.currentResult = 0
				}
				else{
				this.currentResult = index;
				}
				this.showBgPopup = false;
				this.showresultpopup = true

			},
			bgTools: function(type, index) {	
				
				if (type == 'start') {
				this.showBgPopup = true;
				}
				if (type == 'ask') {
				this.tempNextAnswerIndex = this.asks[index].nextAnswerId;
				this.currentask = index;
				this.showBgPopup = !this.showBgPopup;
				this.showpopup = false
				}
				if (type == 'end') {
				this.showpopup = !this.showpopup;
				console.log('showpopup', this.showpopup)
				this.showBgPopup = !this.showBgPopup;
				this.showresultpopup = false;
				}
				
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
				shiftResultPopup: function(index, type) {
					
					if ((index == this.currentResult)&&(type == 'del')) {
						console.log('sootvetstvuet', index, type)
						this.showresultpopup = false;
						this.currentResult = 0
					}
					else {
						if (this.currentResult) {
							console.log('nesootvetstvuet 1', index, type)
							if ((index > this.currentResult)&&(type == 'del')) {
								this.currentResult--
							}
							if ((index < this.currentResult)&&(type == 'del')) {
								console.log('nesootvetstvuet 2', index, type)
								if (this.currentResult) this.currentResult--
							}
						}
					}
					

				
				
					
			},
			hidePopUp: function(type) {
				this.closeToolsCategories = !this.closeToolsCategories;
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
					this.showPromoPopup = false;
				}	
				if (type == 'promo') {
					this.showPromoPopup = false;
				}			
			},
			
			
			hideButton: function (value) {
				if (value > 6) {
				return 'Button_hide'
				}
			},
			fadeButton: function (value) {
				if (value > 4) {
				return 'disabled'
				}
				else return ''
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
				if (arguments[1] == 'start') {this.startBgConfig.id = arguments[0].id}
				if (arguments[1] == 'end') { this.endBgConfig = arguments[0] }
				if (arguments[1] == 'ask') { this.asks[arguments[2]].config = arguments[0] }
			},

			updateMediaResult: function(arguments){
				if (arguments[1] == 'none') {this.results[arguments[0]].mediaId = 'none'}
				else this.results[arguments[0]].mediaId = arguments[1]
			},
			updateTitle: function(value) {
				console.log('noviy zagolovok', value)
				if (!this.isTest) { this.asks[value[0]].answers[value[1]].mediaTitle = value[2] }
				else {
					if (this.asks[value[0]].answers[value[1]].isCorrect) {
						this.asks[value[0]].answers[value[1]].mediaTitleRight = value[2]
					}
					else {
						this.asks[value[0]].answers[value[1]].mediaTitleWrong = value[2]
					}
				}
			},
			// анимации 
			beforeChangeNextAskId: function(el) {				
				var lastAskId = document.querySelectorAll("#wrapask"+(this.NextAskIndex));
				var results  = document.querySelectorAll(".quiz_result");
				var button = document.querySelectorAll(".quiz_button_add_q");
				el.style.opacity = 0;
				Velocity(el, {translateY: 300},{ duration: 0 });
				Velocity(results, {translateY: 100},{ duration: 300 });
				Velocity(button, {translateY: 100},{ duration: 300 });
			},
			enterChangeNextAskId: function() {
				var lastAskId = document.querySelectorAll("#wrapask"+(this.NextAskIndex));
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
				this.tempMediaCategory = asks[askindex].answers[ansindex].mediaCategoryId
				this.showMedia = true;
				setTimeout(function() {self.showMedia = false}, 3000);}				
			},
			addNewUserMedia: function(value){ 
//arguments: type: 'startbg', 'endbg', 'quizbg', 'rightAnswer', 'wrongAnswer', 'titul', ...
			var arr = value[0];
			this.bgCategories = arr;			
			},
			pushPromo: function() {
				this.showPromoPopup = true;
			},	
			createPromo: function() {
				var title = arguments[0];
				var url = arguments[1];
				var id =  this.userPromo[this.userPromo.length - 1].id + 1;
				var bgUrl = arguments[2];
				var fromUser = arguments[3];
				console.log('NOVOE ID', id)
				var item = { 
					title: title,
					bgUrl: bgUrl,
					id: id,
					url: url,
					fromUser: fromUser
				}
				var itemList = {
					id: id,
					fromUser: true
				}
				this.userPromo.push(item);
				if (this.promoListIndex == -1) {
					this.promoList.push(itemList);
					
					this.promoListIndex = this.promoList.length - 1;
				}
				
			},
			editPromo: function(value) {
				this.showPromoPopup = true;
				this.currentPromoId = value[0];
				this.currentPromoType = value[1];
			},
			updatePromo: function(value) {
				if (this.promoListIndex != -1) {
					var oldId = this.promoList.getIdByIndex(this.promoListIndex)
					var newId = value[0];
					var oldType = value[3];
					var newType = value[2];
					var index = this.promoListIndex
					var arr;
					this.promoList[index].id = newId;
					this.promoList[index].fromUser = newType;
					console.log('update promo!!!')
				}
				else {
					
					var newId = value[0];
					var newType = value[2];
					var item = {
						id: newId,
						fromUser: newType
					}
					this.promoList.push(item);
					this.promoListIndex = this.promoList.length - 1;
					console.log('update promo!!!')
				}
			},
			clickVoidPromo: function() {
				this.showPromoPopup = true;
				this.promoListIndex = -1
			},
			updateUserPromo: function(value) {
				var id = value[0];
				var title = value[1];
				var url = value[2];
				var bgUrl = value[3]
				var index = this.userPromo.getIndexById(id);
				this.userPromo[index].id = id;
				this.userPromo[index].title = title;
				this.userPromo[index].url = url;
				this.userPromo[index].bgUrl = bgUrl;
			},
			updateToFromUserPromo: function(value) {
				var id = value[0];
				var title = value[1];
				var url = value[2];
				var bgUrl = value[3];
				var listIndex = value[4];
				this.createPromo(title, url, bgUrl, true);
				var newId = this.userPromo[this.userPromo.length - 1].id
				this.promoList[listIndex].id  = newId;
				this.promoList[listIndex].fromUser = true
			},
			deletePromo: function(value) {
				let id = value[0];
				let fromUser = value[1];
				let indexList = value[2];
				let index;
				this.showPromoPopup = false;
				this.promoListIndex = -1 ;
				this.currentPromoId = undefined;
				this.currentPromoType = undefined;
				this.promoList.splice(indexList, 1);
			},
			updatePromoArrayData: function(value) {
				this.promoArrayIndex = value[1];
				this.promoArrayLength = value[0]
			}

		},		
		created: function() {
			var self = this;
						function compStyle(currentValue) {
							var id = currentValue.id;
							var catId = currentValue.category;
							var url = currentValue.image;
							
							if (!url)  {
								var catIndex = this.bgCategories.getIndexById(catId);
								var idIndex = this.bgCategories[catIndex].media.getIndexById(id)
								url = this.bgCategories[catIndex].media[idIndex].url
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
				},
				
				components: {
					scrollbar: Vue2Scrollbar
		}
	  }); 
    }