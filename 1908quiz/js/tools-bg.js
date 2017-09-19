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
        <div class="popul_descr">\
            <div class="bgpopup_tools">\
                <div>\
                Размыть\
                    <input v-model.number="bgBlur" type="range" min="0" max="10">\
                </div>\
                <div>\
                Заглушить\
                <input v-model.number="bgDarkness" type="range" min="0" max="100">\
                </div>\
            </div>\
        </div>\
        <div class="popup_mediacontainer_wrapper">\
        <div class="popup_mediacontainer">\
        <div v-on:click="addUserImg()" :class="[tempAns.mediaId == \' \' ? \'currentmedia\' : \' \',  \'popup_mediaconntent_wrap addnew\']"\
        >\
            <div class="popup_mediaconntent"></div>\
        </div>\
        <div\
            class=""\
            v-for="(item, index) in media"\
            :class="[item.id == tempAns.mediaId ? \'currentmedia\' : \' \',  \'popup_mediaconntent_wrap\']"\
            :style="{background: \'url(\' + item.url + \') center no-repeat\'}"\
            v-on:click="bgMediaIndex = index"\
            ><div class="popup_mediaconntent"></div></div>\
        </div>\
    </div>\
    </div>\
    </transition>\
    ',
    props: ['currentAskEl', 'total-asks', 'tempBgType', 'startBgConfig', 'showpopup' ,'endBgConfig', 'currentask', 'isTest', 'tempAns', 'media', 'showCover'],
    data: function() { return { mediaIdWatcher : false, }
    },
    computed: {
            
            bgConfig: function() {
                        if (this.tempBgType == 'ask') {return this.currentAskEl.config}
                        if (this.tempBgType == 'start') {return this.startBgConfig}
                        if (this.tempBgType == 'end') {return this.endBgConfig}					
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
            bgMediaIndex: {
                get: function() {
                    },
                set: function(newValue) { 
                        this.bgConfig.id = this.media[newValue].id;
                        this.bgConfig.image = this.media[newValue].url
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
        updateImg: function(val) {
                var mediaWatcher = false;
                var self = this;
                
                var id = val.id;
                var url = val.url;
                console.log(this.Bgconfig.id, this.Bgconfig.image);
                this.Bgconfig.id = id;
                this.Bgconfig.image = url;						
            },
            addUserImg: function() {
                if (addUserImg()) {
                    var lastMediaId = this.media[this.media.length - 1].id;
                    var userMediaObject = addUserImg();
                    lastMediaId++
                    userMediaObject.id = lastMediaId;
                    this.media.push(userMediaObject);
                    this.$emit('update-media', 'mediaBgs', this.media);
                    
                }
                else {alert('смотри tools-bg.js')}
            }
        }
}) 

