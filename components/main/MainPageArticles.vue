<template>
	<div class="main-page-articles">
		<div class="main-page-articles__header" :class="{ 'main-page-article__header--sort': props.withSort }">
			<div>
				<h2 v-if="props.title" class="main-page-articles__title">
					{{ props.title }}
				</h2>
				<div v-if="props.withSort" class="main-page-articles__sorting">
					<slot name="sort" />
				</div>
			</div>
		</div>
		<div class="main-page-articles__list">
			<template v-if="props.cards?.length && props.type === 'slider'">
				<Swiper :modules="[SwiperNavigation]" :slides-per-view="1" :space-between="24" :navigation="{
					nextEl: `.${swiperControlClasses.nextEl}`,
					prevEl: `.${swiperControlClasses.prevEl}`,
				}" :observer="true" class="main-page-articles__slider" :breakpoints="swiperBreakpoints" @swiper="onSwiper"
					@update="onSwiperUpdate">
					<SwiperSlide v-for="(item, i) in props.cards" :key="`main-page-articles-slide-${i}`">
						<slot name="slide" :item="item" />
					</SwiperSlide>

					<ui-button-next class="main-page-articles__slider-control" :class="swiperControlClasses.nextEl"
						direction="right" aria-hidden="true" />
					<ui-button-next class="main-page-articles__slider-control" :class="swiperControlClasses.prevEl"
						direction="left" aria-hidden="true" />
				</Swiper>
			</template>
			<div v-else>
				<div class="main-page-articles__main">
					<slot />
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import type { Swiper } from "swiper";
import { watch } from "vue";

const props = withDefaults(
	defineProps<{
		cards?: any[] | null;
		type?: "slider" | "list";
		title?: string;
		withSort?: boolean;
	}>(),
	{
		cards: () => [],
		type: "list",
		title: "",
		withSort: false,
	}
);

let swiper: Swiper;
const swiperBreakpoints = {
	1281: {
		slidesPerView: 6,
	},
	768: {
		slidesPerView: 4,
	},
	0: {
		slidesPerView: 2,
	},
};

watch(
	() => props.cards,
	() => {
		swiper?.update();
	}
);

const swiperControlClasses: {
	nextEl: string;
	prevEl: string;
} = {
	nextEl: "main-page-articles__slider-next",
	prevEl: "main-page-articles__slider-prev",
};

const onSwiper = (s: Swiper) => (swiper = s);
const onSwiperUpdate = (s: Swiper) => {
	s?.slideTo(0);
};
</script>

<style lang="scss" scoped>
.main-page-articles {
	$block: &;

	&__title {
		@include text-style(600, 35);
		margin-bottom: 20px;
		color: $text-primary;

		@include adaptive(600) {
			@include text-style(600, 25);
			margin-bottom: 10px;
		}
	}

	&__header {
		margin-bottom: 26px;
	}

	&__sorting {
		display: flex;
		gap: 15px;
	}

	&__list {
		position: relative;
	}

	&__slider {
		overflow: hidden;
		padding-bottom: 64px;

		@include adaptive(600) {
			padding-bottom: 74px;
			margin-bottom: 10px;
		}

		:deep(.swiper-slide) {
			height: auto;
			max-width: calc(100% / 6);
			margin-right: 24px;
			@include adaptive(1280) {
				max-width: calc(100% / 4);
		  }
			@include adaptive(767) {
				max-width: calc(100% / 2);
		  }
		}

		&-control {
			position: absolute;
			top: 45%;
			z-index: 10;
			transform: translateY(-50%);
			top: calc(100% - 30px);
			width: 50px;
			height: 50px;
			z-index: 10;

			@include adaptive(600) {
				width: 40px;
				height: 40px;
			}

			&[disabled] {
				visibility: hidden;
			}
		}

		&-next {
			right: 5px;
		}

		&-prev {
			left: 5px;

			@include adaptive(600) {
				right: 50px;
				left: unset;
			}
		}
	}

	&__main {
		display: grid;
		gap: 24px;
		grid-template-columns: repeat(6, calc(100% / 6 - 24px / 6 * (6 - 1)));
		grid-row-gap: 34px;

		@include adaptive(1280) {
			grid-template-columns: repeat(4, calc(100% / 4 - 24px / 4 * (4 - 1)));
		}

		@include adaptive(767) {
			grid-template-columns: repeat(2, calc(100% / 2 - 24px / 2 * (2 - 1)));
		}
	}
}
</style>
