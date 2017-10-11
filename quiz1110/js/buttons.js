

    const DEF_CHECKED_COLOR = '#75C791'
    const DEF_UNCHEKED_COLOR = '#bfcbd9'
    
    const DEF_CHECKED_LABEL = 'on'
    const DEF_UNCHECKED_LABEL = 'off'
    
    const margin = 3
    
    const contains = (object, title) => {
      return typeof object === 'object' && object.hasOwnProperty(title)
    }

Vue.component('ToggleButton', {
template:'<label :class="className"\
       :style="style"\
       role="checkbox">\
  <input type="checkbox"\
         class="v-switch-input"\
         @change.stop="toggle">\
  <span class="v-switch-core"\
        :style="coreStyle"\
        :aria-checked="ariaChecked"></span>\
  <div v-if="labels">\
    <span class="v-switch-label v-left" v-if="toggled" v-html="labelChecked"></span>\
    <span class="v-switch-label v-right" v-else v-html="labelUnchecked"></span>\
  </div>\
</label>\
',

  name: 'ToggleButton',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    sync: {
      type: Boolean,
      default: false
    },
    color: {
      type: [String, Object],
      validator (value) {
        return typeof value === 'object'
          ? (value.checked || value.unchecked)
          : typeof value === 'string'
      }
    },
    labels: {
      type: [Boolean, Object],
      default: false,
      validator (value) {
        return typeof value === 'object'
          ? (value.checked || value.unchecked)
          : typeof value === 'boolean'
      }
    },
    height: {
      type: Number,
      default: 22
    },
    width: {
      type: Number,
      default: 50
    }
  },
  computed: {
    className () {
      let { toggled, disabled } = this

      return [
        'vue-js-switch',
        { toggled, disabled }
      ]
    },

    ariaChecked () {
      return this.toggled.toString()
    },

    style () {
      let { width, height } = this
      let distance = width - height + margin

      return {
        '--h': height + 'px',
        '--w': width + 'px',
        '--d': distance + 'px'
      }
    },

    colorChecked () {
      if (typeof this.color !== 'object') {
        return this.color || DEF_CHECKED_COLOR
      }

      return contains(this.color, 'checked')
        ? this.color.checked
        : DEF_CHECKED_COLOR
    },

    colorUnchecked () {
      return contains(this.color, 'unchecked')
        ? this.color.unchecked
        : DEF_UNCHEKED_COLOR
    },

    colorCurrent () {
      return this.toggled ? this.colorChecked : this.colorUnchecked
    },

    labelChecked () {
      return contains(this.labels, 'checked')
        ? this.labels.checked
        : DEF_CHECKED_LABEL
    },

    labelUnchecked () {
      return contains(this.labels, 'unchecked')
        ? this.labels.unchecked
        : DEF_UNCHECKED_LABEL
    },

    coreStyle () {
      return {
        'background-color': this.colorCurrent
      }
    }
  },
  watch: {
    value (value) {
      if (this.sync) {
        this.toggled = value
      }
    }
  },
  data () {
    return {
      toggled: this.value
    }
  },
  methods: {
    toggle (event) {
      this.toggled = !this.toggled
      this.$emit('input', this.toggled)
      this.$emit('change', { value: this.toggled, srcEvent: event })
    }
  }
})

