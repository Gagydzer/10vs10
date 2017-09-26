

Vue.component('item', {
    template:'\
    <li\
    v-on:click.self="$emit(\'asktools\')"\
    >\
    <input\
	maxlength="50"\
    v-bind:value="title"\
    v-on:click.self="$emit(\'asktools\')"\
    v-on:input="updateTitle($event.target.value)"\
    v-on:keyup.enter="$emit(\'add\')"\
    v-bind:key="index"\
    placeholder="Напишите ответ"\
    name="zaglushka"\
    class="quiz_ans" >\
    <div class="numbers" v-on:click.self="$emit(\'asktools\')">\
    <span v-if="testResultsIntervals">{{ testResultsIntervals[index] }}</span>\
    <button title="Удалить ответ на вопрос" class="delete_ans_button" v-on:click="$emit(\'remove\')"></button>\
    </div>\
    </li>\
    ',
    props: ['title', 'askIndex', 'index', 'isTest', 'points', 'results', 'testResultsIntervals'],
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
    
})

