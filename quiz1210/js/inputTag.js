const validators = {
    email: new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    url : new RegExp(/^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i),
    text : new RegExp(/^[a-zA-Z]+$/),
    digits : new RegExp(/^[\d() \.\:\-\+#]+$/),
    isodate : new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/)
  }
  /*eslint-enable*/

Vue.component('InputTag', { 
    template: '\
    <div @click="focusNewTag()" v-bind:class="{\'read-only\': readOnly}" class="vue-input-tag-wrapper">\
    <span v-for="(tag, index) in tempTags" v-bind:key="index" class="input-tag">\
      <span>{{ tag }}</span>\
      <a v-if="!readOnly" @click.prevent.stop="remove(index)" class="remove"></a>\
    </span>\
    <input v-if="!readOnly" v-bind:placeholder="placeholder" type="text" v-model="newTag" v-on:keydown.delete.stop="removeLastTag()" v-on:keydown.enter.188.tab.prevent.stop="addNew(newTag)" class="new-tag"/>\
  </div>',
  props: {
    tags: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    validate: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      tempTags: this.tags,
      newTag: ''
    }
  },
  methods: {
    focusNewTag () {
      if (this.readOnly) { return }
      this.$el.querySelector('.new-tag').focus()
    },
    addNew (tag) {
      if (tag && this.tempTags.indexOf(tag) === -1 && this.validateIfNeeded(tag)) {
        this.tempTags.push(tag)
        this.tagChange()
      }
      this.newTag = ''
    },
    validateIfNeeded (tagValue) {
      if (this.validate === '' || this.validate === undefined) {
        return true
      } else if (Object.keys(validators).indexOf(this.validate) > -1) {
        return validators[this.validate].test(tagValue)
      }
      return true
    },
    remove (index) {
      this.tempTags.splice(index, 1)
      this.tagChange ()
    },
    removeLastTag () {
      if (this.newTag) { return }
      this.tempTags.pop()
      this.tagChange()
    },
    tagChange () {
      this.$emit('upd-tags', this.tempTags)
    }
  },
  watch: {
   tags: function (newValue) {
    var self = this
    let arr = JSON.parse(JSON.stringify(self.tags))
    this.tempTags = arr
   }
  }   
})