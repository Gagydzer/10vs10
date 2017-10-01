Vue.component('result-overlay', {
    template: '\
    <div class="quiz_container result_media">\
        <button class="quiz_back_to_results" @click="$emit(\'media-result-watcher-off\', false)" title="Назад"></button>\
        <transition name="scale" :duration="400" appear>\
        <div class="quiz_resultimg_adm" :style="{ \'backgroundImage\': \'url(\' + imageUrl + \')\' }" ></div>\
        </transition>\
        <div class="quiz_result_content" :class="{ \'flag\': !flag }" >\
            <transition name="slide-from-left" :duration="150" appear>\
                <div class="quiz_textcontent status"><span class="rang">{{ rang }}</span></div>\
            </transition>\
            <transition name="scale" :duration="150" appear>\
            <div v-if="!isTest" class="quiz_textcontent"><span class="descr">{{ descr }}</span></div>\
            </transition>\
            <transition name="slide-from-left" :duration="200" appear>\
                <div class="quiz_textcontent"><span class="ratio">{{Math.round(totalAsks/2)}}/{{totalAsks}}</span> верно</div>\
            </transition>\
            <transition name="slide-from-left" :duration="250" appear>\
                <div class="quiz_textcontent">Лучше, чем 70% ответивших</div>\
            </transition>\
            <transition name="slide-from-left" :duration="250" appear>\
            <div class="quiz_textcontent"><span class="ratio">Поделиться</span></div>\
        </transition>\
        </div>\
        <div class="quiz_promo_container" v-if="flag">\
            <div class="quiz_promo_wrapper" v-for="(item, index) in promo">\
                <div class="quiz_promo_content"\
                :key="promo.id"\
                @click="$emit(\'go-to\', item.id, item.category, item.url)" >\
                    <span>{{ item.title }}</span>\
                </div>\
                <div class="quiz_promocontent_bg"\
                :style="{backgroundImage: \'url(\' + item.bgUrl + \')\'}">\
                </div>\
            </div>\
        </div>\
        <button\
        @click="addNewResult()" class="quiz_add_in_list" :class="fadeButton(results.length)">\
        Добавить Результат\
        </button>\
    </div>\
    ',
    props: ['imageUrl', 'rang', 'totalAsks', 'corectAsks', 'isShow', 'mediaResultWatcher', 'promo', 'descr', 'isTest', 'promo', 'currentPromo'],
    data: function () {
        return {
            flag: false
        }
    },
    methods: {
        addPromo: function () {

        }
    }

})