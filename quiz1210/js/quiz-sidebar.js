Vue.component('quiz-sidebar', {
    template:'\
    <div class="slidebar"\ @click="$emit(\'hide-popup\')" :style="{height: windowHeight + \'px\'}">\
        <div class="slidebar_options">\
                <div class="sidebar_bodyoptions_wrapper">\
                    <div class="sidebar_bodyoptions ">\
                    <button title="Закрыть" class="delete_ans_button" v-on:click="$emit(\'close-sidebar\')"></button>\
                        <div class="sidebar_title">Настройки\
                        <transition name="update">\
                            <span v-if="updateWatcher" class="updateWatcher">Обновлены</span>\
                        </transition>\
                            </div>\
                        <div >\
                        <span class="sidebar_label sidebar_tagslabel">Теги</span>\
                        <br>\
                        <input-tag @upd-tags="updateTags(arguments)" :placeholder="\'Через запятую\'" :tags="tagsArray"></input-tag>\
                    </div>\
                        <div class="slidebar_controls_container">\
                            <span class="sidebar_label">Тип</span>\
                            <toggle-button\
                            :value="isTest"\
                            :sync="isTest"\
                            @change="updateIsTest($event.value)"\
                            :labels="{checked: \'Тест\', unchecked: \'Квиз\'}"\
                            :width="70"\
                            :height="28"\
                            ></toggle-button></template>\
                        </div>\
                        <div class="slidebar_controls_container">\
                            <span class="sidebar_label">Доступ</span>\
                            <div class="slidebar_controls">\
                            <stf-select v-model="isPrivateValue" :fixed="true" style="width: 221px; margin: 0 auto">\
                            <div slot="label">Input address</div>\
                            <div slot="value">\
                              <div>\
                                 <span>{{isPrivateValueTitle}}</span>\
                              </div>\
                            </div>\
                            <section class="options delivery_order__options">\
                                <stf-select-option  \
                                 :key="1"\
                                 :value="true"\
                                 :class="{\'stf-select-option_selected\': isPrivateValue}" \
                                 >\
                                    <span> Публичный</span>\
                                </stf-select-option>\
                                <stf-select-option  \
                                :key="2"\
                                :value="false"\
                                :class="{\'stf-select-option_selected\': !isPrivateValue}" \
                                >\
                                   <span> Приватный</span>\
                               </stf-select-option>\
                            </section>\
                          </stf-select>\
                            </div>\
                        </div>\
                        <div class="slidebar_controls_container">\
                                <span class="sidebar_label">Публикация</span>\
                                <div class="slidebar_controls">\
                                <stf-select v-model="isShareValue" :fixed="true" style="width: 221px; margin: 0 auto">\
                                <div slot="label">Input address</div>\
                                <div slot="value">\
                                  <div>\
                                     <span>{{isShareValueTitle}}</span>\
                                  </div>\
                                </div>\
                                <section class="options delivery_order__options">\
                                    <stf-select-option  \
                                     :key="11"\
                                     :value="true"\
                                     :class="{\'stf-select-option_selected\': isShareValue}" \
                                     >\
                                        <span>Опубликовать</span>\
                                    </stf-select-option>\
                                    <stf-select-option  \
                                    :key="22"\
                                    :value="false"\
                                    :class="{\'stf-select-option_selected\': !isShareValue}" \
                                    >\
                                       <span>В черновик</span>\
                                   </stf-select-option>\
                                </section>\
                              </stf-select>\
                                </div>\
                        </div>\
                        <div class="slidebar_controls_container">\
                        <span class="sidebar_label">Комментарии</span>\
                        <toggle-button\
                        :value="showComments"\
                        :sync="showComments"\
                        @change="updateShowComments($event.value)"\
                        :width="70"\
                        :height="28"\
                        ></toggle-button></template>\
                    </div>\
                    </div>\
                </div>\
            <div class="sidebar_categories_title">\
            <span class="sidebar_categories_title">Выберите категории ({{ currentCategoriesId.length }} из 3):</span>\
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
    props: ['isTest', 'categories', 'currentCategoriesId', 'isPrivate', 'isShare', 'keyWords', 'showComments'],
    
    data: function () {
        return {
            isPrivateValue: this.isPrivate,
            isShareValue: this.isShare,
            updateWatcher: false,
            tagsArray: this.keyWords,
            windowHeight: undefined}
    },
    computed: {
        isPrivateValueTitle() {
            if (this.isPrivateValue) return 'Публичный'
            else return 'Приватный'
        },
        isShareValueTitle() {
            if (this.isShareValue) return 'Опубликовать'
            else return 'В черновик'
        },
        windowHeight: function () {
            return this.windowHeight
        },
        categoriesHeight: function name(params) {
          return this.windowHeight - 436
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
            this.updateWatch();
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
            this.updateWatch();
            this.$emit('update-is-test', value);
        },
        updateShowComments: function(value) {
            this.updateWatch();
            this.$emit('update-show-comments', value);
        },
        updateTags: function (value) {
            this.updateWatch();
            this.tagsArray = value[0];
            this.$emit('keywords', this.tagsArray)
        },
        updateWatch: function(){
            this.updateWatcher = true;
            setTimeout( () => {this.updateWatcher = false}, 1000)
        }
    },
    mounted: function(){
        this.windowHeight = document.documentElement.clientHeight
    },
    watch: {
        keyWords: function(newValue) {
            this.tagsArray = JSON.parse(JSON.stringify(newValue));
        },
        isPrivateValue: function(newValue) {
            this.updateWatch();
            this.$emit('update-is-private', newValue);
        },
        isShareValue: function (newValue) {
            this.updateWatch();
            this.$emit('update-is-share', newValue);
        }
    }
})