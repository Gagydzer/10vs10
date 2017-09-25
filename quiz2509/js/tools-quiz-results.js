//внешняя функция добавления пользовательской картинки
var addUserResultImg = function addUserImg(){
    var mediaObject = {};
    mediaObject.url = 'images/quiz' + Math.floor((Math.random()*(9-2))+2) + '.jpg';
    return mediaObject
	}
Vue.component('tools-results', {
    template:'\
    <transition name="popupshow">\
    <div\
    v-show="showpopup"\
    v-bind:key="currentResult"\
    class="quiz_result_popup" style="position: absolute" v-bind:style="{top : shift + \'px\'}">\
    <textarea maxlength="150" :value="description" @input="updateDescription($event.target.value)"></textarea>\
    <div class="popup_mediacontainer">\
        <div class="popup_mediacontainer_wrapper">\
            <div class="popup_mediacontainer">\
                <div @click="addUserImg()" class="popup_mediaconntent_wrap addnew">\
                    <div class="popup_mediaconntent"></div>\
                </div>\
                <div\
                v-for="(item, index) in reversedMedia"\
                :class="[item.id == results[currentResult].mediaId ? \'currentmedia\' : \' \',  \'popup_mediaconntent_wrap\']"\
                :style="{background: \'url(\' + item.url + \') center no-repeat\'}"\
                v-on:click="updateImg(item.id)"\
                ><div class="popup_mediaconntent"></div></div>\
                <div :class="[results[currentResult].mediaId == \'none\' ? \'currentmedia\' : \' \',  \'popup_mediaconntent_wrap none\']"\
                v-on:click="updateImg(\'none\')">\
                    <div class="popup_mediaconntent"></div>\
                </div>\
            </div>\
        </div>\
    </div>\
    </div>\
    </transition>\
    ',
    props: ['currentResult', 'results', 'nextresultindex', 'showpopup', 'asks', 'isTest', 'showCover', 'media' ],
    computed: {
            reversedMedia: function (){
                var self = this;
                return JSON.parse(JSON.stringify(self.media)).reverse()
            },
            shift: function () {
                var cover;
                var test;
                if (this.isTest) {test = 70} 
                else {test = 0}
                if (this.showCover) {var cover = 600 }
                else {var cover = -10}
                var preComputed = (+cover+(this.asks)*630 + - test + 187-(-51*(this.currentResult)+51*(this.nextresultindex)))	
                return preComputed		
            },
            description: function () {					
                return (this.results[this.currentResult].description)					
            }
        
    },	
    methods: {
        updateDescription: function(value) {		
            return this.$emit('update:value', value, this.isTest); 
            },
        updateImg: function(value) { //item.id
            this.results[this.currentResult].mediaId = value;
            return this.$emit('update-media-result', this.currentResult, value)
            },
        addUserImg: function() {
            if (addUserResultImg()) {
                var lastMediaId = this.media[this.media.length - 1].id;
                var userMediaObject = addUserResultImg();
                userMediaObject.id = lastMediaId + 1;
                this.media.push(userMediaObject);
                this.$emit('add-user-media', 'mediaBgs', this.media);     
            }
            else {alert('смотри tools-bg.js')}
        }
    }
}) 
