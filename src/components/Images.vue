<script setup>
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
gsap.registerPlugin(Flip)

import imgForest from '../assets/images/forest.jpg'
import imgBicycle from '../assets/images/bicycle.jpg'
import imgCoffee from '../assets/images/coffee.jpg'
import imgChair from '../assets/images/chair.jpg'
import imgPaints from '../assets/images/paints.jpg'
import imgTypewriter from '../assets/images/typewriter.jpg'


import { ref, nextTick, onMounted, computed, watchEffect } from 'vue'
import { useSelectedBgStore, useHeaderOptions } from '@/stores/store';

const bgType = ref('')
const isIndexVisible = ref(false)

watchEffect(() => {
	bgType.value = useSelectedBgStore().bgClass
	isIndexVisible.value = useHeaderOptions().isIndexSelected
})

const emit = defineEmits(['ImageData'])

const indexImages = ref([]) //all Fetched Images Here
const imageData = ref({}) //Current front image data to show in Info tab
const isBackgroundImage = ref(true)

const gsapState = ref(null)


onMounted(() => {
	indexImages.value.push(
		{
			src: imgForest,
			alt: 'Лес',
			id: 2,
			color: '#33FF57',
			client: 'Client B',
			project: 'Маска в лесу',
			credits: 'Photographer: Alice Johnson, Designer: Bob Brown',
		},
		{
			src: imgChair,
			alt: 'Chair',
			id: 1,
			color: '#FF5733',
			client: 'Client A',
			project: 'Chair with balloon',
			credits: 'Photographer: John Doe, Designer: Jane Smith',
		},
		{
			src: imgTypewriter,
			alt: 'Typewriter',
			id: 4,
			color: '#3366FF',
			client: 'Client D',
			project: 'Typewriter',
			credits: 'Photographer: Michael Lee, Designer: Sarah Taylor',
		},
		{
			src: imgPaints,
			alt: 'Painted Wall',
			id: 3,
			color: '#3366FF',
			client: 'Client C',
			project: 'Painted Wall',
			credits: 'Photographer: Emily Davis, Designer: Chris Wilson',
		},
		{
			src: imgCoffee,
			alt: 'Coffee',
			id: 5,
			color: '#FF33E6',
			client: 'Client E',
			project: 'Coffee on Table',
			credits: 'Photographer: Alex Rodriguez, Designer: Olivia Moore',
		},
		{
			src: imgBicycle,
			alt: 'Bicycle',
			id: 6,
			color: '#FF33E6',
			client: 'Client F',
			project: 'Yellow Bicycle',
			credits: 'Photographer: Nikita Developer',
		}
	)
	//Initial image data setup
	imageData.value = indexImages.value[2]
	emit('ImageData', imageData.value)
})

const animateGallery = () => {
	nextTick(() => {
		Flip.from(gsapState.value, {
			duration: 0.5,
			ease: 'power1.out',
			absolute: true,
			fade: true,
		})
	})
	if (isBackgroundImage.value) {
		gsapState.value = Flip.getState('.slide_front, .slide_next, .slide')
	} else {
		gsapState.value = Flip.getState('.slide_static')
	}
}

function animateIndexGrid() {
	if (isIndexVisible.value == true) {
		gsapState.value = Flip.getState('.slide_front')
		nextTick(() => {
			Flip.from(gsapState.value, {
				targets: '.slides-index__image',
				duration: 1,
				absolute: true,
			})
		})
	}
}

const classes = ['generic', 'slide', 'slide_front', 'slide_next', 'slide_before-next']
/* 5 Images to distribute on slides */
const galleryImages = computed(() => {
	return indexImages.value.slice(0, 5)
})

const handleClickNext = () => {
	let lastItem = indexImages.value.shift()
	indexImages.value.push(lastItem)
	imageData.value = indexImages.value[2]
	emit('ImageData', imageData.value)
	animateGallery()
}

function handleClickPrev() {
	let lastItem = indexImages.value.pop()
	indexImages.value.unshift(lastItem)
	imageData.value = indexImages.value[2]
	emit('ImageData', imageData.value)
	animateGallery()
}
</script>

<template>
	<div class="slides-wrapper">
		<div v-if="isIndexVisible" class="slides-index__wrapper">
			<div class="slides-index__grid">
				<img
					v-for="(image, index) in indexImages"
					@click="handleIndexImageClick(image, index)"
					:src="image.src"
					:key="image.id"
					v-bind:data-name="image.alt"
					v-bind:data-index="{ index }"
					:style="{ backgroundColor: image.color }"
					v-bind:loading="'lazy'"
					class="slides-index__image" />
			</div>
		</div>
		<img
			v-for="(image, index) in galleryImages"
			:src="image.src"
			:key="image.id"
			v-bind:data-name="image.alt"
			:style="{ backgroundColor: image.color }"
			:class="[classes[index]]" />
		<div class="buttons-wrapper">
			<div @click="handleClickNext" class="button button_right"></div>
			<div @click="handleClickPrev" class="button button_left"></div>
		</div>
		<div class="slides-wrapper__background" :class="bgType"></div>
	</div>
</template>

<style lang="scss">
img {
	display: block;
	width: 100%;
	object-fit: cover;
}

.slides-wrapper {
	display: flex;
	align-items: center;
	justify-items: center;
	justify-content: center;
	object-fit: cover;
	height: 100%;
	width: 100%;

	&__background {
		width: 100%;
		height: 100%;
		background-size: cover;
		position: absolute;
		background-color: transparent;
		z-index: 1;
		transition: 0.6s ease;

		&_white {
			transition: 0.6s ease;
			background-color: #fff;
		}

		&_black {
			transition: 0.6s ease;
			background-color: #121212;
		}
	}
}

.images-wrapper {
	display: flex;
	align-items: center;
	justify-items: center;
	justify-content: center;
	object-fit: cover;
	height: 100%;
	width: 100%;
}

.slide {
	max-width: 2000px;
	max-height: 2000px;
	object-fit: cover;
	aspect-ratio: 3/4;
	position: absolute;
	z-index: 1;

	&_front {
		position: absolute;
		object-fit: cover;
		width: 60vh;
		max-width: 300px;
		aspect-ratio: 3/4;
		z-index: 3;

		&_hidden {
			visibility: hidden;
		}
	}

	&_next {
		position: absolute;
		object-fit: cover;
		width: 0;
		z-index: 4;
		aspect-ratio: 3/4;
	}

	&_before-next {
		max-width: 2000px;
		max-height: 2000px;
		object-fit: cover;
		aspect-ratio: 3/4;
		position: absolute;
		z-index: 3;
		display: none;
	}
}

.slides-index {
	&__wrapper {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 20;
		display: flex;
		flex-direction: column;
		justify-content: center;
		top: 4rem;
	}

	&__grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(50px, 300px));
		gap: 2rem;
		height: 100%;
		width: 100%;
		padding: 0 4rem;
	}

	&__image {
		height: 100%;
		object-fit: cover;
		max-width: 300px;
	}
}

.buttons-wrapper {
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 2;
}

.button {
	height: 100%;
	position: absolute;
	width: 50%;

	&_right {
		right: 0;
		cursor: e-resize;
	}

	&_left {
		left: 0;
		cursor: w-resize;
	}
}

img {
	display: block;
}
</style>
