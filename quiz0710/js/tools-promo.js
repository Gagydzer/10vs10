var addUserPromoImg = function addUserImg(){
    var mediaObject = {};
    mediaObject.url = 'images/quiz' + Math.floor((Math.random()*(9-2))+2) + '.jpg';
    return mediaObject
	}

// экземпляр вью
Vue.component('tools-promo', {
    template:'\
    <transition name="popupshow">\
    <div\
    v-show="showpopup"\
    class="quiz_promo_popup" style="position: absolute" v-bind:style="{top : shiftY + \'px\', left : shiftX + \'px\'}">\
        <div class="popup_container_for_containers">\
            <promo-cats\
            :get-user-promo="promoFromUser"\
            >\
                <div slot="userPromo" class="popup_mediacontainer_wrapper">\
                    <div class="popup_mediacontainer_wrapper_wrapper">\
                        <div class="popup_mediacontainer">\
                            <media-item :key="\'media-tools-add\'" @click="addUserMedia()" class="popup_mediaconntent_wrap addnew" />\
                            <media-item \
                            v-for="(item, index) in promo"\
                            :class="[selectedArr[index] ? selectedClass : \' \',  \'popup_mediaconntent_wrap\']"\
                            :title="item.title"\
                            :show-title="true"\
                            :key="\'media-tools-bg\' + index"\
                            :style="{background: \'url(\' + item.bgUrl + \') center no-repeat\'}"\
                            v-on:click="updatePromo(index)" />\
                            <div class="popup_scroll_oweflow"></div>\
                            <div class="popup_bottom_oweflow"></div>\
                        </div>\
                    </div>\
                </div>\
                <div slot="addPromo" class="popup_mediacontainer_wrapper">\
                            <div class="promo_slide_create">\
                                <div class="promo_inputs_wrapper">\
                            </div>\
                            <div class="add-promo-bg" @click="addUserBg()" :style="{backgroundImage: \'url(\' + userBgUrl + \')\'}">\
                            <button class="quiz_add_startbg" title="Выберите обложку"  ></button>\
                            </div>\
                            <div>\
                            <input\
                            style="margin-bottom: 10px;"\
                            maxlength="50"\
                            v-bind:value="userTitle"\
                            v-on:input="updateTitle($event.target.value)"\
                            placeholder="Заголовок"\
                            class="quiz_promo_input" >\
                            <input\
                            maxlength="50"\
                            v-bind:value="userUrl"\
                            v-on:input="updateUrl($event.target.value)"\
                            placeholder="Ссылка"\
                            class="quiz_promo_input" >\
                            </div>\
                            <div class="promo_button_wrap"><button class="quiz_promo" @click="updateUserPromo()">{{ buttonText }}</button></div>\
                            </div>\
                </div>\
            </promo-cats>\
            </div>\
        </div>\
    </div>\
    </div>\
    </transition>\
    ',
    props: [
        'promoListIndex',
        'showpopup',
        'promo',
        'promoList',
        'userPromo',
        'promoIndex',
        'promoFromUser',
        'showCover',
        'totalAsks', 
        'asks', 
        'isTest', 
        'showCover',
        'promoArrayLength',
        'promoArrayIndex',
    ],
    data: function() { return { 
        mediaIndx : false, 
        tempCategoryId: '',
        userTitle: undefined,
        userUrl: 'url',
        userBgUrl: 'userBgUrl'
    }
    },
    computed: {
            buttonText: function() {
                if (this.promoListIndex == -1) {
                    return 'Новое промо'
                }
                else return 'Изменить промо'
            },
            selectedArr: function() {
                var selected = true;
                var arrey = [];
                var self = this;
                var promoList = JSON.parse(JSON.stringify(self.promoList));
                var arr = promoList.filter((item) => {if (!item.fromUser) return true});

                this.promo.forEach((element) => { 
                    var temp = false;
                    arr.forEach((item1) => {
                        
                        if (item1.id == element.id) {
                            temp = true;
                        }
                    })
                    console.log('LOGGGGG', temp); 
                    if (temp) { arrey.push(true)}
                    else { arrey.push(false)}

                  })
                return arrey
            },
            selectedClass: function () {
                return 'currentmedia'
            },
            userPromoTitle: function() {
                var title
                if (this.promoFromUser) {
                    title = this.userPromo[this.promoIndex].title
                }
                else title = ''
                return title
            },
            userPromoDescription: function() {
                var descr
                if (this.promoFromUser) {
                    descr = this.userPromo[this.promoIndex].description
                }
                else descr = ''
                return descr
            },
            shiftX: function () {
                let length = this.promoArrayLength;
                let index = this.promoArrayIndex;
                let shift;
                let x
                if (length == 1) {
                    shift = 480;
                    x = 0
                }
                if (length == 2) {
                    shift = 602;
                    x = 250 * index
                }
                if (length == 3) {
                    shift = 647;
                    if (index == 3) { index = 2}
                    x = 167 * index
                }
                
                return - ( shift - x )
                },
            shiftY: function () {
                var cover;
                var test;
                if (this.showCover) {var cover = 600 }
                else {var cover = -10}
                var plusTest;
                   
                var preComputed = (+cover+(this.asks)*700 + 965)	
                return preComputed		
            },	
    },
    methods: {
        updateCurrentMediaCategoryId: function(value) {
            this.tempCategoryId = this.mediaCategories[value[0]].id;
            // this.$emit('update-current-media-category-id', id)
        },
        updatePromo: function(index) {
            if (this.promoListIndex != -1) {
                var id = this.promo[index].id;
                var prevId = this.promoList[this.promoListIndex].id;
                var prevType =  this.promoFromUser;
                console.log('update-promo', id, prevId, false, prevType );
                this.$emit('update-promo', id, prevId, false, prevType );
            }
            else {
                var id = this.promo[index].id;
                var prevId = undefined;
                var prevType =  undefined;
                console.log('update-promo', id, prevId, false, prevType );
                this.$emit('update-promo', id, prevId, false, prevType );
            }
             
            },
            deleteMedia: function() {
                this.bgConfig.category = '';
                this.bgConfig.mediaCategoryId = '';
                this.tempAns.mediaFromUser = '';
                this.tempAns.mediaId = '';
                this.tempAns.mediaTitleRight = '';
                this.tempAns.mediaTitleWrong = ''
 
            },
            updateUserPromo: function() {
                    if (this.promoListIndex == -1) {
                        this.create()
                    }
                    else {
                        if (this.promoList[this.promoListIndex].fromUser) {
                            var id = this.promoList[this.promoListIndex].id;
                            var title = this.userTitle;
                            var bgUrl = this.userBgUrl;
                            var url = this.userUrl;
                            this.$emit('update-promo-from-user', id, title, url, bgUrl)
                        }
                        else {
                            var id = this.promoList[this.promoListIndex].id;
                            var title = this.userTitle;
                            var bgUrl = this.userBgUrl;
                            var url = this.userUrl;
                            this.$emit('update-promo-to-from-user', id, title, url, bgUrl, this.promoListIndex)
                        }
                        
                    }
               
                
            },
            create: function() {
                var url = this.userUrl;
                var title = this.userTitle;
                var bgUrl = this.userBgUrl;
                var fromUser = true;
                this.$emit('create-promo', title, url, bgUrl, fromUser)
            },
            updateTitle: function(value) {
                this.userTitle = value
            },
            updateUrl: function(value) {
                this.userUrl = value
            },
            updateBgUrl: function(value) {
                this.userBgUrl = value
            },
            addUserBg: function() {
                if (addUserPromoImg()) {
                    var userMediaObject = addUserPromoImg();
                    this.userBgUrl = userMediaObject.url
                    
                }
                else {alert('смотри tools-bg.js')}
            }
        },
        watch: {
            promoListIndex: function(newValue) {
                if ((!this.promoFromUser)||(this.promoListIndex == -1)) {
                    this.userTitle =  undefined
                    this.userBgUrl=  undefined
                    this.userUrl =  undefined
                }
                else {
                    var id = this.promoList[newValue].id;
                    this.userTitle =  this.userPromo.getItemById(id).title
                    this.userBgUrl =  this.userPromo.getItemById(id).bgUrl
                    this.userUrl =  this.userPromo.getItemById(id).url
                }
            } 
        }
              
}) 