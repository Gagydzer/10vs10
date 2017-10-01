//внешняя функция добавления пользовательского бекграунда
var addUserImg = function addUserImg(){
    var mediaObject = {};
    mediaObject.url = 'images/quiz' + Math.floor((Math.random()*(9-2))+2) + '.jpg';
    return mediaObject
	}


// экземпляр вью
Vue.component('tools-bg', {
    template:'\
    <transition name="popupshow">\
    <div\
    v-show="showpopup"\
    class="quiz_bg_popup" style="position: absolute" v-bind:style="{top : shift + \'px\'}">\
        <div class="popup_container_for_containers">\
            <media-cats\
            key="media-tools-bg"\
            :current-category-index="currentCategoryIndex"\
            @choose-category="updateCurrentMediaCategoryId(arguments)"\
            :categories="mediaCategories"\
            :count="4"\
            :flag="closeToolsCategories"\
            >\
                <div slot="media" class="popup_mediacontainer_wrapper">\
                    <div class="popup_mediacontainer_wrapper_wrapper">\
                        <div class="popup_mediacontainer">\
                            <media-item :key="\'media-tools-add\'" @click="addUserMedia()" class="popup_mediaconntent_wrap addnew" />\
                            <media-item \
                            :show-title="false"\
                            :key="\'media-tools-bg\' + index"\
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
                <div class="popup_form">\
                    <div>\
                    <img src="images/blur.svg" height="24" width="24" />\
                        <input v-model.number="bgBlur" type="range" min="0" max="10">\
                    </div>\
                    <div>\
                    <img src="images/brightness.svg" height="24" width="24" />\
                    <input v-model.number="bgDarkness" type="range" min="0" max="100">\
                </div>\
            </div>\
        </div>\
    </div>\
    </div>\
    </transition>\
    ',
    props: ['userMedia',
    'mediaCategories', 
    'currentAskEl', 
    'total-asks', 
    'tempBgType', 
    'startBgConfig', 
    'showpopup' ,
    'endBgConfig', 
    'currentask', 
    'isTest', 
    'tempAns',
    'showCover',
    'closeToolsCategories'
    ],
    data: function() { return { mediaIndx : false, 
        tempCategoryId: ''}
    },
    computed: {
            mediaIdforArray: function() {
                if (this.tempCategoryId == this.bgConfig.category) {return this.getFakeArrayId(this.bgConfig.id, this.bgConfig.category, this.bgConfig.mediaFromUser)}
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
            bgConfig: function() {
                        if (this.tempBgType == 'ask') {return this.currentAskEl.config}
                        if (this.tempBgType == 'start') {return this.startBgConfig}
                        if (this.tempBgType == 'end') {return this.endBgConfig}					
            },
            currentCategoryId: function(){
                return this.bgConfig.category
            },
            currentCategory: function() {
                return this.mediaCategories[this.currentCaregoryIndex].media
            },
            bgDarkness: {
                get: function() {
                    try {
                    return Math.round(101- this.bgConfig.darkness*100)}
                    catch (err) {
                    return 0
                    }
                    },
                set: function(newValue) {
                        var val = (101 - newValue)/100;
                        console.log(val);
                        this.bgConfig.darkness = val
                        var comp = 'background-image: url(' + this.bgConfig.image + '); filter: blur(' + this.bgConfig.bgblur + 'px) brightness(' + this.bgConfig.darkness + ')';							
                        this.bgConfig.compStyle = comp;
                        this.$emit('update-bg-config', this.bgConfig, this.tempBgType, this.currentask);
                        }
                },
            bgBlur: {
                get: function() {
                    try {
                    return this.bgConfig.bgblur
                    }
                    catch (err) {
                    return 0
                    }
                    },
                set: function(newValue) {
                        this.bgConfig.bgblur = newValue
                        var comp = 'background-image: url(' + this.bgConfig.image + '); filter: blur(' + this.bgConfig.bgblur + 'px) brightness(' + this.bgConfig.darkness + ')';							
                        this.bgConfig.compStyle = comp;
                        this.$emit('update-bg-config', this.bgConfig, this.tempBgType, this.currentask);
                        }
                },
            
                nextAnswerId: function() {
                    if ((this.tempBgType == 'start')||(this.tempBgType == 'end')) { return ''}
                    try {return this.currentAskEl.nextAnswerId}
                    catch (err) { return ''}
                    },
                    
                currentCategoryIndex: function() {
                    var index 
                    return this.mediaCategories.getIndexById(this.tempCategoryId)
                },
                currentCategory: function () {
                    return this.mediaCategories[this.currentCategoryIndex].media
                },
            shift: function () {
                var cover
                if (this.showCover) { cover = 600 }
                else {cover = -10}
                if (this.tempBgType == 'ask') {
                    return (cover+(180+100-200-30)+490+(this.currentask)*(600+100)-51*(this.nextAnswerId+1))
                }
                if (this.tempBgType == 'start') {return 330}
                if (this.tempBgType == 'end') {
                    return (cover+(120-200-30)+105+(this.totalAsks)*(600+100))
                    }
                }	
    },
    methods: {
        updateCurrentMediaCategoryId: function(value) {
            this.tempCategoryId = this.mediaCategories[value[0]].id;
            // this.$emit('update-current-media-category-id', id)
        },
        getRealMediaId: function(index) {
            var id = this.reversedConcatedMedia[index].id;
            console.log('reversedID', id)
            var realindex = this.concatedMedia.getIndexById(id);
            if (realindex < this.currentCategory.length) {
                this.bgConfig.mediaFromUser = false;
                return this.currentCategory.getIdByIndex(realindex);
            }
            else {
                this.bgConfig.mediaFromUser = true;
                console.log('userMediaFiltred', this.userMediaFiltred.getIdByIndex(realindex - (this.currentCategory.length) )   )
                return this.userMediaFiltred.getIdByIndex(realindex - (this.currentCategory.length) )    
            }
        },
        getFakeArrayId: function(id, categoryId, isUserId) { // isUserId - Boolean
                    if (isUserId) {
                        var arr = this.userMediaFiltred
                        var index = arr.getIndexById(id);
                        var newId = this.concatedMedia[index + this.currentCategory.length].id;
                    }
                    else {
                        var index = this.currentCategory.getIndexById(id)
                        var newId = this.concatedMedia.getIdByIndex(index)
                    }
                    return newId
        },
        updateImg: function(newValue) { 
                var id = this.getRealMediaId(newValue);
                this.bgConfig.id = id
                console.log('REAL ID', id)
                var index;
                if (this.bgConfig.mediaFromUser) {
                    index = this.userMediaFiltred.getIndexById(id);
                    this.bgConfig.image = this.userMediaFiltred[index].url;
                    this.bgConfig.category = this.tempCategoryId
                }
                else {
                    index = this.currentCategory.getIndexById(id)
                    this.bgConfig.image = this.currentCategory[index].url;
                    this.bgConfig.category = this.tempCategoryId
                }
                var comp = 'background-image: url(' + this.bgConfig.image + '); filter: blur(' + this.bgConfig.bgblur + 'px) brightness(' + this.bgConfig.darkness + ')';						
                this.bgConfig.compStyle = comp;
                return(this.bgConfig);
                this.$emit('update-bg-config', this.bgConfig, this.tempBgType, this.currentask);
                	
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
                    
                    this.$emit('update-media', 'mediaBgs', this.userMedia);
                    
                }
                else {alert('смотри tools-bg.js')}
            }
        },
    watch: {
        showpopup: function (newValue) {
            this.tempCategoryId = this.bgConfig.category
        },
        currentask: function (nevValue) {
            this.tempCategoryId = this.bgConfig.category
        }
    }
}) 

