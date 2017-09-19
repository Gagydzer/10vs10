
    var mediaBgs = [
		{
			id: 1,
			url: 'images/quiz.jpg'
		},
		{
			id: 2,
			url: 'images/quiz8.jpg'
		},
		{
			id: 3,	
			url: 'images/quiz2.jpg'
		},
		{
			id: 4,
			url: 'images/quiz3.jpg'
		}
		]			
		var mediaQuiz = [
		{
			id: 1,
			title: '-В точку!',
			url: 'media/right.gif'
		},
		{
			id: 2,
			title: '-Спасибо за ответ!',
			url: 'media/right.gif'
		},
		{
			id: 3,	
			title: '-Спасибо за ответ!',
			url: 'media/right.gif'
		},
		{
			id: 4,
			title: '-Спасибо за ответ!',
			url: 'media/wrong.gif'
		}
		]
		var media = [
		{
			id: 1,
			isCorrect: true,	
			title: '-В точку!',
			url: 'media/right.gif',
			lowUrl: 'media/right_low.gif'
		},
		{
			id: 2,
			isCorrect: true,	
			title: '-Верно!',
			url: 'media/right.gif',
			lowUrl: 'media/right_low.gif'
		},
		{
			id: 3,
			isCorrect: true,	
			title: '-Правильно!',
			url: 'media/right.gif',
			lowUrl: 'media/right_low.gif'
		},
		{
			id: 4,
			isCorrect: false,	
			title: '-Мимо!',
			url: 'media/wrong.gif',
			lowUrl: 'media/wrong_low.gif'
		},
		{
			id: 5,
			isCorrect: false,	
			title: '-Неверно!',
			url: 'media/wrong.gif',
			lowUrl: 'media/wrong_low.gif'
		},
		{
			id: 6,
			isCorrect: true,	
			title: '-В точку!',
			url: 'media/right.gif',
			lowUrl: 'media/right_low.gif'
		},
		{
			id: 7,
			isCorrect: true,	
			title: '-Верно!',
			url: 'media/right.gif',
			lowUrl: 'media/right_low.gif'
		},
		{
			id: 8,
			isCorrect: true,	
			title: '-Правильно!',
			url: 'media/right.gif',
			lowUrl: 'media/right_low.gif'
		}
		]		
		var mediaQuizResults = [
			{
				id: 1,
				title: '-В точку!',
				url: 'media/right.gif'
			},
			{
				id: 2,
				title: '-Спасибо за ответ!',
				url: 'media/right.gif'
			},
			{
				id: 3,	
				title: '-Спасибо за ответ!',
				url: 'media/right.gif'
			},
			{
				id: 4,
				title: '-Спасибо за ответ!',
				url: 'media/wrong.gif'
			}
			]
			var mediaTestResults = [
				{
					id: 1,
					title: '-В точку!',
					url: 'media/petuh.svg'
				},
				{
					id: 2,
					title: '-Спасибо за ответ!',
					url: 'media/right.gif'
				},
				{
					id: 3,	
					title: '-Спасибо за ответ!',
					url: 'media/right.gif'
				},
				{
					id: 4,
					title: '-Спасибо за ответ!',
					url: 'media/wrong.gif'
				}
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
			title: 'Что это за зверек?',
			mediaId: ' ',			
			image: 'images/quiz.jpg',
			answers: [	
				{	
					id: 1,
					title: 'Шиншила',
					isCorrect: true, // Только для теста
					points: 3, // Вес, для викторины
					mediaId: 1, // Айди гифки
					mediaTitle: '— Прекрасный выбор', // Для викторины
					mediaTitleRight: 'исходный правильный ответ',
					mediaTitleWrong: 'исходный неправильный ответ',
						
					
				},
				{	
					id: 2,
					title: 'Апоссум',
					isCorrect: false,
					points: 3,
					mediaId: 1,
					mediaTitle: '— Прекрасный выбор',
					mediaTitleRight: 'исходный правильный ответ',
					mediaTitleWrong: 'исходный неправильный ответ',
					
				},
				{	
					id: 2,
					title: 'Сумчатая крыса',
					isCorrect: false,
					points: 3,
					mediaId: 1,
					mediaTitle: '— Прекрасный выбор',
					mediaTitleRight: 'исходный правильный ответ',
					mediaTitleWrong: 'исходный неправильный ответ',					
				}					
				],
			nextAnswerId: 4,
			config: {
				id: '',
				image: 'images/quiz.jpg',
				bgblur: 5,
				darkness: 1,
				compStyle: ' ',
				}
			},
			
			{
			id: 2,
			title: 'А кто это?',
			mediaId: ' ',
			mediaTitleRight: ' ',
			mediaTitleWrong: ' ',
			image: 'images/quiz3.jpg',
			answers: [	
				{	
					id: 1,
					title: 'Ёжик',
					isCorrect: false,
					points: 3,
					mediaId: 1,
					mediaTitle: '— Прекрасный выбор',
					mediaTitleRight: 'исходный правильный ответ',
					mediaTitleWrong: 'исходный неправильный ответ',					
				},
				{	
					id: 1,
					title: 'Лемур',
					isCorrect: true,
					points: 3,
					mediaId: 1,
					mediaTitle: '— Прекрасный выбор',
					mediaTitleRight: 'исходный правильный ответ',
					mediaTitleWrong: 'исходный неправильный ответ',					
				}				
				],
			nextAnswerId: 3,
			config: {
				id: '',
				image: 'images/quiz3.jpg',
				bgblur: 0,
				darkness: 1,
				compStyle: ' ',
				}
			}
			]
		var quizResults = [	
		{
			title: 'Батя игры',
			description: 'Вы просто лучший знаток дикой природы Казахстана',
			points: 4,
			mediaId: 1,
		},
		{
			title: 'На уровне',
			description: 'Саакашвили прорвал оцепление на границе Украины и прибыл на территорию страны Лишённого гражданства политика не остановили ни «заминированный» пропускной пункт, ни спецназ, ни запрет на въезд. 15 1 ',
			points: 3,
			mediaId: 1,
		},
		{
			title: 'Почти успех',
			description: 'Стремитесь к успеху, так держать!',
			points: 2,
			mediaId: 1,
		},
		{
			title: 'Слабое звено',
			description: 'Тут все ясно',
			points: 1,
			mediaId: 1,
		}
		]
		var testResults = [	
		{	
			id: 1,
			title: 'Лучший',
			description: 'Великолепный результат',
			mediaId: 1,
		},
		{
			id: 2,
			title: 'Почти лучший',
			description: 'Так держать, в дальнейшем вам обязательно повезет',
			mediaId: 2,
		},
		{
			id: 3,
			title: 'Слабовато',
			description: 'Возвращайтесь, когда будете знать больше',
			mediaId: 3,
		},
		{
			id: 4,
			title: 'Слабое звено',
			description: 'Вам тут не место',
			mediaId: 4,
		}		
		]
