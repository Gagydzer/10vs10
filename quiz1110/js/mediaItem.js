Vue.component('media-item', {
    template:'\
    <div\
    @click="update()">\
        <div style="height: 100%" v-if="showPanel">\
            <input :disabled="disabled" v-if="showTitle" :value="title" @input="inp($event.target.value)">\
        </div>\
    </div>\
    ',
    props: {
        showPanel: {
            type: Boolean,
            default: () => {return true}
        },
        disabled: {
            type: Boolean,
            default: () => {return false}
        },
        title: {
            type: String,
            default: () => {return ''}
        },
        itemIndex: {
            type: Number,
            default: () => {return 0}
        },
        showTitle: {
            type: [Boolean,String],
            default: () => {return true}
        }
    },
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
