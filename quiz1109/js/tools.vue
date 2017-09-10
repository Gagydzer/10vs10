<template>
<transition name="popupshow">
		<div
		v-show="showpopup"
		v-bind:key="currentanswer.currentask"
		class="quiz_ask_popup" v-bind:style="{top : shift + \'px\'}">
		{{ tempAns.title }}, {{ currentask }}, {{ currentanswer }}
		{{ shift }}
		<div class="popup_form">
		<template v-if="isTest">
		<input type="checkbox"
		v-on:click="updateIsCorrect($event.target.checked)"
		v-bind:checked="this.tempAns.isCorrect"
		>Correct?
		</template>
		<template v-else="isTest">
		<select size="1"
		@change="updatePoints($event.target.value)"
		>
					<option :selected="this.tempAns.points==1" value="1">1</option>
					<option :selected="this.tempAns.points==2" value="2">2</option>
					 <option :selected="this.tempAns.points==3" value="3">3</option>
					 <option :selected="this.tempAns.points==4" value="4">4</option>
					 <option :selected="this.tempAns.points==5" value="5">5</option>
				</select> Баллы за ответ
		</template>
		</div>
		<div class="popup_mediacontainer">
			<div class="popup_mediaconntent"></div>
			<div class="popup_mediaconntent"></div>
			<div class="popup_mediaconntent"></div>
			<div class="popup_mediaconntent"></div>
			<div class="popup_mediaconntent"></div>
			<div class="popup_mediaconntent"></div>
			<div class="popup_mediaconntent"></div>
			<div class="popup_mediaconntent"></div>
		</div>
		</div>
		</transition>
</template>

<script>
   module.export {
    // OR register locally
   // components: { tools }
	props: ['currentanswer', 'currentask', 'nextanswerid', 'showpopup', 'tempAns', 'isTest'],
		computed: {
				shift: function () {
				return ((this.currentask+1)*630 + 305-(-42*(this.currentanswer)+42*(this.nextanswerid)))				
			}
		},
		methods: {
		updateIsCorrect: function (value) {
			console.log(value)
			return this.$emit('updateiscorrect', this.currentanswer, this.currentask, value)
			},
		updatePoints: function (value) {
			return this.$emit('updatepoints', this.currentanswer, this.currentask, value)
			}
		}
	}
</script>