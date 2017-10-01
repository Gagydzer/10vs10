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
    class="quiz_result_popup" v-bind:style="{top : shift + \'px\', left : shiftY + \'px\'}">\
            <div class="popup_container_for_containers">\
            <media-cats\
            key="media-tools-result"\
            :current-category-index="currentCategoryIndex"\
            @choose-category="updateCurrentMediaCategoryId(arguments)"\
            :categories="mediaCategories"\
            :flag="closeToolsCategories"\
            >\
                <div slot="media" class="popup_mediacontainer_wrapper">\
                    <div class="popup_mediacontainer_wrapper_wrapper">\
                        <div class="popup_mediacontainer">\
                        <media-item :key="\'media-tools-add\'" @click="addUserMedia()" class="popup_mediaconntent_wrap addnew" />\
                        <media-item \
                        :show-title="false"\
                        :key="\'media-tools-result\' + index"\
                        v-for="(item, index) in reversedConcatedMedia"\
                        :class="[item.id == mediaIdforArray ? \'currentmedia\' : \' \',  \'popup_mediaconntent_wrap\']"\
                        :style="{background: \'url(\' + item.url + \') center no-repeat\'}"\
                        v-on:click="updateImg(index)" />\
                        <div class="popup_scroll_oweflow"></div>\
                        <div class="popup_bottom_oweflow"></div>\
                        </div>\
                    </div>\
                </div>\
            </media-cats>\
            </div>\
        <div class="popup_form">\
            <textarea maxlength="150" :value="description" @input="updateDescription($event.target.value)"></textarea>\
        </div>\
    </div>\
    </transition>\
    ',
    props: [
        'userMedia',
        'mediaCategories', 
        'currentResult', 
        'results', 
        'nextResultIndex', 
        'showpopup', 
        'asks', 
        'isTest', 
        'showCover',
        'closeToolsCategories',
        'mediaResultWatcher'
    ],
    data: function() { return { mediaIndx : false, 
        tempCategoryId: ''}
    },
    computed: {
            mediaIdforArray: function() {
                if (this.tempCategoryId == this.results[this.currentResult].category) {
                    return this.getFakeArrayId(this.results[this.currentResult].mediaId, this.results[this.currentResult].category, this.results[this.currentResult].mediaFromUser)
                }
                else return ''
                
            },
            userMediaFiltred: function () {
                return this.userMedia.filterByCategoryId(this.tempCategoryId)
            },
            concatedMedia: function () {
                var self = this;
                var media = JSON.parse(JSON.stringify(self.currentCategory))
                var lastId = media[media.length - 1].id           
                console.log(lastId)
                var userMedia = JSON.parse(JSON.stringify(self.userMediaFiltred))
                userMedia.forEach((item) => {item.id = ++lastId});
                return media.concat(userMedia)
            },
            reversedConcatedMedia: function (){
                var self = this;
                return JSON.parse(JSON.stringify(self.concatedMedia)).reverse()
            },
            shiftY: function name(params) {
                if (this.mediaResultWatcher) return 25
                else return -135  
            },
            shift: function () {
                var cover;
                var test;
                if (this.isTest) {
                    if (this.nextResultIndex == 5) plusTest = 231;
                    if (this.nextResultIndex == 4) plusTest = 287;
                    if (this.nextResultIndex == 3) plusTest = 260; 
                    if (this.nextResultIndex == 2) plusTest = 230; 
                    test = 113
                } 
                else {
                    test = 72
                    if (this.nextResultIndex == 5) plusTest = 269;
                    if (this.nextResultIndex == 4) plusTest = 247;
                    if (this.nextResultIndex == 3) plusTest = 215;
                    if (this.nextResultIndex == 2) plusTest = 195;  
                }
                if (this.showCover) {var cover = 600 }
                else {var cover = -10}
                var plusTest;
                   
                var preComputed = (+cover+(this.asks)*630 + 459 + plusTest -(-52*(this.currentResult)+52*(this.nextResultIndex)))	
                return preComputed		
            },
            description: function () {					
                return (this.results[this.currentResult].description)					
            },
            currentCategoryIndex: function() {
                if (this.tempCategoryId != '') {
                    return this.mediaCategories.getIndexById(this.tempCategoryId)
                }
                else return 1
            },
            currentCategory: function () {
                return this.mediaCategories[this.currentCategoryIndex].media
            },
        
    },	
    methods: {
        updateDescription: function(value) {		
            return this.$emit('update:value', value, this.isTest); 
            },
            updateCurrentMediaCategoryId: function(value) {
                this.tempCategoryId = this.mediaCategories[value[0]].id;
            },
            getRealMediaId: function(index) {
                var id = this.reversedConcatedMedia[index].id;
                console.log('reversedID', id)
                var realindex = this.concatedMedia.getIndexById(id);
                if (realindex < this.currentCategory.length) {
                    this.results[this.currentResult].mediaFromUser = false;
                    return this.currentCategory.getIdByIndex(realindex);
                }
                else {
                    this.results[this.currentResult].mediaFromUser = true;
                    console.log('userMediaFiltred', this.userMediaFiltred.getIdByIndex(realindex - (this.currentCategory.length) )   )
                    return this.userMediaFiltred.getIdByIndex(realindex - (this.currentCategory.length) )    
                }
            },
            getFakeArrayId: function(id, categoryId, isUserId) { // isUserId - Boolean
                        if (isUserId) {
                            var arr = this.userMediaFiltred
                            var index = arr.getIndexById(id);
                            console.log('origid', id)
                            console.log('origindex',arr.getIndexById(4))
                            var newId = this.concatedMedia[index + this.currentCategory.length].id;
                            console.log('newid', newId)
                        }
                        else {
                            var index = this.currentCategory.getIndexById(id)
                            var newId = this.concatedMedia.getIdByIndex(index)
                        }
                        return newId
            },
            updateImg: function(newValue) { 
                    var id = this.getRealMediaId(newValue);
                    this.results[this.currentResult].mediaId = id
                    console.log('REAL ID', id)
                    var index;
                    if (this.results[this.currentResult].mediaFromUser) {
                        index = this.userMediaFiltred.getIndexById(id);
                        this.results[this.currentResult].category = this.tempCategoryId
                    }
                    else {
                        index = this.currentCategory.getIndexById(id)
                        this.results[this.currentResult].category = this.tempCategoryId
                    }
                    this.$emit('result-on')
                    
                        
                },
                deleteMedia: function() {
                    this.bgConfig.category = '';
                    this.bgConfig.mediaCategoryId = '';
                    this.tempAns.mediaFromUser = '';
                    this.tempAns.mediaId = '';
                    this.tempAns.mediaTitleRight = '';
                    this.tempAns.mediaTitleWrong = ''
     
                },
                addUserMedia: function() {
                    if (addUserImg()) {
                        var lastMediaId = this.userMedia[this.userMedia.length - 1].id;
                        var userMediaObject = addUserImg();
                        lastMediaId++;
                        userMediaObject = {
                            id: lastMediaId,
                            categoryId: this.tempCategoryId,
                            url: userMediaObject.url,
                            lowUrl: userMediaObject.url,
                            title: '-Введите сообщение',
                        }
                        this.userMedia.push(userMediaObject);
                        
                        this.$emit('update-media', 'mediaResults', this.userMedia);
                        
                    }
                    else {alert('смотри tools-bg.js')}
                }
            },
        watch: {
            showpopup: function (newValue) {
                    this.tempCategoryId = this.results[this.currentResult].category
            },
            currentask: function (nevValue) {
                this.tempCategoryId = this.results[this.currentResult].category
            }
        }
    
}) 
