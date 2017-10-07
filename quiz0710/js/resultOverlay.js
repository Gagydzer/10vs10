Vue.component('result-overlay', {
    template: '\
    <div class="quiz_container result_media"\
    @click.self="closePopUp()">\
        <div class="promo_share_container">\
        <div class="quiz_sharebutton"></div>\
        </div>\
        <button @click.self="closePopUp()" class="quiz_to_results back" @click="$emit(\'media-result-watcher-off\', false)" title="Назад"></button>\
        <transition name="scale" :duration="400" appear>\
        <div class="quiz_resultimg_adm" :style="{ \'backgroundImage\': \'url(\' + imageUrl + \')\' }" @click.self="closePopUp()"></div>\
        </transition>\
        <div class="quiz_result_content" @click="closePopUp()">\
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
        </div>\
        <div class="quiz_promo_container">\
            <div class="quiz_promo_wrapper" v-for="(item, index) in arr"\
            :class="promoClass(index)">\
                <div class="quiz_promo_content"\
                :key="item.id"\
                @click.self="item.id == -1 ? addPromo(index) : clickPromo(item, index)" >\
                <button v-if="item.id != -1" @click="deletePromo(index)" class="delete_promo"></button>\
                    <div @click.self="item.id == -1 ? addPromo(index) : clickPromo(item, index)"> {{ item.title }} </div>\
                </div>\
                <div class="quiz_promocontent_bg"\
                :style="{backgroundImage: \'url(\' + item.bgUrl + \')\'}">\
                </div>\
            </div>\
        </div>\
    </div>\
    ',
    props: [
        'imageUrl', 
        'rang', 
        'totalAsks', 
        'corectAsks', 
        'isShow', 
        'mediaResultWatcher',
        'userPromo', 
        'promo',
        'promoList', 
        'descr', 
        'isTest', 
        'promo', 
        'currentPromo'
    ],
    data: function () {
        return {
            flag: false,
            voidItem: {
                id: -1,
                category: 1,
                url: '',
                fromUser: false,
                title: 'Пустой итем',
                description: 'Сможете ли вы отличить факты от вымысла..',
                bgUrl: 'images/content1.jpg'
            },
            currentArrIndex: undefined
        }
    },
    computed: {
        arr: function() {
            var arr = [];
            this.promoList.forEach( (element) => {
                if (element.fromUser) {
                    arr.push(this.userPromo.getItemById(element.id))
                }
                else arr.push(this.promo.getItemById(element.id))
            });
            if (promoList.length < 3) {
                arr.push(this.voidItem)
            }
            return arr
        }
    
    },
    methods: {
        clickPromo: function (item, index) {
            this.currentArrIndex = index;
            this.updateIndex(index);
            this.$emit('array', this.arr.length, index)
            return this.$emit('edit-promo', item.id, item.fromUser)
            
        },
        updateIndex: function(index) {
            return this.$emit('index', index)
        },
        addPromo: function(index) {
            this.currentArrIndex = index;
            this.currentArrIndex
            this.$emit('array', this.arr.length, index)
            this.$emit('click-void-promo');
            this.updateIndex(-1);
        },
        deletePromo: function(index) {
            let id = this.arr[index].id;
            let fromUser = this.arr[index].fromUser;
            return this.$emit('delete-promo', id, fromUser, index)
        },
        closePopUp: function () {
            this.$emit('close-promo-popup')
        },
        promoClass: function (index) {
            let selected 
            let quiz
            if (index == this.currentArrIndex)  selected = 'selected'
            else selected = '';
            if (!this.isTest) quiz = 'is_quiz'
            else quiz = ''
            return selected + ' ' + quiz
        }

    },
    watch: {
        arr: function (newValue) {
            this.$emit('array', this.arr.length, this.currentArrIndex)
        }
    }
        

})