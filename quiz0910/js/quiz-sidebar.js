Vue.component('quiz-sidebar', {
    template:'\
    <div class="slidebar"\>\
        <div class="slidebar_options">\
                <div class="sidebar_bodyoptions_wrapper">\
                    <div class="sidebar_bodyoptions">\
                        <div class="sidebar_title">Настройки теста</div>\
                        <div>\
                        <span class="sidebar_label">Теги</span>\
                        <br>\
                        <input\
                        maxlength="50"\
                        v-bind:value="keyWordsSpliced"\
                        v-on:input="updateKeywords($event.target.value)"\
                        v-on:keyup.enter="$emit(\'add\')"\
                        v-bind:key="\'tags\'"\
                        class="quiz_slidebar_input" >\
                    </div>\
                        <div>\
                            <span class="sidebar_label">Тип теста</span>\
                            <toggle-button\
                            :value="isTest"\
                            :sync="isTest"\
                            @change="updateIsTest($event.value)"\
                            :labels="{checked: \'Тест\', unchecked: \'Квиз\'}"\
                            :width="110"\
                            :height="25"\
                            ></toggle-button></template>\
                        </div>\
                        <div>\
                            <span class="sidebar_label">Доступ</span>\
                            <toggle-button\
                            :value="isPrivate"\
                            :sync="isPrivate"\
                            @change="updateIsPrivate($event.value)"\></toggle-button>\
                        </div>\
                        <div>\
                            <span class="sidebar_label">Расшарить</span>\
                            <input type="checkbox"\
                            :checked="isShare"\
                            @change="updateIsShare($event.value)">\
                        </div>\
                    </div>\
                </div>\
            <div class="sidebar_categories_title">\
            <span>Выберите категории ({{ currentCategoriesId.length }} из 3):</span>\
            </div>\
        </div>\
        <media-cats\
        :custom-height="categoriesHeight"\
        key="media-tools"\
        :show-top-bar="false"\
        class="sidebar_categories"\
        @choose-category="updateCurrentMediaCategoryId(arguments)">\
            <template slot="media">\
                <media-item\
                :disabled="true"\
                :key="\'media-tools\' + index"\
                show-title="true"\
                :title="item.title"\
                :item-index="index"\
                v-for="(item, index) in tempCategories"\
                :class="[item.isChecked ? \'currentmedia\' : \' \',  \'popup_mediaconntent_wrap\']"\
                :style="{background: \'url(\' + item.lowUrl + \') center no-repeat\'}"\
                @click="updateCategories(item.id)"\
                />\
            </template>\
        </media-cats>\
    </div>\
    ',
    props: ['isTest', 'categories', 'currentCategoriesId', 'isPrivate', 'isShare', 'keyWords'],
    data: function () {
        return {windowHeight: undefined}
    },
    computed: {
        categoriesHeight: function name(params) {
          return this.windowHeight - 363  
        },
        keyWordsSpliced: function() {
            let arr = [];
            this.keyWords.forEach((element) => {
                arr.push(element)
            });
            let stringWords = arr.join(', ')
            return stringWords
        },
        tempCategories: function() {
            let arr = [];
            var self = this;
            let temparr = JSON.parse(JSON.stringify(self.categories));
            temparr.forEach((element, index) => {
                let id = element.id;
                let isChecked;
                this.currentCategoriesId.forEach(
                    (element) => {
                        if (element == id) isChecked = true
                    }
                )
                arr.push(element);
                arr[index].isChecked = Boolean(isChecked);
                isChecked = false;
            })
            return arr
        },
        tempCurrentCategoriesId: function() {
            let self = this;
            let temparr = JSON.parse(JSON.stringify(self.currentCategoriesId));
            return temparr
        }
    },
    methods: {
        updateCategories: function(value) {
            let arr = [];
            let isChecked;
            this.tempCurrentCategoriesId.forEach( (element, index, arr) => {
                if (element == value) {
                    arr.splice(index, 1)
                    isChecked = true
                }
            });
            if (this.currentCategoriesId.length < 3) {
                if (!isChecked) this.tempCurrentCategoriesId.push(value)
            }
            this.$emit('update-current-categories-id', this.tempCurrentCategoriesId)
        },
        updateIsTest: function(value) {
            this.$emit('update-is-test', value);
        },
        updateIsPrivate: function(value) {
            this.$emit('update-is-private', value);
        },
        updateIsShare: function(value) {
            var isShare = !this.isShare;
            this.$emit('update-is-share', isShare);
        },
        updateKeywords: function (value) {
            let arr = value.split(', ');
            this.$emit('update-tags', arr)
        }
    },
    mounted: function(){
        this.windowHeight = document.documentElement.clientHeight
    }
})