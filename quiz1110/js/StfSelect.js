const throttle = _.throttle

class EventHub {
    constructor () {
        this.eventsCollection = {};
    }

    $emit(name, event) {
        if (this.eventsCollection[name] && this.eventsCollection[name][0]) {
            for (let callback of this.eventsCollection[name]) {
                setTimeout(() => callback(event), 0);
            }
        }
    }

    $on(name, callback) {
        if (typeof callback === 'function') {
            if (!this.eventsCollection[name]) {
                this.eventsCollection[name] = [];
            }

            if (this.eventsCollection[name].indexOf(this.eventsCollection[name]) === -1) {
                this.eventsCollection[name].push(callback);
            } else {
                throw new ArgumentExceptions(`Callback can not be used twice`); 
            }
        } else {
            throw new ArgumentExceptions(`Callback can not be ${typeof callback} event ${name}`); 
        }
    }

    $off(name, callback) {
        if (typeof callback === 'function') {
            if (!this.eventsCollection[name]) {
                throw new ArgumentExceptions(`You don't have callback on ${name} event ${name}`); 
            }

            const index = this.eventsCollection[name].indexOf(callback);
            this.eventsCollection[name].splice(index, 1);
        } else {
            throw new ArgumentExceptions(`Callback can not be ${typeof callback} event ${name}`); 
        }
    }
}

function ArgumentExceptions(message) {
    this.message = message;
    this.name = "Argument exception";
}

const eventHub = new EventHub();

function getOffset(obj) {
    let rect;
    let win;
    const elem = obj;
  
    if (!elem) {
      return;
    }
  
    // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
    // Support: IE <=11 only
    // Running getBoundingClientRect on a
    // disconnected node in IE throws an error
    if (!elem.getClientRects().length) {
      return { top: 0, left: 0 };
    }
  
    // Get document-relative position by adding viewport scroll to viewport-relative gBCR
    rect = elem.getBoundingClientRect();
    win = elem.ownerDocument.defaultView;
    return {
      top: rect.top + win.pageYOffset,
      left: rect.left + win.pageXOffset
    };
  }
  
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
  
 function hasPositioFixedAncestor(el) {
    while (el) {
      if (
        window.getComputedStyle(el, null).getPropertyValue('position') === 'fixed'
      ) {
        return true;
      }
      el = el.parentElement;
    }
    return false;
  }
  
  function isMob() {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    } else {
      return false;
    }
  }
  
  function triggerEvent(el, eventName, options) {
    var event;
    if (window.CustomEvent) {
      event = new CustomEvent(eventName, options);
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(eventName, true, true, options);
    }
    el.dispatchEvent(event);
  }
  
  function hasClass(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
  }
  
  function addClass(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else if (!hasClass(el, className)) {
      el.className += ' ' + className;
    }
  }
  
  function removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else if (hasClass(el, className)) {
      var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
      el.className = el.className.replace(reg, ' ');
    }
  }
  
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function(s) {
        const matches = (this.document || this.ownerDocument).querySelectorAll(s);
        let i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
      };
  }

