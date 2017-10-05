	
	var promoList = [ 
		{
			id: 1,
			fromUser: false
		},
		{
			id: 2,
			fromUser: true
		}
		
	]
	
	var promo = [ 
		{
			id: 1,
			category: 1,
			url: '111',
			fromUser: false,
			title: '1 итем',
			description: 'Сможете ли вы отличить факты от вымысла..',
			bgUrl: 'images/content1.jpg'
		},
		{
			id: 2,
			category: 1,
			url: '111',
			fromUser: false,
			title: '2 итем',
			description: 'Сможете ли вы отличить факты от вымысла..',
			bgUrl: 'images/content2.jpg'
		},
		{
			id: 3,
			category: 1,
			url: '111',
			fromUser: false,
			title: '3 итем',
			description: 'Сможете ли вы отличить факты от вымысла..',
			bgUrl: 'images/content1.jpg'
		},
		{
			id: 4,
			category: 1,
			url: '111',
			fromUser: false,
			title: '4 итем',
			description: 'Сможете ли вы отличить факты от вымысла..',
			bgUrl: 'images/content2.jpg'
		}
	]
	
	var userPromo = [ //promo iz sozdanih v etom redaktore

		{
			id: 1,
			category: 1,
			url: '',
			fromUser: true,
			title: '>Юзер промо 1',
			description: 'Сможете ли вы отличить факты от вымысла..',
			bgUrl: 'images/content1.jpg'
		},
		{
			id: 2,
			category: 1,
			url: '',
			fromUser: true,
			title: 'Юзер промо 2',
			description: 'из произведений массовой культуры ..',
			bgUrl: 'images/content2.jpg'
		},
		{
			id: 3,
			category: 1,
			url: '',
			fromUser: true,
			title: 'Юзер промо 3',
			description: 'из произведений массовой культуры ..',
			bgUrl: 'images/content2.jpg'
		},
	]

	var resultMedia = {
		test: [
			{id: 1,
			title: 'Позитив',
			icon: '',
			media: [
				{
					id: 1,
					title: '-В точку!',
					url: 'media/petuh.svg',
					lowUrl: 'media/petuh.svg'
				},
				{
					id: 2,
					title: '-Спасибо за ответ!',
					url: 'media/right.gif',
					lowUrl: 'media/right.gif'
				},
				{
					id: 3,	
					title: '-Спасибо за ответ!',
					url: 'media/right.gif',
					lowUrl: 'media/right.gif'
				},
				{
					id: 4,
					title: '-Спасибо за ответ!',
					url: 'media/wrong.gif',
					lowUrl: 'media/wrong.gif'
				}
		    ]	
			},
			{id: 2,
				title: 'Негатив',
				icon: '',
				media: [
					{
						id: 1,
						title: '-В точку!',
						url: 'media/petuh.svg',
						lowUrl: 'media/petuh.svg'
					},
					{
						id: 2,
						title: '-Спасибо за ответ!',
						url: 'media/right.gif',
						lowUrl: 'media/right.gif'
					},
					{
						id: 3,	
						title: '-Спасибо за ответ!',
						url: 'media/right.gif',
						lowUrl: 'media/right.gif'
					},
					{
						id: 4,
						title: '-Спасибо за ответ!',
						url: 'media/wrong.gif',
						lowUrl: 'media/wrong.gif'
					}
				]	
			}
		],
	quiz: [
			{id: 1,
			title: 'Позитив',
			icon: '',
			media: [
				{
					id: 1,
					title: '-В точку!',
					url: 'media/petuh.svg',
					lowUrl: 'media/petuh.svg'
				},
				{
					id: 2,
					title: '-Спасибо за ответ!',
					url: 'media/right.gif',
					lowUrl: 'media/right.gif'
				},
				{
					id: 3,	
					title: '-Спасибо за ответ!',
					url: 'media/right.gif',
					lowUrl: 'media/right.gif'
				},
				{
					id: 4,
					title: '-Спасибо за ответ!',
					url: 'media/wrong.gif',
					lowUrl: 'media/wrong.gif'
				}
		    ]	
			},
			{id: 2,
				title: 'Негатив',
				icon: '',
				media: [
					{
						id: 1,
						title: '-В точку!',
						url: 'media/petuh.svg',
						lowUrl: 'media/petuh.svg'
					},
					{
						id: 2,
						title: '-Спасибо за ответ!',
						url: 'media/right.gif',
						lowUrl: 'media/right.gif'
					},
					{
						id: 3,	
						title: '-Спасибо за ответ!',
						url: 'media/right.gif',
						lowUrl: 'media/right.gif'
					},
					{
						id: 4,
						title: '-Спасибо за ответ!',
						url: 'media/wrong.gif',
						lowUrl: 'media/wrong.gif'
					}
				]	
				}
		]
	}
	var userMedia = [{
		id: 1,
		categoryId: 1,
		title: '-1',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},
	{
		id: 2,
		categoryId: 2,
		title: '-2',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},
	{
		id: 3,
		categoryId: 2,	
		title: '-3',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},
	{
		id: 4,
		categoryId: 1,
		title: '-4',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},]
	var testResults = [{
		id: 1,
		categoryId: 1,
		title: '-1',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},
	{
		id: 2,
		categoryId: 2,
		title: '-2',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},
	{
		id: 3,
		categoryId: 2,	
		title: '-3',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},
	{
		id: 4,
		categoryId: 1,
		title: '-4',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},]
	var quizResults = [{
		id: 1,
		categoryId: 1,
		title: '-1',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},
	{
		id: 2,
		categoryId: 2,
		title: '-2',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},
	{
		id: 3,
		categoryId: 2,	
		title: '-3',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},
	{
		id: 4,
		categoryId: 1,
		title: '-4',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},]
	var userBgs = [{
		id: 1,
		categoryId: 1,
		title: '-1',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},
	{
		id: 2,
		categoryId: 2,
		title: '-2',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},
	{
		id: 3,
		categoryId: 2,	
		title: '-3',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},
	{
		id: 4,
		categoryId: 1,
		title: '-4',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},]
	var userMediaTestResults = [{
		id: 1,
		categoryId: 1,
		title: '-1',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},
	{
		id: 2,
		categoryId: 2,
		title: '-2',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},
	{
		id: 3,
		categoryId: 2,	
		title: '-3',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},
	{
		id: 4,
		categoryId: 1,
		title: '-4',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},]
	var userMediaQuizResults = [{
		id: 1,
		categoryId: 1,
		title: '-1',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},
	{
		id: 2,
		categoryId: 2,
		title: '-2',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},
	{
		id: 3,
		categoryId: 2,	
		title: '-3',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},
	{
		id: 4,
		categoryId: 1,
		title: '-4',
		url: 'media/right.gif',
		lowUrl: 'media/right_low.gif'
	},]
	var mediaCategories = [
		{
			id: 1,
			title: 'Позитив',
			icon: '',
			media: [
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
		},
		{
			id: 2,
			title: 'Негатив',
			icon: '',
			media: [
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
				}
				]
		},
		{
			id: 3,
			title: 'Сверчки',
			icon: '',
			media: [
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
				}
			]
		},
		{
			id: 4,
			title: 'Червячки',
			icon: '',
			media: [
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
				}
			]
		},
		{
			id: 5,
			title: 'Морячки',
			icon: '',
			media: [
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
				}
			]
		},
		{
			id: 6,
			title: 'Категория',
			icon: '',
			media: [
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
				}
			]
		},
		{
			id: 7,
			title: 'Политики',
			icon: '',
			media: [
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
				}
			]
		},
		{
			id: 8,
			title: 'Футболисты',
			icon: '',
			media: [
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
				}
			]
		},
		{
			id: 9,
			title: 'Музыкатны',
			icon: '',
			media: [
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
				}
			]
		},
	]
	var bgCategories = [
		{
			id: 1,
			title: 'Животные',
			icon: '',
			media: [
				{
					id: 1,
					title: '-В точку!',
					url: 'images/quiz.jpg',
					lowUrl: 'images/quiz.jpg'
				},
				{
					id: 2,	
					title: '-Верно!',
					url: 'images/quiz2.jpg',
					lowUrl: 'images/quiz2.jpg'
				},
				{
					id: 3,
					isCorrect: true,	
					title: '-Правильно!',
					url: 'images/quiz3.jpg',
					lowUrl: 'images/quiz3.jpg'
				},
				{
					id: 6,	
					title: '-В точку!',
					url: 'images/quiz4.jpg',
					lowUrl: 'images/quiz4.jpg'
				}
				]
		},
		{
			id: 2,
			title: 'Фильмы',
			icon: '',
			media: [
				{
					id: 1,
					title: '-В точку!',
					url: 'images/quiz4.jpg',
					lowUrl: 'images/quiz4.jpg'
				},
				{
					id: 2,	
					title: '-Верно!',
					url: 'images/quiz10.jpg',
					lowUrl: 'images/quiz10.jpg'
				},
				{
					id: 3,
					isCorrect: true,	
					title: '-Правильно!',
					url: 'images/quiz11.jpg',
					lowUrl: 'images/quiz3.jpg'
				},
				{
					id: 4,	
					title: '-В точку!',
					url: 'images/quiz12.jpg',
					lowUrl: 'images/quiz4.jpg'
				}
				]
		},
		{
			id: 3,
			title: 'Сверчки',
			icon: '',
			media: [
				{
					id: 1,
					title: '-В точку!',
					url: 'images/quiz6.jpg',
					lowUrl: 'images/quiz.jpg'
				},
				{
					id: 2,	
					title: '-Верно!',
					url: 'images/quiz7.jpg',
					lowUrl: 'images/quiz2.jpg'
				},
				{
					id: 3,
					isCorrect: true,	
					title: '-Правильно!',
					url: 'images/quiz8.jpg',
					lowUrl: 'images/quiz3.jpg'
				},
				{
					id: 6,	
					title: '-В точку!',
					url: 'images/quiz.jpg',
					lowUrl: 'images/quiz4.jpg'
				}
				]
		},
		{
			id: 4,
			title: 'Червячки',
			icon: '',
			media: [
				{
					id: 1,
					title: '-В точку!',
					url: 'images/quiz6.jpg',
					lowUrl: 'images/quiz.jpg'
				},
				{
					id: 2,	
					title: '-Верно!',
					url: 'images/quiz7.jpg',
					lowUrl: 'images/quiz2.jpg'
				},
				{
					id: 3,
					isCorrect: true,	
					title: '-Правильно!',
					url: 'images/quiz8.jpg',
					lowUrl: 'images/quiz3.jpg'
				},
				{
					id: 6,	
					title: '-В точку!',
					url: 'images/quiz.jpg',
					lowUrl: 'images/quiz4.jpg'
				}
				]
		},
		{
			id: 5,
			title: 'Морячки',
			icon: '',
			media: [
				{
					id: 1,
					title: '-В точку!',
					url: 'images/quiz6.jpg',
					lowUrl: 'images/quiz.jpg'
				},
				{
					id: 2,	
					title: '-Верно!',
					url: 'images/quiz7.jpg',
					lowUrl: 'images/quiz2.jpg'
				},
				{
					id: 3,
					isCorrect: true,	
					title: '-Правильно!',
					url: 'images/quiz8.jpg',
					lowUrl: 'images/quiz3.jpg'
				},
				{
					id: 6,	
					title: '-В точку!',
					url: 'images/quiz.jpg',
					lowUrl: 'images/quiz4.jpg'
				}
				]
		},
		{
			id: 6,
			title: 'Категория',
			icon: '',
			media: [
				{
					id: 1,
					title: '-В точку!',
					url: 'images/quiz6.jpg',
					lowUrl: 'images/quiz.jpg'
				},
				{
					id: 2,	
					title: '-Верно!',
					url: 'images/quiz7.jpg',
					lowUrl: 'images/quiz2.jpg'
				},
				{
					id: 3,
					isCorrect: true,	
					title: '-Правильно!',
					url: 'images/quiz8.jpg',
					lowUrl: 'images/quiz3.jpg'
				},
				{
					id: 6,	
					title: '-В точку!',
					url: 'images/quiz.jpg',
					lowUrl: 'images/quiz4.jpg'
				}
				]
		},
		{
			id: 7,
			title: 'Политики',
			icon: '',
			media: [
				{
					id: 1,
					title: '-В точку!',
					url: 'images/quiz6.jpg',
					lowUrl: 'images/quiz.jpg'
				},
				{
					id: 2,	
					title: '-Верно!',
					url: 'images/quiz7.jpg',
					lowUrl: 'images/quiz2.jpg'
				},
				{
					id: 3,
					isCorrect: true,	
					title: '-Правильно!',
					url: 'images/quiz8.jpg',
					lowUrl: 'images/quiz3.jpg'
				},
				{
					id: 6,	
					title: '-В точку!',
					url: 'images/quiz.jpg',
					lowUrl: 'images/quiz4.jpg'
				}
				]
		},
		{
			id: 8,
			title: 'Футболисты',
			icon: '',
			media: [
				{
					id: 1,
					title: '-В точку!',
					url: 'images/quiz6.jpg',
					lowUrl: 'images/quiz.jpg'
				},
				{
					id: 2,	
					title: '-Верно!',
					url: 'images/quiz7.jpg',
					lowUrl: 'images/quiz2.jpg'
				},
				{
					id: 3,
					isCorrect: true,	
					title: '-Правильно!',
					url: 'images/quiz8.jpg',
					lowUrl: 'images/quiz3.jpg'
				},
				{
					id: 6,	
					title: '-В точку!',
					url: 'images/quiz.jpg',
					lowUrl: 'images/quiz4.jpg'
				}
				]
		},
		{
			id: 9,
			title: 'Музыкатны',
			icon: '',
			media: [
				{
					id: 1,
					title: '-В точку!',
					url: 'images/quiz6.jpg',
					lowUrl: 'images/quiz.jpg'
				},
				{
					id: 2,	
					title: '-Верно!',
					url: 'images/quiz7.jpg',
					lowUrl: 'images/quiz2.jpg'
				},
				{
					id: 3,
					isCorrect: true,	
					title: '-Правильно!',
					url: 'images/quiz8.jpg',
					lowUrl: 'images/quiz3.jpg'
				},
				{
					id: 6,	
					title: '-В точку!',
					url: 'images/quiz.jpg',
					lowUrl: 'images/quiz4.jpg'
				}
				]
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
			title: 'Кто этот негодяй?',
			answers: [	
				{	
					id: 1,
					title: 'Джонни Дилленжер',
					isCorrect: false, // Только для теста
					points: 3, // Вес, для викторины
					mediaFromUser: false,
					mediaCategoryId: 1,
					mediaId: 1, // Айди гифки
					mediaTitle: '— Прекрасный выбор', // Для викторины
					mediaTitleRight: 'исходный правильный ответ',
					mediaTitleWrong: 'исходный неправильный ответ',
						
					
				},
				{	
					id: 2,
					title: 'Тони Монтана',
					isCorrect: true,
					points: 3,
					mediaFromUser: false,
					mediaCategoryId: 1,
					mediaId: 1,
					mediaTitle: '— Прекрасный выбор',
					mediaTitleRight: 'исходный правильный ответ',
					mediaTitleWrong: 'исходный неправильный ответ',
					
				},
				{	
					id: 3,
					title: 'Анатолий Монтанов',
					isCorrect: false,
					points: 3,
					mediaFromUser: false,
					mediaCategoryId: 1,
					mediaId: 1,
					mediaTitle: '— Прекрасный выбор',
					mediaTitleRight: 'исходный правильный ответ',
					mediaTitleWrong: 'исходный неправильный ответ',					
				}					
				],
			nextAnswerId: 4,
			config: {
				id: 2,
				category: 2,
				mediaFromUser: false,
				image: '',
				bgblur: 0,
				darkness: .9,
				compStyle: ' ',
				}
			},
			
			{
			id: 2,
			title: 'А что это за бандит?',
			answers: [	
				{	
					id: 1,
					title: 'Вито Карлеоне',
					isCorrect: false,
					points: 3,
					mediaFromUser: false,
					mediaId: 1,
					mediaCategoryId: 1,
					mediaTitle: '— Прекрасный выбор',
					mediaTitleRight: 'исходный правильный ответ',
					mediaTitleWrong: 'исходный неправильный ответ',					
				},
				{	
					id: 2,
					title: 'Аль Капоне',
					isCorrect: true,
					points: 3,
					mediaFromUser: false,
					mediaId: 1,
					mediaCategoryId: 1,
					mediaTitle: '— Прекрасный выбор',
					mediaTitleRight: 'исходный правильный ответ',
					mediaTitleWrong: 'исходный неправильный ответ',					
				}				
				],
			nextAnswerId: 3,
			config: {
				id: 3,
				category: 2,
				mediaFromUser: false,
				image: '',
				bgblur: 0,
				darkness: .6,
				compStyle: ' ',
				}
			}
			]
		var quizResults = [	
		{
			title: 'Батя игры',
			category: 1,
			mediaFromUser: false,
			description: 'Вы просто лучший знаток дикой природы Казахстана',
			points: 4,
			mediaId: 1,
		},
		{
			title: 'На уровне',
			category: 1,
			mediaFromUser: false,
			description: 'Саакашвили прорвал оцепление на границе Украины и прибыл на территорию страны Лишённого гражданства политика не остановили ни «заминированный» пропускной пункт, ни спецназ, ни запрет на въезд. 15 1 ',
			points: 3,
			mediaId: 1,
		},
		{
			title: 'Почти успех',
			category: 2,
			mediaFromUser: false,
			description: 'Стремитесь к успеху, так держать!',
			points: 2,
			mediaId: 1,
		},
		{
			title: 'Слабое звено',
			category: 2,
			mediaFromUser: false,
			description: 'Тут все ясно',
			points: 1,
			mediaId: 1,
		}
		]
		var testResults = [	
		{	
			id: 1,
			category: 1,
			mediaFromUser: false,
			title: 'Лучший',
			description: 'Великолепный результат',
			mediaId: 1,
		},
		{
			id: 2,
			category: 1,
			mediaFromUser: false,
			title: 'Почти лучший',
			description: 'Так держать, в дальнейшем вам обязательно повезет',
			mediaId: 2,
		},
		{
			id: 3,
			category: 2,
			mediaFromUser: false,
			title: 'Слабовато',
			description: 'Возвращайтесь, когда будете знать больше',
			mediaId: 3,
		},
		{
			id: 4,
			category: 2,
			mediaFromUser: false,
			title: 'Слабое звено',
			description: 'Вам тут не место',
			mediaId: 4,
		}		
		]
