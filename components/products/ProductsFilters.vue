<template>
  <client-only>
    <form
      class="products-filters"
      @submit.prevent="acceptFilters"
      itemscope
      itemtype="http://schema.org/SearchAction"
    >
      <div class="products-filters__container">
        <div v-if="!isSmallScreen" class="products-filters__container-desktop">
          <filters-sort-menu
            v-model:selected-sort="sortParam"
            :sorts="sorts"
            :tabindex="0"
            class="products-filters__item"
						role="button"
          />
          <filters-select
            v-model:selected-option="initialFilters.subcategories[0]"
            :options="categoryAndSubcategories?.subcategories"
            :tabindex="1"
            class="products-filters__item"
            :default-label="categoryAndSubcategories.category"
            :has-interactive-label="false"
            @close="resetFilter('category')"
						role="button"
          />
          <filters-multiple-select
            v-model:selected-options="initialFilters.sellers"
            :options="uniqueSellersNames"
            :tabindex="2"
            default-label="seller"
            class="products-filters__item"
            :has-interactive-label="false"
            @close="resetFilter('seller')"
						role="button"
          />
          <filters-price-range
            v-model:from-value="initialFilters.priceFrom"
            v-model:to-value="initialFilters.priceTo"
            default-label="Price"
            :has-interactive-label="false"
            :tabindex="3"
            class="products-filters__item"
            @close="resetFilter('price')"
						role="button"
          />
          <ui-button
            v-if="showResetAllButton"
            type="submit"
            :color="'primary'"
            class="products-filters__accept"
            >{{ $t("apply") }}
          </ui-button>
          <ui-button
            v-if="showResetAllButton"
            :color="'primary'"
            class="products-filters__reset"
            @click="resetAll"
          >
            {{ $t("Reset all") }}
          </ui-button>
        </div>
        <tippy
          v-else
          theme="menu"
          tag="null"
					ref="el"
          content-tag="div"
          content-class="actions"
          interactive
          trigger="click"
          :hide-on-click="true"
          :arrow="false"
          placement="bottom-end"
        >
          <ui-button class="products-filters__btn" @click.prevent>{{ $t('filters') }}</ui-button>

          <template #content="{ hide }">
            <div class="products-filters__wrapper">
              <filters-sort-menu
                v-model:selected-sort="sortParam"
                :sorts="sorts"
                :tabindex="0"
                class="products-filters__item"
              />
              <filters-select
                v-model:selected-option="initialFilters.subcategories[0]"
                :options="categoryAndSubcategories?.subcategories"
                :tabindex="1"
                class="products-filters__item"
                :default-label="categoryAndSubcategories?.category"
                :has-interactive-label="false"
                @close="resetFilter('category')"
              />
              <filters-multiple-select
                v-model:selected-options="initialFilters.sellers"
                :options="uniqueSellersNames"
                :tabindex="2"
                default-label="seller"
                class="products-filters__item"
                :has-interactive-label="false"
                @close="resetFilter('seller')"
              />
              <filters-price-range
                v-model:from-value="initialFilters.priceFrom"
                v-model:to-value="initialFilters.priceTo"
                default-label="Price"
                :has-interactive-label="false"
                :tabindex="3"
                class="products-filters__item"
                @close="resetFilter('price')"
              />
              <ui-button
                v-if="showResetAllButton"
                type="submit"
                @click="hide()"
                :color="'primary'"
                class="products-filters__accept"
                >{{ $t("apply") }}
              </ui-button>
              <ui-button
                v-if="showResetAllButton"
                :color="'primary'"
                class="products-filters__reset"
                @click="resetAll"
              >
                {{ $t("Reset all") }}
              </ui-button>
            </div>
          </template>
        </tippy>
      </div>
    </form>
  </client-only>
</template>
<script lang="ts" setup>
import { Tippy, type TippyComponent } from "vue-tippy";
import { storeToRefs } from "pinia";
import { useMediaQuery } from "@vueuse/core";
import { computed, ref, useRoute, watch } from "#imports";
import { useProductsStore } from "~/store/products";
import { categoryOptions } from "~/helpers/filterOptions";
import { Sorting } from "~/helpers/constants";
import { removeEmptyProperties, applyQuery } from "~/utils/dataTransform";
import { useSellersStore } from "~/store/sellers";
import type { ProductsFiltersSpecs } from "~/types/products/products.item";

const productsStore = useProductsStore();
const { filtersSpecs, currentSortKey } = storeToRefs(productsStore);
const sellersStore = useSellersStore();
const { uniqueSellersNames } = storeToRefs(sellersStore);
const route = useRoute();
const isSmallScreen = useMediaQuery("(max-width: 1024px)");
const el = ref<TippyComponent | null>(null)

const filtersParams: ProductsFiltersSpecs = {
  subcategories: [],
  sellers: [],
  priceFrom: "",
  priceTo: "",
};

const sortParam = ref<Sorting>(Sorting.NEW);
const sorts: Sorting[] = [Sorting.NEW, Sorting.ASC, Sorting.DESC];

filtersSpecs.value = { ...applyQuery(route.query, filtersParams) };

const initialFilters = ref<ProductsFiltersSpecs>({
  ...filtersParams,
  ...filtersSpecs.value,
});

const getCategoryAndSubcategories = (subcategoryLabel: string) => {
  return computed(() => {
    let result = null;
    for (const cat of categoryOptions) {
      const foundSubcategory = cat.subcategories.find(
        (sub) => sub.label === subcategoryLabel
      );
      if (foundSubcategory) {
        result = {
          category: cat.label,
          subcategories: cat.subcategories,
        };
        return result;
      }
    }
    const allSubcategories = categoryOptions.flatMap(
      (cat) => cat.subcategories
    );
    return {
      subcategories: allSubcategories,
    };
  });
};

const categoryAndSubcategories = getCategoryAndSubcategories(initialFilters.value?.subcategories?.[0] || '')

const showResetAllButton = computed(() => {
  const keys = Object.keys(removeEmptyProperties(initialFilters.value));
  if (keys.length < 1) {
    return false;
  }
  return keys.length >= 1;
});

const acceptFilters = () => {
  productsStore.setFilters(removeEmptyProperties(initialFilters.value));
};

const resetFilter = (key: string, item?: string) => {
  switch (key) {
    case "price":
      initialFilters.value.priceTo = "";
      initialFilters.value.priceFrom = "";
      break;
    case "category":
      initialFilters.value.subcategories = [];
      break;
    case "seller":
      initialFilters.value.sellers = [];
      break;
  }
	acceptFilters()
};

const resetAll = () => {
  initialFilters.value = {
    subcategories: [],
    sellers: [],
    priceFrom: "",
    priceTo: "",
  };
	acceptFilters()
	hide()
};

const hide = () => {
	el.value?.hide()
}

watch(
  () => sortParam.value,
  () => {
    currentSortKey.value = sortParam.value;
  }
);
</script>
<style lang="scss" scoped>
.products-filters {
  &__container-desktop {
    display: flex;
    gap: 8px;

    &:last-of-type {
      flex-wrap: wrap;
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  & :deep(.ui-button) {
    font-size: 17px;
    border-radius: 13px;
    font-weight: 600;
    background: $primary;
    max-width: none;

    &:hover {
      background: $primary-hover;
    }
  }

  &__btn {
    color: $white;
    font-weight: 400 !important;
    height: 40px;
  }
}
</style>
