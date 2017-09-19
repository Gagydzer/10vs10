Vue.component('tools', {
    template:'\
    <transition name="popupshow">\
    <div\
    v-show="showpopup"\
    v-bind:key="currentanswer.currentask"\
    class="quiz_ask_popup" v-bind:style="{top : shift + \'px\'}">\
    <div class="popup_form">\
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
        <div class="popup_container_for_containers">\
        <transition name="slide">\
        <template v-if="isTest" >\
        <transition name="slide">\
            <div key="right" class="popup_mediacontainer_wrapper"  v-if="tempAns.isCorrect">\
                <div class="popup_mediacontainer">\
                    <div class="popup_mediaconntent_wrap addnew">\
                        <div class="popup_mediaconntent"></div>\
                    </div>\
                    <div\
                    class=""\
                    v-for="(item, index) in MediaArrRight"\
                    :class="[item.id == tempAns.mediaId ? \'currentmedia\' : \' \',  \'popup_mediaconntent_wrap\']"\
                    :style="{background: \'url(\' + item.lowUrl + \') center no-repeat\'}"\
                    v-on:click="updatemediaId(index)"\
                    ><div class="popup_mediaconntent"><span><input :value="item.title" @input="updateTitle($event.target.value, index)"></span></div></div>\
                    <div :class="[tempAns.mediaId == \'none\' ? \'currentmedia\' : \' \',  \'popup_mediaconntent_wrap none\']"\
                    v-on:click="updatemediaId(\'none\')">\
                        <div class="popup_mediaconntent"></div>\
                    </div>\
                </div>\
            </div>\
            <div key="wrong" class="popup_mediacontainer_wrapper" v-if="!tempAns.isCorrect">\
                <div class="popup_mediacontainer">\
                    <div class="popup_mediaconntent_wrap addnew">\
                        <div class="popup_mediaconntent"></div>\
                    </div>\
                    <div\
                    class=""\
                    v-for="(item, index) in MediaArrWrong"\
                    :class="[item.id == tempAns.mediaId ? \'currentmedia\' : \' \',  \'popup_mediaconntent_wrap\']"\
                    :style="{background: \'url(\' + item.lowUrl + \') center no-repeat\'}"\
                    v-on:click="updatemediaId(index)"\
                    ><div class="popup_mediaconntent"><span><input maxlength="15" :value="item.title" @input="updateTitle($event.target.value, index)"></span></div></div>\
                    <div \
                    :class="[tempAns.mediaId == \'none\' ? \'currentmedia\' : \' \',  \'popup_mediaconntent_wrap none\']"\
                    v-on:click="updatemediaId(\'none\')">\
                        <div class="popup_mediaconntent"></div>\
                    </div>\
                </div>\
            </div>\
        </transition>\
        </template>\
        <template v-else>\
            <div class="popup_mediacontainer_wrapper">\
                <div class="popup_mediacontainer">\
                    <div class="popup_mediaconntent_wrap addnew">\
                    <div class="popup_mediaconntent"></div>\
                    </div>\
                    <div\
                    class=""\
                    v-for="(item, index) in media"\
                    :class="[item.id == tempAns.mediaId ? \'currentmedia\' : \' \',  \'popup_mediaconntent_wrap\']"\
                    :style="{background: \'url(\' + item.url + \') center no-repeat\'}"\
                    v-on:click="updatemediaId(index)"\
                    >\
                        <div class="popup_mediaconntent"><span><input :value="item.title" @input="updateTitle($event.target.value, index)"></span></div>\
                    </div>\
                    <div \
                    :class="[tempAns.mediaId == \'none\' ? \'currentmedia\' : \' \',  \'popup_mediaconntent_wrap none\']"\
                    v-on:click="updatemediaId(\'none\')">\
                        <div class="popup_mediaconntent"></div>\
                    </div>\
                </div>\
            </div>\
        </template>\
        </transition>\
        </div>\
    </div>\
    </transition>\
    ',
    props: ['currentanswer', 'currentask', 'nextanswerid', 'showpopup', 'tempAns', 'isTest', 'results', 'media', 'showCover'],
    data: function() {
            return {mediaIdWatcher : true}
    },
    computed: {
            shift: function () {
                var cover
                if (this.showCover) { cover = 600 }
                else {cover = -10}
                var preComputed = ((cover + 200+ 100-200-43)+400+45+(this.currentask)*(600+100)+51*(this.currentanswer)-51*(this.nextanswerid-2))
                return preComputed				
        },
            MediaArrRight: function() {
                if (this.isTest) {
                return this.media.filter(function(value) {return value.isCorrect});
                } },
            MediaArrWrong: function() {
                if (this.isTest) {
                return this.media.filter(function(value) {return !value.isCorrect});
                } },
            MediaArr: function() {
                if (this.isTest) {
                if (this.tempAns.isCorrect == true) {
                    return this.media.filter(function(value) {return value.isCorrect});
                }
                else { return this.media.filter(function(value) {return !value.isCorrect});}
                }
                else {return this.media}
            }
    },
    methods: {
            updateIsCorrect: function (value) {
                console.log('value' ,value);
                this.tempAns.mediaId = "0";
                this.tempAns.isCorrect = value
                return this.$emit('updateiscorrect', this.currentanswer, this.currentask, value)
                },
            updatePoints: function (value) {
                console.log('asdasdasd', value)
                return this.$emit('updatepoints', this.currentask, this.currentanswer, value)       
                },
            updatemediaId: function(value) {
                    var self = this;
                    if (this.mediaIdWatcher) {
                    this.mediaIdWatcher = false;
                    if (this.isTest) {
                        if (value != 'none') {
                            this.tempAns.mediaId = this.MediaArr[value].id;
                            if (this.tempAns.isCorrect) this.tempAns.mediaTitleRight = this.MediaArr[value].title;
                            if (!this.tempAns.isCorrect) this.tempAns.mediaTitleWrong = this.MediaArr[value].title;
                        }
                        else {this.tempAns.mediaId = 'none';
                            if (this.tempAns.isCorrect) this.tempAns.mediaTitleRight = 'none';
                            if (!this.tempAns.isCorrect) this.tempAns.mediaTitleWrong = 'none';
                        }
                    }
                    else {
                        if (value != 'none') {
                            this.tempAns.mediaTitle = this.MediaArr[value].title;
                            this.tempAns.mediaId = this.media[value].id;
                            
                        }
                        else {this.tempAns.mediaTitle = 'none';
                                this.tempAns.mediaId = 'none'
                        }
                    }
                    setTimeout( () => { this.mediaIdWatcher = true }, 1500)
                    return this.$emit('updatemediaid', this.currentask, this.currentanswer, this.tempAns)
                    
                    }
                    
            },
            updateTitle: function(val1, val2) { // znachenie, index
                if (this.isTest) {
                    if (this.tempAns.isCorrect) {
                        this.tempAns.mediaTitleRight = val1
                        }
                    else {
                        this.tempAns.mediaTitleWrong = val1
                        }
                    this.MediaArr[val2].title = val1;
                }
                else {this.tempAns.mediaTitle = val1;
                    this.media[val2].title = val1;
                }
                    return this.$emit('updateTempAns', this.currentask, this.currentanswer, this.tempAns)
            }
    }
}) 
