<script setup>
import { useSelectedBgStore } from '@/stores/store';
const bgStore = useSelectedBgStore()

function toggleClick(option) {
	bgStore.setSelectedBg(option)
}

</script>

<template>
	<footer class="footer-grid">
		<div class="footer-grid__item">Select Background:</div>
		<div class="footer-grid__item" @click="toggleClick('image')">Image</div>
		<div class="footer-grid__item" @click="toggleClick('black')">Black</div>
		<div class="footer-grid__item" @click="toggleClick('white')">White</div>
	</footer>
</template>

<style lang="scss">
.footer-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 9999;
	color: #fff;
	mix-blend-mode: difference;

	&__item {
		cursor: pointer;
	}
}

.active {
	font-weight: bold;
	text-decoration: underline;
}
</style>
