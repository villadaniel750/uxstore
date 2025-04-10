<template>
<div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" location="bottom">
        <template v-slot:activator="{ props }">
            <v-list-item :ripple="false" v-bind="props" nav class="ma-1" :prepend-avatar="profileImageUrl"></v-list-item>
        </template>

        <v-card min-width="300">
            <v-list>
                <v-list-item :prepend-avatar="profileImageUrl" :title="email" :subtitle="username">
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
                <v-list-item>
                    <v-switch v-model="darkMode" color="amber-lighten-1" label="Dark Mode" hide-details @change="toggleTheme"></v-switch>
                </v-list-item>
                <v-list-item>
                    <v-btn color="primary" variant="text" @click="navigateToVideoUpload">
                        {{ $t("Common.upload") }}                        
                    </v-btn>
                </v-list-item>
            </v-list>
            


            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" variant="text" @click="logout">
                    {{ $t("Common.logout") }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</div>
</template>

<script>
import {
    ref,
    onMounted,
    watch
} from "vue";
import {
    useStore
} from "vuex";
import {
    useTheme
} from "vuetify";
import CxLanguageDialog from "@/components/CxLanguageDialog";
import { useRouter } from "vue-router";


export default {
    components: {
        CxLanguageDialog,
    },
    setup() {
        const router = useRouter();
        const store = useStore();
        const theme = useTheme();
        const menu = ref(false);
        const darkMode = ref(false);

        const profileImageUrl = ref(localStorage.getItem("profile_image_url") || "https://fastly.picsum.photos/id/903/1200/1200.jpg?hmac=8fD_XguoHwGB2RsVu_aX2XwhvCVXRSsvzNAh53Sjobc");
        const username = ref(localStorage.getItem("username") || "@usuario");
        const email = ref(localStorage.getItem("email") || ""); // opcional

        function navigateToVideoUpload() {
            router.push({ name: "VideoUpload"})
        }

        function toggleTheme() {
            const newTheme = darkMode.value ? "dark" : "light";
            theme.global.name.value = newTheme;

            localStorage.setItem("isDarkTheme", darkMode.value.toString());

            if (darkMode.value) {
                store.commit("setDarkThemeTrue");
            } else {
                store.commit("setDarkThemeFalse");
            }
        }

        onMounted(() => {
            const storedTheme = localStorage.getItem("isDarkTheme");
            const isDark = storedTheme ? storedTheme === "true" : theme.global.current.value.dark;

            darkMode.value = isDark;
            theme.global.name.value = isDark ? "dark" : "light";
        });

        watch(
            () => theme.global.current.value.dark,
            (newValue) => {
                darkMode.value = newValue;
            }
        );

        function logout() {
            store.commit("setLoggedInFalse");
            window.localStorage.removeItem("loggedIn");
            window.localStorage.removeItem("username");
            window.localStorage.removeItem("profile_image_url");
            window.localStorage.removeItem("email");
            window.location.reload();
        }

        return {
            menu,
            darkMode,
            toggleTheme,
            logout,
            profileImageUrl,
            username,
            email,
            navigateToVideoUpload,
        };
    },
};
</script>
