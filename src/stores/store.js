import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useSelectedBgStore = defineStore('selectedBg', () => {
	const selectedOption = ref('')
	function setSelectedBg(option) {
		selectedOption.value = option
	}
	const bgClass = computed(() => {
		if (selectedOption.value == 'black') {
			return 'slides-wrapper__background_black'
		} else if (selectedOption.value == 'white') {
			return 'slides-wrapper__background_white'
		} else {
			return 'slides-wrapper__background_image'
		}
	})
	return { selectedOption, setSelectedBg, bgClass }
})

export const useHeaderOptions = defineStore('headerOption', () => {
	const isImageInfoSelected = ref(false)
	const isAboutSelected = ref(false)
	const isIndexSelected = ref(false)

	return { isAboutSelected, isImageInfoSelected, isIndexSelected }
})

