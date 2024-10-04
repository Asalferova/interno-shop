<template>
  <div class="main-page-banner">
    <template v-if="props.banners?.length">
      <Swiper
        :modules="[SwiperPagination, SwiperAutoplay]"
        :slides-per-view="1"
        :observer="true"
        @swiper="onSwiper"
        @update="onSwiperUpdate"
        :autoplay="{
          delay: 8000,
          disableOnInteraction: false,
        }"
        :pagination="{
          el: '.swiper-pagination',
          clickable: true,
        }"
      >
        <SwiperSlide
          v-for="(item, i) in props.banners"
          :key="`main-page-banner-slide-${i}`"
        >
          <nuxt-link :to="item.url" target="_blank"
            ><img :src="item?.imageUrl" alt="ads" class="main-page-banner__img"
          /></nuxt-link>
        </SwiperSlide>
        <div
          class="main-page-banner__swiper-pagination swiper-pagination"
        ></div>
      </Swiper>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { Swiper } from "swiper";
import type { Banner } from "~/types/ads";

const props = withDefaults(
  defineProps<{
    banners: Banner[] | null;
  }>(),
  {
    banners: () => [],
  }
);

let swiper: Swiper;

watch(
  () => props.banners,
  () => {
    swiper?.update();
  }
);

const onSwiper = (s: Swiper) => (swiper = s);
const onSwiperUpdate = (s: Swiper) => {
  s?.slideTo(0);
};
</script>

<style lang="scss" scoped>
.main-page-banner {
  border-radius: 16px;
  flex: 1 1 auto;
  height: 188px;
  overflow: hidden;
  margin-bottom: 34px;

  :deep(.swiper) {
    height: 100%;
  }

  :deep(.swiper-pagination-bullet) {
    background-color: $primary !important;
    opacity: 1 !important;
  }

  :deep(.swiper-pagination-bullet-active) {
    background-color: $text-secondary !important;
  }

  @include adaptive(920) {
    height: auto;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }
}
</style>
