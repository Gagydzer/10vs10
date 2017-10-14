function findAncestor(el, sel) {
    if (typeof el.closest === 'function') {
      return el.closest(sel) || null;
    }
    while (el) {
      if (el.matches(sel)) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  }

Vue.component('stf-select-option', { 
    template: '\
    <div tabindex="0"  class="stf-select-option"\
    @click="selectValue"\
    @keydown="keyDown"\
    >\
    <slot></slot>\
    </div>\
    ',
    data() {
        return {
            selectId: "",
            isSelected: false
        };
    },
    beforeDestroy() {
        eventHub.$emit("stf-select-option.destroyed",
            {
                option: this,
                selectId: this.selectId,
            }
        );
    },
    methods: {
        selectValue() {
            eventHub.$emit("stf-select-option.selected",
                {
                    value: this.value,
                    selectId: this.selectId,
                }
            );
            this.isSelected = true;
        },
        keyDown(event) {
            switch (event.keyCode) {
                case 13:
                    this.selectValue();
                    event.preventDefault();
                    event.stopPropagation();
                    break;
            }
        }
    },
    mounted() {
        const el = findAncestor(this.$el, '.stf-select__options-wraped');
        if (el) {
            this.selectId = el.getAttribute("select-id");
        }
        eventHub.$emit("stf-select-option.mounted",
            {
                option: this,
                selectId: this.selectId,
            }
        );
    },
    props: [
        'value',
    ]

})