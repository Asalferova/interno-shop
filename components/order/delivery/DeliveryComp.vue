<template>
	<div class="delivery-comp">
		<p class="delivery-comp__text">{{ $t('deliveryByCourier') }}</p>
		<p class="delivery-comp__text-min">{{ $t('deliveryMessage') }}</p>
		<div ref="labelRef">
		</div>
		<div v-if="address.city"
			class="delivery-comp__text-min">{{ $t('deliveryAddress') }}
			{{ address.city }}, {{ address.streetNameAndNumber }}
		</div>
		<div v-else class="delivery-comp__text-error">
			{{ $t("deliveryErrorMessage") }}
		</div>
		<div id='map' ref="mapRef" class="map"></div>
	</div>
</template>

<script lang="ts" setup>
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css'
import { useLocaleStore } from '~/store/locale';
import type { Address, CourierAddressData } from '~/types/map';

const runtimeConfig = useRuntimeConfig()
const api = runtimeConfig.public.tomTomToken

const localeStore = useLocaleStore()
const { currentLocale } = storeToRefs(localeStore)

const mapRef = ref<HTMLElement | string>('');
const labelRef = ref<HTMLElement | string>('');

const courierAddressData = ref<CourierAddressData>({ lat: null, lon: null });
const address = ref<Address>({ city: null, streetNameAndNumber: null });

const locale = computed(() => (currentLocale.value === 'ru' ? 'ru-RU' : 'en-GB'));

const mapInit = async () => {
	if (mapRef) {
		const ttMaps = await import("@tomtom-international/web-sdk-maps")
		const tt = window.tt;
		const map = ttMaps.map({
			key: api,
			container: mapRef.value,
			center: { lat: 55.755819, lng: 37.617644 },
			zoom: 10,
			language: locale.value,
		});

		const options = {
			searchOptions: {
				key: api,
				language: locale.value,
				limit: 5,
			},
			autoCompleteOptions: {
				key: api,
				language: locale.value,
			}
		}

		initSearchMarker(ttMaps)
		//@ts-ignore
		const ttSearchBox = new tt.plugins.SearchBox(tt.services, options)

		const searchBoxHTML = ttSearchBox.getSearchBoxHTML()
		searchBoxHTML.classList.add('search-input')
		//@ts-ignore
		labelRef.value.append(searchBoxHTML)

		//@ts-ignore
		const searchMarkersManager = new SearchMarkersManager(map)
		ttSearchBox.on("tomtom.searchbox.resultsfound", (e: Event) => handleResultsFound(e, searchMarkersManager, map))
		ttSearchBox.on("tomtom.searchbox.resultselected", (e: Event) => handleResultSelection(e, searchMarkersManager, map))
		ttSearchBox.on("tomtom.searchbox.resultscleared", () => handleResultClearing(searchMarkersManager, map))

		if (courierAddressData.value.lat && courierAddressData.value.lon) {
			drawMarker(courierAddressData.value.lon, courierAddressData.value.lat, map)

		}
		map.on('click', (e) => drawMarkerByClick(e, map))
	}
}

const removeMapMarkers = () => {
	const markers = document.querySelectorAll('.map-marker')
	markers.forEach((marker) => marker.remove())
}

const drawMarker = async (lon: number, lat: number, map: any) => {
	const ttMaps = await import(`@tomtom-international/web-sdk-maps`)
	const element = document.createElement('div')
	element.classList.add('map-marker')
	new ttMaps.Marker({ element }).setLngLat([lon, lat]).addTo(map)
}

const drawMarkerByClick = async (e: any, map: any) => {
	removeMapMarkers()
	drawMarker(e.lngLat.lng, e.lngLat.lat, map)
	courierAddressData.value = {
		lat: e.lngLat.lat,
		lon: e.lngLat.lng,
	}
}

const emit = defineEmits<{
  (event: 'complete', value: boolean): void;
}>();

const getAddress = async () => {
	if (courierAddressData.value.lat && courierAddressData.value.lon) {
		try {
			const response = await $fetch(`https://api.tomtom.com/search/2/reverseGeocode/${courierAddressData.value.lat},${courierAddressData.value.lon}.json?key=${api}&radius=100&language=${locale.value}`);
			const data = response;
			//@ts-ignore
			if (data && data.addresses && data.addresses.length > 0) {
				//@ts-ignore
				const city = data.addresses[0].address.countryTertiarySubdivision;
				//@ts-ignore
			  const streetNameAndNumber = data.addresses[0].address.streetNameAndNumber
				if (city === 'Moscow' || city === 'Москва' && streetNameAndNumber) {
					address.value = {
						city: city,
						streetNameAndNumber: streetNameAndNumber
					};
					emit('complete', true);
				} else {
					address.value = { city: null, streetNameAndNumber: null };
					emit('complete', false);
				}
			}
		} catch (error) {
			console.warn(error)
		}
	}
};

watch(courierAddressData, () => {
	getAddress();
}, { immediate: true });

onMounted(async () => {
	await nextTick()
	await Promise.all([
		loadScript('https://api.tomtom.com/maps-sdk-for-web/cdn/plugins/SearchBox/3.1.3-public-preview.0/SearchBox-web.js'),
		loadScript('https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.1.2-public-preview.15/services/services-web.min.js')
	]);
	mapInit()
})
</script>

<style lang="scss">
.map {
	width: 100%;
	height: 390px;
	border-radius: 9px;

	@include adaptive(600) {
		height: 190px;
	}
}

.delivery-comp {
	&__input {
		margin-bottom: 26px;
	}

	&__text {
		color: $text-primary;

		@include adaptive(600) {
			font-size: 17px;
		}
	}

	&__text-min, &__text-error {
		color: $text-primary;
		font-size: 17px;
		margin-bottom: 10px;

		@include adaptive(600) {
			font-size: 14px;
		}
	}

	&__text-error {
		color: $accent;
	}

	& :deep(.ui-input__input) {
		border: 2px solid $primary;
	}
}

.search-input {
	border: 2px solid $primary;
	margin-bottom: 25px;
	border-radius: 9px;
	height: 42px;
	background-color: $input-background;
}

.tt-search-box-input-container {
	height: 40px;
	border-radius: 9px;
	border: none;

	div {
		display: flex;
	}
}

.tt-search-box-result-list-container {
	background-color: $background;
	border-radius: 9px;
	padding: 13px;
	border: 2px solid $primary;
}

.tt-search-box-result-list {
	background-color: $background;
	cursor: pointer;
	padding-top: 5px;

	&:not(:last-child) {
		border-bottom: 1px solid $primary;
		padding-bottom: 5px;
	}

	&:last-child {
		border-bottom: none;
	}
}

.tt-search-box-result-list-text-content,
.tt-search-box-result-list-bold {
	color: $text-primary;
}

.map-marker {
	width: 28px;
	height: 28px;
	background-image: url('~/assets/icon/location.svg');
}
</style>
