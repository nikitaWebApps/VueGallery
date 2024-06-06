<script setup>
import { useHeaderOptions } from '@/stores/store';
const headerOption = useHeaderOptions()
</script>

<template>
	<header class="header-grid">
		<div class="header-grid__item">Site Name</div>
		<div class="header-grid__item">About</div>
		<div @click="headerOption.isImageInfoSelected = !headerOption.isImageInfoSelected"
			class="header-grid__item">Image Info</div>
		<div @click="headerOption.isIndexSelected = !headerOption.isIndexSelected" class="header-grid__item">
			Index</div>
	</header>
</template>

<style lang="scss">
.header-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 9999;
	color: #fff;
	mix-blend-mode: difference;

	&__item {
		cursor: pointer;
	}
}
</style>
