Vue.component('promo-cats', {
    template:'\
    <div>\
        <div class="tools_tab">\
            <div :class="[!isUserPromo ? \'active\' : \' \',  \'tools_tab_item\']"\
            @click="isUserPromo = false"\> Созданное</div>\
            <div :class="[isUserPromo ? \'active\' : \' \',  \'tools_tab_item\']"\
             @click="isUserPromo = true"\> Новый</div>\
    </div>\
        <div class="tools_tab_content">\
            <div class="tools_cats_mediacontent" key="currentCategoryIndex">\
                <transition name="slide">\
                <div :key="\'add\'" v-if="isUserPromo"><slot name="addPromo"></slot></div>\
                <div :key="\'create\'" v-else ><slot name="userPromo"></slot></div>\
                </transition>\
            </div>\
        </div>\
    </div>\
    '
    ,
    props: {
        getUserPromo: Boolean,
            },
    data: function () {
        return  { 
            isUserPromo: this.getUserPromo
        }
    },
    computed: {
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
        getUserPromo: function(newValue) {
            this.isUserPromo = newValue
        }
    }
})