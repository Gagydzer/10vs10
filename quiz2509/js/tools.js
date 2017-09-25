var addFromUserMedia = function (){
    var mediaObject = {};
    mediaObject.url = 'images/quiz' + Math.floor((Math.random()*(9-2))+2) + '.jpg';
    return mediaObject
	}

Vue.component('tools', {
    template:'\
    <transition name="popupshow">\
    <div\
    v-show="showpopup"\
    v-bind:key="currentanswer.currentask"\
    class="quiz_ask_popup ask_tools" v-bind:style="{top : shift + \'px\'}">\
        <div class="popup_container_for_containers">\
            <media-cats\
            key="media-tools"\
            :current-category-index="currentCategoryIndex"\
            @choose-category="updateCurrentMediaCategoryId(arguments)"\
            :categories="mediaCategories"\
            >\
                <div slot="media" class="popup_mediacontainer_wrapper">\
                    <div class="popup_mediacontainer_wrapper_wrapper">\
                        <div class="popup_mediacontainer">\
                                <media-item class="popup_mediaconntent_wrap addnew"  @click="addUserMedia()"/>\
                                <media-item\
                                :key="\'media-tools\' + index"\
                                show-title="true"\
                                :title="((item.id == originalId)&&(originalMediaCategory == currentCategoryId)) ? originalTitle : item.title"\
                                :item-index="index"\
                                v-for="(item, index) in reversedConcatedMedia"\
                                :class="[item.id == mediaIdforArray ? \'currentmedia\' : \' \',  \'popup_mediaconntent_wrap\']"\
                                :style="{background: \'url(\' + item.lowUrl + \') center no-repeat\'}"\
                                @upd="updatemediaId(arguments, index)"\
                                @update-item-title="updateTitle(arguments, index)"\
                                />\
                                <media-item\
                                :class="[tempAns.mediaId == \'none\' ? \'currentmedia\' : \' \',  \'popup_mediaconntent_wrap none\']"\
                                v-on:click="deleteMedia()" />\
                        <div class="popup_scroll_oweflow"></div>\
                        <div class="popup_bottom_oweflow"></div>\
                        </div>\
                    </div>\
                </div>\
            </media-cats>\
        </div>\
        <div class="popup_form ">\
        <template v-if="isTest">\
        <toggle-button @change="updateIsCorrect($event.value)" :value="tempAns.isCorrect" :sync="true"/>\
        <span>Верный ответ</span>\
        </template>\
        <template v-else="isTest">\
        <select size="1"\
        @change="updatePoints($event.target.value)"\
        >\
                    <option v-for="result in results" :value="result.points"  :selected="tempAns.points==result.points" >{{ result.title }}</option>\
                </select> <span style="padding-left: 5px">Результат</span>\
        </template>\
        </div>\
    </div>\
    </transition>\
    ',
    props: {
        userMedia: Array,
        mediaCategories: Array, 
        currentanswer: [Number, String], 
        currentask: [Number, String], 
        nextanswerid: [Number, String], 
        showpopup: Boolean, 
        tempAns: [Object, String], 
        isTest: Boolean, 
        results: Array,
        showCover: Boolean, 
        currentCategoryId: {
            type: Number,
            default: () => {return 1}
        }
    },
    data: function () { return {
        mediaIdWatcher: true,
        tempCategoryId: this.currentCategoryId,
        tempId: '',
        tempTitle: '',
        originalId: '',
        originalMediaCategory: '',
        originalTitle: '',
        fakeArrayOriginalId: '',
        }
                        
      
    },
    computed: {
            mediaIdforArray: function() {
                console.log('demiaid', this.tempAns.mediaId, this.tempAns.mediaCategoryId, this.tempAns.mediaFromUser)
                if (this.tempCategoryId == this.tempAns.mediaCategoryId) {return this.getFakeArrayId(this.tempAns.mediaId, this.tempAns.mediaCategoryId, this.tempAns.mediaFromUser)}
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
            currentTitle: function() {
                if (this.isTest) {
                    if (this.isCorrect) {
                        return this.tempAns.mediaTitleRight}
                    else {
                        return this.tempAns.mediaTitleWrong }
                }
                else {return this.tempAns.mediaTitle}
            },
            isCorrect: function() {
                return this.tempAns.isCorrect
            },
            currentCategoryIndex: function() {
                return this.mediaCategories.getIndexById(this.tempCategoryId)
            },
            currentCategory: function () {
                return this.mediaCategories[this.currentCategoryIndex].media
            },
            shift: function () {
                var cover
                if (this.showCover) { cover = 600 }
                else {cover = -10}
                var preComputed = ((cover + 200+ 100-200-43)+400+45+(this.currentask)*(600+100)+51*(this.currentanswer)-51*(this.nextanswerid-2))
                return preComputed				
        },
    },
    methods: {
            updateCurrentMediaCategoryId: function(value) {
                this.tempCategoryId = this.mediaCategories[value[0]].id;
                // this.$emit('update-current-media-category-id', id)
            },
            updateIsCorrect: function (value) {
                this.tempAns.isCorrect = value
                return this.$emit('updateiscorrect', this.currentanswer, this.currentask, value)
                },
            updatePoints: function (value) {
                console.log('asdasdasd', value)
                return this.$emit('updatepoints', this.currentask, this.currentanswer, value)       
                },
            updatemediaId: function(args, value) {
                    if (this.mediaIdWatcher) {
                        var fakeId = this.reversedConcatedMedia[value].id
                        this.mediaIdWatcher = false;
                        var id = this.getRealMediaId(value);
                        console.log('real id', id)
                        if (this.tempAns.mediaFromUser) {var media = this.userMedia}
                        else {var media = this.currentCategory}
                        var currentMediaObject = media[media.getIndexById(id)];
                        this.tempAns.mediaCategoryId = this.tempCategoryId;

                        // ORIGINALNIY ZAGOLOVOK v title
                        if ((fakeId == this.fakeArrayOriginalId)&&(this.tempCategoryId == this.originalMediaCategory)) {
                            var title = this.originalTitle
                        }
                            else {
                                var title = args[0]
                            }

                        if (this.isTest) {
                            if (value != 'none') {
                                this.tempAns.mediaId = id;
                                if (this.tempAns.isCorrect)  this.tempAns.mediaTitleRight = title;
                                else this.tempAns.mediaTitleWrong = title;
                            }
                            else {this.tempAns.mediaId = 'none';
                                this.tempAns.mediaTitleRight = '';
                                this.tempAns.mediaTitleWrong = '';
                            }
                        }
                        else {
                            if (value != 'none') {
                                this.tempAns.mediaTitle = title;
                                this.tempAns.mediaId = id;
                                
                            }
                            else {this.tempAns.mediaTitle = '';
                                    this.tempAns.mediaId = 'none'
                            }
                        }
                        setTimeout( () => { this.mediaIdWatcher = true }, 1500)
                        return this.$emit('updatemediaid', this.currentask, this.currentanswer, this.tempAns)
                    }
                    
            },
            getRealMediaId: function(index) {
                var id = this.reversedConcatedMedia[index].id;
                var realindex = this.concatedMedia.getIndexById(id);
                if (realindex < this.currentCategory.length) {
                    this.tempAns.mediaFromUser = false;
                    return this.currentCategory.getIdByIndex(realindex);
                }
                else {
                    this.tempAns.mediaFromUser = true;
                    return this.userMediaFiltred.getIdByIndex(realindex - (this.currentCategory.length) )    
                }
            },
            getFakeArrayId: function(id, categoryId, isUserId) { // isUserId - Boolean
                    var index

                    
                        if (isUserId) {
                            index = this.userMedia.filterByCategoryId(categoryId).getIndexById(id);
                            id = this.concatedMedia[index + this.currentCategory.length].id;
                        }
                        else {
                            index = this.currentCategory.getIndexById(id)
                            id = this.concatedMedia.getIdByIndex(index)
                        }
                        console.log('id' , id)
                        console.log('index' , index)
                        return id
            },
            updateTitle: function(arguments, index) { // arguments[0] == znachenie, index
                if ((this.reversedConcatedMedia[index].id == this.fakeArrayOriginalId)&&(this.tempCategoryId == this.originalMediaCategory)) {
                this.originalTitle = arguments[0]
                }
                else this.tempTitle = arguments[0]
                return this.$emit('updatetitle', this.currentask, this.currentanswer, arguments[0])
            },
            deleteMedia: function() {
                this.tempAns.mediaTitle = '';
                this.tempAns.mediaCategoryId = '';
                this.tempAns.mediaFromUser = '';
                this.tempAns.mediaId = '';
                this.tempAns.mediaTitleRight = '';
                this.tempAns.mediaTitleWrong = ''
 
            },
            addUserMedia: function() {
                if (addFromUserMedia()) {
                    var lastMediaId = this.userMedia[this.userMedia.length - 1].id;
                    var userMediaObject = addFromUserMedia();
                    lastMediaId++;
                    userMediaObject = {
                        id: lastMediaId,
                        categoryId: this.tempCategoryId,
                        url: userMediaObject.url,
                        lowUrl: userMediaObject.url,
                        title: '-Введите сообщение',
                    }
                    this.userMedia.push(userMediaObject);
                    this.$emit('update-media', 'mediaAns', this.userMedia);
                }
                else {alert('смотри tools-bg.js')}
            }
    },
    watch: {
        isCorrect: function(newTempAns) {
            console.log('watch')
            if (this.isCorrect) { 
                this.currentTitle = this.tempAns.mediaTitleRight}
            else {
                this.currentTitle = this.tempAns.mediaTitleWrong }
        },
        showpopup: function(newshowpopup) {
            if (this.isTest) {
                if (this.isCorrect) { 
                    this.originalTitle = this.tempAns.mediaTitleRight
                    this.currentTitle = this.tempAns.mediaTitleRight}
                else {
                    this.originalTitle =  this.tempAns.mediaTitleWrong 
                    this.currentTitle = this.tempAns.mediaTitleWrong }
            }
            else {
                this.originalTitle =  this.tempAns.mediaTitle
                this.currentTitle = this.tempAns.mediaTitle}
            this.originalId = this.tempAns.mediaId
            this.originalMediaCategory = this.tempAns.mediaCategoryId
            this.fakeArrayOriginalId = this.getFakeArrayId(this.originalId, this.originalMediaCategory, this.tempAns.mediaFromUser)
        },
        currentanswer: function (nevValue) {
            this.tempCategoryId = this.tempAns.mediaCategoryId
        }

    }
}) 