Vue.component('stf-select', {

    template: '\
    <div\
    :class="{ \'stf-select_has-value\': value !== null && value !== undefined ? true : false, \'stf-select_opened\': isOpened, \'stf-select_empty\': !options || !options.length}"\
    @keydown="keyDown" \
    @keypress="keyPress"\
    @click.stop="open"\
    @unblur="onUnblur"\
    class="stf-select stf-select_sm">\
    <div class="stf-select__container">\
        <div class="stf-select__inner-wrapper">\
            <div class="stf-select__value">\
                <slot name="value"></slot>\
            </div>\
            <div class="stf-select__placeholder">\
                <slot name="label"></slot>\
            </div>\
        </div>\
        <div :tabindex="isOpened ? -1 : 0" @focus="onSelectFocus" class="stf-select__search-input">\
            <slot name="search-input"></slot>\
        </div>\
        <div :select-id="idSelect" :class="{\'stf-select_opened\': isOpened, \'stf-select_empty\': !options || !options.length}"\
            @keydown="keyDown"  class="stf-select__options-wraped">\
            <div v-if="!isNeedHideOption" class="stf-select__options stf-select-options"\
                @mousewheel="onMouseWheal"\
                @scroll="loadMore"\
                role="combobox" aria-haspopup="true" aria-expanded="false"\
            >\
                <div class="stf-select__options-container">\
                    <slot></slot>\
                </div>\
            </div>\
        </div>\
    </div>\
</div>\
    ',  created() {
        this.idSelect = "s" + (Date.now() * Math.random()).toString().replace(".", "_");
        this._optionSelectedCallback = (event) => {
            if (event.selectId === this.idSelect) {
                this._close();
                this.$emit('input', event.value);
                const searchInpitEl = this.$el.querySelector(".stf-select__search-input");
                this._beforeSetValueFocus = true;
                searchInpitEl && searchInpitEl.focus();
                this._beforeSetValueFocus = false;
            }
            if (event.selectId !== this.idSelect) {
                this._close();
            }
        };
        this._onOptionMounted = (event) => {
            if (event.selectId === this.idSelect) {
                this.options.push(event.option);
            }
        };
        this._onOptionDestroyed = (event) => {
            if (event.selectId === this.idSelect) {
                let index = this.options.indexOf(event.option);
                if (index !== -1) {
                    this.options.splice(index, 1);
                }
            }
        };
        this._onOpenedSelect = (event) => {
            if (event.idSelect !== this.idSelect) {
                this._close();
            }
        };
        eventHub.$on('stf-select-option.selected', this._optionSelectedCallback);
        eventHub.$on("stf-select-option.mounted", this._onOptionMounted);
        eventHub.$on("stf-select-option.destroyed", this._onOptionDestroyed);
        eventHub.$on("stf-select.opened", this._onOpenedSelect);
    },
    data() {
        return {
            message: 'Hello Vue!',
            isOpened: false,
            idSelect: "",
            isNeedHideOption: false,
            hasAncesroFixed: false,
            options: [],
        };
    },
    beforeDestroy() {
        document.body.removeChild(this.__selectOptionsWrapEl);
        window.removeEventListener("resize", this._runOnResize);
        window.removeEventListener("scroll", this._runOnScroll);
        window.removeEventListener("click", this._runOnWindowClick);
        eventHub.$off('stf-select-option.selected', this._optionSelectedCallback);
        eventHub.$off('stf-select-option.mounted', this._onOptionMounted);
        eventHub.$off("stf-select-option.destroyed", this._onOptionDestroyed);
        eventHub.$off("stf-select.opened", this._onOpenedSelect);
        if (this._optionsMutationObserver) {
            this._optionsMutationObserver.disconnect();
        }
    },
    mounted() {
        this.__selectOptionsWrapEl = this.$el.querySelector(".stf-select__options-wraped");
        this.__selectOptionsEl = this.$el.querySelector(".stf-select__options");
        document.body.appendChild(this.__selectOptionsWrapEl);
        this.__selectContainerEl = this.$el.querySelector(".stf-select__container");
        this._addwidowResizeListener();
        this._addOutClickListener();
        this._initOnChangeDetection();
        this._addwidowScrollListener();
        this._isMob = isMob();
        this._inputEl = this.$el.querySelector("input");
    },
    methods: {
        keyDown(event) {
            switch (event.keyCode) {
                case 40:
                    this._keyArrowDown(event);
                    break;
                case 38:
                    this._keyArrowUp(event);
                    break;
                case 27:
                    this._close();
                    const searchInpitEl = this.$el.querySelector(".stf-select__search-input");
                    searchInpitEl && searchInpitEl.focus();
                    break;
                case 13:
                    if (!this.isOpened) {
                        this._open();
                    } else if (!this.value) {
                        const option = document.querySelector(`.stf-select__options-wraped[select-id="${this.idSelect}"] .stf-select-option`);
                        if (option) {
                            option.click();
                        }
                    } else {
                        this._close();
                    }
                    break;
                case 9:
                    setTimeout(() => this._close(), 100);
                    break;
                default: {
                    if (this._inputEl && (this._inputEl !== document.activeElement)) {
                    }
                }
            }
        },
        keyPress(event) {
            if (
                event.keyCode !== 40 && event.keyCode !== 38 &&
                event.keyCode !== 27 && event.keyCode !== 13 && event.keyCode !== 9 &&
                this._inputEl && this._inputEl !== document.activeElement
            ) {
                this.isOpened = true;
                addClass(this.$el, 'stf-select_opened');
                this.hasAncesroFixed = hasPositioFixedAncestor(this.$el);
                eventHub.$emit('stf-select-option.opened', {
                    selectId: this.idSelect
                });
                setTimeout(() => {
                    this._inputEl && this._inputEl.focus();
                }, 100);
                this._calculatePositionAnsSize();
                event = event || window.event;
                let charCode = event.which || event.keyCode;
                let charTyped = String.fromCharCode(charCode);
                if ((/[\wА-Яа-яїєЇЄь]/).test(charTyped)) {
                    this._inputEl.value = charTyped;
                } else {
                    this._inputEl.value = '';
                }
                let eventntInput = new Event('input');
                this._inputEl.dispatchEvent(eventntInput);
                eventHub.$emit("stf-select.opened", { idSelect: this.idSelect });
            }
        },
        onUnblur() {
        },
        onMouseWheal(event) {
            if ((this.__selectOptionsEl.scrollTop >= (this.__selectOptionsEl.scrollHeight - this.__selectOptionsEl.offsetHeight) && event.deltaY > 0) || ((this.__selectOptionsEl.scrollTop === 0) && event.deltaY < 0)) {
                event.preventDefault();
            }
            this.loadMore();
        },
        onSelectFocus(event) {
            if (this.needFocusInpOnTab && !this._beforeSetValueFocus) {
                this._open();
            }
        },
        open(event) {
            this._open();
            event.preventDefault();
            event.stopPropagation();
        },
        openClose() {
            this.isOpened = !this.isOpened;
            if (this.isOpened) {
                this._open();
            } else {
                this._close();
            }
        },
        loadMore: throttle(loadMore, 100),
        _calculatePositionAnsSize() {
            if (!this.isOpened) {
                return;
            }
            const optionsHeight =
                (this.__selectOptionsEl &&
                    this.__selectOptionsEl.getBoundingClientRect &&
                    this.__selectOptionsEl.getBoundingClientRect().height) ||
                0;
            const containerOffset = getOffset(this.__selectContainerEl);
            if (
                (window.innerHeight ||
                    document.documentElement.clientHeight ||
                    document.body.clientHeight) +
                window.pageYOffset >
                containerOffset.top +
                this.__selectContainerEl.clientHeight +
                optionsHeight
            ) {
                this.hasAncesroFixed = hasPositioFixedAncestor(this.$el);
                this.__selectOptionsEl.style.position = this.fixed ? 'absolute' : 'fixed';
                this.__selectOptionsEl.style.top = containerOffset.top + this.__selectContainerEl.offsetHeight + 'px';
                this.__selectOptionsEl.style.left = containerOffset.left + 'px';
                this.__selectOptionsEl.style.width = this.__selectContainerEl.offsetWidth + 'px';
            } else {
                this.hasAncesroFixed = hasPositioFixedAncestor(this.$el);
                this.__selectOptionsEl.style.position = this.hasAncesroFixed ? 'fixed' : 'absolute';
                this.__selectOptionsEl.style.top = containerOffset.top - this.__selectContainerEl.clientHeight - 1 - optionsHeight + this.__selectContainerEl.offsetHeight + 'px';
                this.__selectOptionsEl.style.left = containerOffset.left + 'px';
                this.__selectOptionsEl.style.width = this.__selectContainerEl.offsetWidth + 'px';
            }
        },
        _addwidowResizeListener() {
            const vm = this;
            this._runOnResize = function(evt) {
                if (!vm._isMob) {
                    vm._close();
                }
            };
            window.addEventListener("resize", this._runOnResize);
        },
        _addwidowScrollListener() {
            const vm = this;
            this._runOnScroll = throttle(function(evt) {
                vm._calculatePositionAnsSize();
            }, 100);
            window.addEventListener("scroll", this._runOnScroll);
        },
        _addOutClickListener() {
            const vm = this;
            this._runOnWindowClick = function(evt) {
                vm._close();
            };
            window.addEventListener("click", this._runOnWindowClick);
        },
        _initOnChangeDetection() {
            if (!MutationObserver) {
                return;
            }
            this._optionsMutationObserver = new MutationObserver(
                throttle(() => {
                    this._calculatePositionAnsSize();
                }, 100)
            );
            const config = { subtree: true, childList: true };
            this._optionsMutationObserver.observe(this.__selectOptionsEl, config);
        },
        _open() {
            this.isOpened = true;
            eventHub.$emit('stf-select-option.opened', {
                selectId: this.idSelect
            });
            addClass(this.$el, 'stf-select_opened');
            const inputEl = this.$el.querySelector("input");
            if (inputEl !== document.activeElement) {
                if (inputEl) {
                    inputEl.focus();
                    inputEl.select();
                } else {
                    const searchInpitEl = this.$el.querySelector(".stf-select__search-input")
                    if (searchInpitEl && searchInpitEl !== document.activeElement) {
                        searchInpitEl.focus();
                    }
                }
            }
            this._calculatePositionAnsSize();
            this._inputEl = this.$el.querySelector("input");
            eventHub.$emit("stf-select.opened", { idSelect: this.idSelect });
        },
        _close() {
            this.isOpened = false;
            this._inputEl = this.$el.querySelector("input");
        },
        _keyArrowDown(event) {
            const elements = this._getArrayElementForFocus();
            const currentFocusedIndex = this._getCurentFocuseIndex(elements);
            let next = currentFocusedIndex === undefined ? 0 : (currentFocusedIndex + 1);
            if (next >= (elements && elements.length)) {
                next = 0;
            }
            setTimeout(() => elements[next] && elements[next].focus(), 100);
            event.stopPropagation();
            event.preventDefault();
        },
        _keyArrowUp(event) {
            const elements = this._getArrayElementForFocus();
            const currentFocusedIndex = this._getCurentFocuseIndex(elements);
            let prev = currentFocusedIndex === undefined ? -1 : (currentFocusedIndex - 1);
            if (prev < 0) {
                if (elements.length) prev = elements.length - 1;
            }
            setTimeout(() => elements[prev] && elements[prev].focus(), 100);
            event.stopPropagation();
            event.preventDefault();
        },
        _getArrayElementForFocus() {
            const elements = [];
            elements.push(...this.$el.querySelectorAll('input'));
            elements.push(...document.querySelectorAll(`[select-id="${this.idSelect}"] .stf-select-option`));
            return elements;
        },
        _getCurentFocuseIndex(elements) {
            for (let key in elements) {
                if (elements[key] === document.activeElement) {
                    return +key;
                }
            }
            return undefined;
        }
    },
    props: {
        fixed: {
            type: Boolean,
            default: false
        },
        value: [Object, Number, String, Array, Boolean],
        more: Boolean,
        pending: Boolean,
        optionsWrapClass: String,
        needFocusInpOnTab: {
            type: Boolean,
            default: false
        },
    },
})
function loadMore() {
    if (!this.pending && this.more &&
        this.__selectOptionsEl.scrollTop > ((this.__selectOptionsEl.scrollHeight - this.__selectOptionsEl.offsetHeight) * 0.66)
    ) {
        this.$emit('loadMore', {});
    }
}