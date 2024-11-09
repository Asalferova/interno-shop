<template>
	<ul class="ui-rating-star list">
		<li v-for="number in ['1', '2', '3', '4', '5']" :key="number" :class="{ selected: isSelected(number) }"
			@click="handleStarClick(number)" role="radio" tabindex="0" :aria-checked="isSelected(number)"
			@keydown.enter="handleStarClick(number)" :aria-label="number">
			<ui-svg :name="'rating'" class="ui-rating-star__star"></ui-svg>
		</li>
	</ul>
</template>

<script lang="ts" setup>
const props = defineProps({
	selectedStar: {
		type: String,
		default: "",
	},
});
const emit = defineEmits(["star-selected"]);

const isSelected = (number: string) => {
	return Number(props.selectedStar) >= Number(number);
};

const handleStarClick = (number: string) => {
	emit('star-selected', number);
};
</script>


<style lang="scss" scoped>
.ui-rating-star {
	display: flex;

	&__star {
		width: 34px;
		height: 34px;
		color: rgb(201, 201, 191);

		@include adaptive(767) {
			width: 26px;
			height: 26px;
		}
	}
}

.selected {
	svg {
		color: rgb(250, 215, 14);
	}
}

li {
	cursor: pointer;
}
</style>
