Vue.component('media-item', {
    template:'\
    <div\
    @click="update()">\
        <div>\
            <input v-if="showTitle" :value="title" @input="inp($event.target.value)">\
        </div>\
    </div>\
    ',
    props: ['title', 'itemIndex', 'showTitle'],
    methods: {
        inp: function(value) {
            this.title = value
            this.$emit('update-item-title', value)
        },
        update: function() {
            this.$emit('upd', this.title);
            this.$emit('click')
        }
    }
})
