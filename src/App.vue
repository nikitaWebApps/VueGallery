<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import Images from './components/Images.vue'
import Footer from './components/Footer.vue'

const isImageInfoOpened = ref(false)
const isIndexShown = ref(false)
const imageData = ref({})
const bgState = ref({})

const transferToImages = data => {
	bgState.value = data
}

function imageInfoToggle() {
	isImageInfoOpened.value = !isImageInfoOpened.value
}

function toggleIndexGrid() {
	isIndexShown.value = !isIndexShown.value
}

function gatherImageData(data) {
	imageData.value = {
		Client: data.client,
		Project: data.project,
		Credits: data.credits,
	}
}
</script>

<template>
	<div class="main-wrapper">
		<Transition name="appear">
			<div v-if="isImageInfoOpened == true" class="image-info">
				<div class="image-info__grid">
					<div v-for="(key, value) in imageData" class="image-info__grid-item">
						<h3 class="image-info__grid-item-heading">{{ value }}</h3>
						<p class="image-info__grid-item-text">{{ key }}</p>
					</div>
					<div @click="isImageInfoOpened = !isImageInfoOpened" class="image-info__grid-item image-info__grid-item_close"
						>Close window</div
					>
				</div>
			</div>
		</Transition>
		<!-- @indexGrid="toggleIndexGrid" -->
		<Header @image-info="imageInfoToggle" @index-grid="toggleIndexGrid"></Header>
		<Images @ImageData="gatherImageData" :bg-state="bgState" :indexState="isIndexShown"> </Images>
		<Footer @selectedBg="transferToImages"> </Footer>
	</div>
</template>

<style lang="scss">
body {
	margin: 0;
	overflow: clip;
	font-size: 20px;
}
.main-wrapper {
	height: 100dvh;
	overflow: clip;
}

@keyframes appear {
	0% {
		background: transperent;
		color: white;
		backdrop-filter: blur(0);
		opacity: 0;
	}
	100% {
		background: rgb(255 255 255 / 80%);
		backdrop-filter: blur(7px);
		color: black;
		opacity: 1;
	}
}

.appear-enter-active {
	animation: appear 0.5s ease;
}
.appear-leave-active {
	animation: appear 0.5s ease reverse;
}

.image-info {
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 40;
	background: rgb(255 255 255 / 80%);
	backdrop-filter: blur(7px);
	opacity: 1;

	&__grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;

		&-item {
			display: flex;
			flex-direction: column;

			&_close {
				cursor: pointer;
				font-size: 1.5rem;
				font-weight: 600;
			}
		}
	}
}
</style>

