import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useCookie } from 'nuxt/app';

export const useCookieStore = defineStore('cookie', () => {
    const testCookie = useCookie('testcookie', { maxAge: 60 * 60 * 24 * 365 });
    const cookiesEnabled = ref(false);

    const checkCookiesEnabled = () => {
        testCookie.value = '1';

        if (testCookie.value === '1') {
            cookiesEnabled.value = true;
        } else {
            cookiesEnabled.value = false;
        }
    };

    checkCookiesEnabled();

    return {
        cookiesEnabled: computed(() => cookiesEnabled.value)
    };
});
