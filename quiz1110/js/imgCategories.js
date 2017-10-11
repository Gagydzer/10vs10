Vue.component('media-cats', {
    template:'\
    <div>\
        <div class="tools_tab" v-if="showTopBar">\
            <div v-if="categories[previosCategory - 1]" class="tools_tab_item" @click="chooseCategory(previosCategory - 1)"\>{{ categories[previosCategory - 1].title}}</div>\
            <div v-if="categories[previosCategory]" class="tools_tab_item" @click="chooseCategory(previosCategory)"\>{{ categories[previosCategory].title}}</div>\
            <div class="tools_tab_item active"\
            :key="currentCategoryIndex"\
            >{{ categories[currentCategoryIndex].title}}</div>\
            <div v-if="(categories[nextCategory])" class="tools_tab_item" @click="chooseCategory(nextCategory)"\>{{ categories[nextCategory].title}}</div>\
            <div v-if="(categories[nextCategory + 1])&&(count == 4)" class="tools_tab_item" @click="chooseCategory(nextCategory + 1)"\>{{ categories[nextCategory + 1].title}}</div>\
            <div class="tools_tab_item tools_tab_expand"\
            @click="isCatsActive = !isCatsActive">\
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">\
                <path fill="#ffffff" d="M22,4V2H2V4H11V18.17L5.5,12.67L4.08,14.08L12,22L19.92,14.08L18.5,12.67L13,18.17V4H22Z" />\
                </svg>\
            </div>\
    </div>\
        <div class="tools_tab_content">\
            <transition name="drop">\
            <div key="categories" class="quiz_mediacats_container"\
            v-if="isCatsActive">\
                <div class="quiz_mediacats_item"\
                @click="chooseCategory(index)"\
                v-for="(category, index) in categories">{{ category.title }}</div>\
            </div>\
            <div v-else class="tools_cats_mediacontent" key="currentCategoryIndex">\
                <transition name="slide">\
                <div :key="currentCategoryIndex">\
                    <vue-scrollbar classes="my-scrollbar" ref="Scrollbar" :speed="100" @scroll="$emit(\'scroll\')" :style="{maxHeight: customHeight + \'px\'}">\
                    <div class="scroll-me popup_mediacontainer" >\
                        <slot name="media"></slot>\
                        <div class="clearfix"></div>\
                    </div>\
                    </vue-scrollbar>\
                </div>\
                </transition>\
            </div>\
            </transition>\
        </div>\
    </div>\
    '
    ,
    props: {
        customHeight: {
            type: Number, 
            default: () => {return undefined}
        },
        showTopBar: {
            type: Boolean,
            default: () => {return true}
        },
        flag: {
            type: Boolean,
            default: () => {return true}
        },
        categories: {
            type: Array,
            default: () => {return undefined}
        },
        currentCategoryIndex: {
            type: Number,
            default: () => {return 0}
        },
        isExpand: {
            type: Boolean,
            default: () => {return true}
        },
        count: {
            type: Number,
            default: 3
        }
            },
    data: function () {
        return  { isCatsActive : false, isActive: false, indexOfActiveCategory: this.currentCategoryIndex}
    },
    computed: {
        previosCategory: function() {
            return this.currentCategoryIndex - 1
        },
        nextCategory: function () {
            return this.currentCategoryIndex + 1
        }
    },
    methods: {
        chooseCategory: function(value) {
            this.isActive = true;
            this.isCatsActive = false;
            this.indexOfActiveCategory = value;
            this.$emit('choose-category', value)
        }
    },
    watch: {
        flag: function (newValue) {
            this.isCatsActive = false
        }
    },
    components: {
        'vueScrollbar': Vue2Scrollbar
    }
})
