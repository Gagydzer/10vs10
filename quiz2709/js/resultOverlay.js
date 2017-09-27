Vue.component('result-overlay', {
    template: '\
    <div class="quiz_container result_media">\
        <button class="quiz_back_to_results" @click="$emit(\'media-result-watcher-off\', false)" title="Назад"></button>\
        <transition name="scale" :duration="400" appear>\
        <div class="quiz_resultimg_adm" :style="{ \'backgroundImage\': \'url(\' + imageUrl + \')\' }" ></div>\
        </transition>\
        <div class="quiz_result_content">\
            <transition name="slide-from-left" :duration="150" appear>\
                <div class="quiz_textcontent status"><span class="rang">{{ rang }}</span></div>\
            </transition>\
            <transition name="slide-from-left" :duration="200" appear>\
                <div class="quiz_textcontent"><span class="ratio">{{Math.round(totalAsks/2)}}/{{totalAsks}}</span> верно</div>\
            </transition>\
            <transition name="slide-from-left" :duration="250" appear>\
                <div class="quiz_textcontent">Лучше, чем 70% ответивших</div>\
            </transition>\
        </div>\
        <div class="quiz_content_container">\
            <div class="quiz_content_wrapper" v-for="(item, index) in content">\
                <div class="quiz_content"\
                :key="content.id"\
                @click="$emit(\'go-to\', item.id, item.category, item.url)" >\
                    <h1>{{ item.title }}</h1>\
                    <span>{{ item.description }}</span>\
                </div>\
                <div class="quiz_resultcontent_bg"\
                :style="{backgroundImage: \'url(\' + item.bgUrl + \')\'}">\
                </div>\
            </div>\
        </div>\
    </div>\
    ',
    props: ['imageUrl', 'rang', 'totalAsks', 'corectAsks', 'isShow', 'mediaResultWatcher', 'content']

})