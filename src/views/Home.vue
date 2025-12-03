<template>
<v-container fluid class="fill-height pa-0">
    <v-responsive class="fill-height">
        <!-- Hero Section conLayout de 2 columnas -->
        <v-container class="hero-section pt-8 pb-8 pb-md-16">
            <v-row align="center" class="fill-height">
                <!-- Columna Izquierda: Contenido de Texto -->
                <v-col cols="12" md="6" class="text-left pa-8 order-2 order-md-1 mt-n12 mt-md-0">
                    <div class="hero-content animate-fade-up">
                        <!-- Welcome Tag -->
                        <div class="text-overline text-primary mb-4" style="font-size: 0.875rem; letter-spacing: 2px;">
                            {{ $t("Common.welcome") }}
                        </div>
                        
                        <!-- Main Title - Extra Large -->
                        <h1 class="hero-title mb-6">
                            EARNLUMENS
                        </h1>
                        
                        <!-- Subtitle -->
                        <p class="hero-subtitle mb-8">
                            {{ $t("Common.shortAbout") }}
                        </p>
                        
                        <!-- Quote -->
                        <blockquote class="hero-quote mb-10">
                            {{ $t("Common.blockquote") }}
                        </blockquote>
                        
                        <!-- CTA Buttons -->
                        <div class="d-flex flex-wrap align-center" style="gap: 16px;">
                            <v-btn 
                                color="primary" 
                                size="x-large" 
                                variant="flat" 
                                class="px-8"
                                @click="this.$router.push({ name: 'WaitList' })"
                            >
                                <v-icon icon="mdi-calendar-clock" size="large" start />
                                {{ $t("Home.joinWaitlist") }}
                            </v-btn>
                            
                            <v-btn 
                                href="https://stellar.org/learn/lumens" 
                                size="large" 
                                variant="outlined"
                                target="_blank" 
                                rel="noopener noreferrer"
                                class="px-6"
                            >
                                <img :src="stellarIconPath" alt="Stellar" style="height: 20px; width: 20px; margin-right: 8px" />
                                {{ $t("Home.aboutXLM") }}
                            </v-btn>
                        </div>
                    </div>
                </v-col>
                
                <!-- Columna Derecha: Logo con efecto -->
                <v-col cols="12" md="6" class="d-flex justify-center align-center order-1 order-md-2">
                    <div class="logo-glow-container" style="overflow: visible; position: relative; width: 100%; max-width: 400px; aspect-ratio: 1;">
                        <div class="gargantua-effect"></div>
                        <v-img 
                            contain 
                            width="100%"
                            height="100%"
                            src="@/assets/fire.svg" 
                            class="fire-logo" 
                            style="z-index: 100; position: relative;" 
                        />
                    </div>
                </v-col>
            </v-row>
        </v-container>


        <v-sheet class="mx-auto mt-6 mt-md-12" width="100%" color="transparent" elevation="0">
            <div class="d-flex justify-space-between align-center" :class="{ 'pl-1': !mobileView }">
                <v-btn @click="$router.push({ name: 'Ecosystem' })" variant="text" class="text-h6 font-weight-bold text-h6" :ripple="false" append-icon="mdi-chevron-right">
                    Stellar {{ $t("AppBar.ecosystem") }}
                </v-btn>
            </div>
            <v-slide-group v-model="model" selected-class="bg-success" :show-arrows="!mobileView">
                <v-slide-group-item v-for="(img, index) in images" :key="index" v-slot="{ isSelected, toggle, selectedClass }">
                    <v-card :class="['ma-4', selectedClass]" width="260" flat tile color="transparent">
                        <div>
                            <CxVideo :loading="loading[index]" :lazy-src="img.lazySrc" :src="img.src" :blocked="index % 3 === 1" :is-playlist="index % 4 === 1" :playlist-count="index + 1" :title="'One meets his destiny on the road he takes to avoid it destiny on the road he takes to avoid it destiny on the road he takes to avoid it destiny on the road he takes to avoid it'" :username="'Shamus'" :upload-date="'2024/10/7'" :profile-badge="index % 3" :profile-image="img.profileImageUrl" />
                        </div>
                    </v-card>
                </v-slide-group-item>
            </v-slide-group>
        </v-sheet>

        <v-sheet class="mx-auto mt-6" width="100%" color="transparent" elevation="0">
            <div class="d-flex justify-space-between align-center" :class="{ 'pl-1': !mobileView }">
                <v-btn @click="$router.push({ name: 'Community' })" variant="text" class="text-h6 font-weight-bold" :ripple="false" append-icon="mdi-chevron-right">Community</v-btn>
            </div>
            <v-slide-group v-model="model" selected-class="bg-success" :show-arrows="!mobileView">
                <v-slide-group-item v-for="(img, index) in images" :key="index" v-slot="{ isSelected, toggle, selectedClass }">
                    <v-card :class="['ma-4', selectedClass]" width="260" flat tile color="transparent">
                        <div>
                            <CxVideo :loading="loading[index]" :lazy-src="img.lazySrc" :src="img.src" :blocked="index % 3 === 1" :isPlaylist="index % 4 === 1" :playlist-count="index + 1" title="One meets his destiny on the road he takes to avoid it destiny on the road he takes to avoid it destiny on the road he takes to avoid it destiny on the road he takes to avoid it" username="Shamus" uploadDate="2024/10/7" :profileBadge="index % 3" :profile-image="img.profileImageUrl" />
                        </div>
                    </v-card>
                </v-slide-group-item>
            </v-slide-group>
        </v-sheet>

        <v-sheet class="mx-auto mt-6" width="100%" color="transparent" elevation="0">
            <div class="d-flex justify-space-between align-center" :class="{ 'pl-1': !mobileView }">
                <v-btn @click="$router.push({ name: 'Featured' })" variant="text" class="text-h6 font-weight-bold text-h6" :ripple="false" append-icon="mdi-chevron-right">{{ $t("AppBar.featured") }}</v-btn>
            </div>
            <v-slide-group v-model="model" selected-class="bg-success" :show-arrows="!mobileView">
                <v-slide-group-item v-for="(img, index) in images" :key="index" v-slot="{ isSelected, toggle, selectedClass }">
                    <v-card :class="['ma-4', selectedClass]" height="150" width="150" flat tile color="transparent">
                        <CxUser :username="'username'" :profile_image_url="img.src" />
                    </v-card>
                </v-slide-group-item>
            </v-slide-group>
        </v-sheet>

        <v-sheet class="mx-auto mt-6" width="100%" color="transparent" elevation="0">
            <div class="d-flex justify-space-between align-center" :class="{ 'pl-1': !mobileView }, pb-2">
                <v-btn 
                    @click="$router.push({ name: 'Explore' })" 
                    variant="text" 
                    class="text-h6 font-weight-bold" 
                    :ripple="false" 
                    append-icon="mdi-chevron-right"
                >
                    {{ $t("AppBar.explore") }}
                </v-btn>
            </div>

            <v-row class="mt-1">
                <v-col 
                    v-for="(img, index) in exploreVideos" 
                    :key="`explore-${index}`" 
                    cols="12" 
                    sm="6" 
                    md="4" 
                    lg="3" 
                    xl="2"
                >
                    <div>
                        <CxVideo 
                            :loading="exploreLoading[index]" 
                            :lazy-src="img.lazySrc" 
                            :src="img.src" 
                            :blocked="index % 3 === 1" 
                            :isPlaylist="index % 4 === 1" 
                            :playlist-count="index + 1" 
                            title="One meets his destiny on the road he takes to avoid it destiny on the road he takes to avoid it destiny on the road he takes to avoid it destiny on the road he takes to avoid it" 
                            username="Shamus" 
                            uploadDate="2024/10/7" 
                            :profileBadge="index % 3" 
                            :profile-image="img.profileImageUrl" 
                        />
                    </div>
                </v-col>
            </v-row>

            <div class="d-flex justify-end mt-4 mb-16">
                <v-btn
                    @click="$router.push({ name: 'Explore' })"
                    size="small"
                    variant="outlined"
                    color="primary"
                    prepend-icon="mdi-compass-outline"
                >
                    {{ $t("Common.viewMore") }}
                </v-btn>
            </div>
        </v-sheet>

        <v-footer class="d-flex align-center justify-center px-4 position-relative">
            <div class="text-overline text-medium-emphasis">
                &copy;{{ new Date().getFullYear() }} <strong>- EARNLUMENS</strong>
            </div>
            <v-btn 
                href="https://twitter.com/earnlumens" 
                target="_blank" 
                rel="noopener noreferrer"
                variant="text" 
                icon
                class="position-absolute"
                style="right: 16px;"
            >
                <img :src="xIconPath" alt="X" style="height: 20px; width: 20px;" />
            </v-btn>
        </v-footer>

    </v-responsive>
</v-container>
</template>

<script>
import {
    mapGetters
} from "vuex";
import stellarIcon from "@/assets/stellar.svg";
import stellarBlackIcon from "@/assets/stellar-black.svg";
import xIcon from "@/assets/twitterx.svg";
import xBlackIcon from "@/assets/twitterx-black.svg";
import CxVideo from "@/components/media/CxVideo.vue";
import CxUser from "@/components/media/CxUser.vue";

export default {
    components: {
        CxVideo,
        CxUser,
    },
    data: () => ({
        drawer: false,
        menuActive: true,
        rail: true,
        drawerLocation: "right",
        permanent: false,
        desktopView: true,
        activeItem: null,
        model: null,
        images: Array.from({
                length: 15,
            },
            (_, i) => {
                const index = i + 1;
                return {
                    lazySrc: `https://picsum.photos/10/6?image=${index * 5 + 10}`,
                    src: `https://picsum.photos/500/300?image=${index * 5 + 10}`,
                    profileImageUrl: `https://picsum.photos/100/100?image=${index * 5 + 10}`,
                };
            }
        ),
        loading: Array(15).fill(true),
        recommendedVideos: Array.from({ length: 48 }, (_, i) => {
            const imageNumber = i + 1;
            return {
                lazySrc: `https://picsum.photos/10/6?image=${imageNumber}`,
                src: `https://picsum.photos/500/300?image=${imageNumber}`,
            };
        }),
        recommendedLoading: Array(48).fill(true),
        exploreVideos: Array.from({ length: 12 }, (_, i) => {
            const imageNumber = i + 1;
            return {
                lazySrc: `https://picsum.photos/10/6?image=${imageNumber}`,
                src: `https://picsum.photos/500/300?image=${imageNumber}`,
                profileImageUrl: `https://picsum.photos/100/100?image=${imageNumber}`,
            };
        }),
        exploreLoading: Array(50).fill(true),
    }),
    methods: {
        initializeLoading() {
            this.loading = Array(15).fill(true);
            setTimeout(() => {
                this.loading = Array(15).fill(false);
            }, 2000);
        },
    },
    mounted() {
        this.initializeLoading();
        setTimeout(() => {
            this.recommendedLoading = this.recommendedLoading.map(() => false);
        }, 1000);
        setTimeout(() => {
            this.exploreLoading = this.exploreLoading.map(() => false);
        }, 1000);
    },
    watch: {},
    created() {},
    computed: {
        ...mapGetters(["mobileView", "loggedIn", "isDarkTheme"]),
        stellarIconPath() {
            return this.isDarkTheme ? stellarIcon : stellarBlackIcon;
        },
        xIconPath() {
            return this.isDarkTheme ? xIcon : xBlackIcon;
        },
    },
};
</script>

<style scoped>
.v-skeleton-loader {
    border-radius: 6px;
    width: 290px;
}

.v-skeleton-loader ::v-deep .v-skeleton-loader__image {
    height: 146px;
    border-radius: 6px;
}

/* Dark mode specific styling */
:deep(.v-theme--dark) .v-skeleton-loader {
    background: rgb(18, 18, 18) !important;
}

.logo-glow-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

.gargantua-effect {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 162.5%;
    height: 162.5%;
    background: conic-gradient(from 0deg, transparent 0%, rgba(255, 109, 0, 0.1) 20%, rgba(255, 61, 0, 0.2) 50%, rgba(255, 109, 0, 0.1) 80%, transparent 100%);
    border-radius: 50%;
    filter: blur(40px);
    animation: rotate-aura 40s linear infinite;
    pointer-events: none;
    opacity: 0.6;
}

@keyframes rotate-aura {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
}

.gargantua-effect::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-15deg);
    width: 125%;
    height: 2%;
    background: linear-gradient(90deg, transparent, rgba(255, 61, 0, 0.2), rgba(255, 140, 0, 0.4), rgba(255, 61, 0, 0.2), transparent);
    filter: blur(6px) grayscale(80%);
    box-shadow: 0 0 10px rgba(255, 160, 0, 0.4);
    z-index: -1;
}

@keyframes pulse-accretion {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
    50% { transform: translate(-50%, -50%) scale(1.05); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
}



.black-hole-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px; /* Size of the ring */
    height: 100px;
    border-radius: 50%;
    background: radial-gradient(circle at center, transparent 60%, rgba(255, 160, 0, 0.8) 70%, transparent 80%);
    filter: blur(5px);
    z-index: 2;
    animation: rotate-ring 15s linear infinite;
}

.black-hole-void {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px; /* Size of the void */
    height: 80px;
    border-radius: 50%;
    background: radial-gradient(circle at center, #000 0%, #1a1a1a 70%, #333 100%);
    box-shadow: 0 0 30px 10px rgba(0, 0, 0, 0.8);
    z-index: 3;
}

.fire-logo {
    /* Simula el parpadeo y ondulación del fuego */
    animation: fire-flicker 5s ease-in-out infinite;
    transform-origin: center;
}

@keyframes fire-flicker {
    0% {
        filter: hue-rotate(0deg) brightness(1) saturate(1);
    }
    40% {
        filter: hue-rotate(8deg) brightness(1.15) saturate(1.15);
    }
    70% {
        filter: hue-rotate(-6deg) brightness(0.95) saturate(0.95);
    }
    100% {
        filter: hue-rotate(0deg) brightness(1) saturate(1);
    }
}

/* Hero Section Styles */
.hero-section {
    min-height: 70vh; /* Reduced from 100vh to pull content up */
    display: flex;
    align-items: center;
}

.hero-content {
    max-width: 600px;
}

.hero-title {
    font-size: clamp(3rem, 8vw, 5rem) !important;
    font-weight: 900 !important;
    line-height: 1.1 !important;
    letter-spacing: -2px !important;
    letter-spacing: -2px !important;
    color: rgb(var(--v-theme-on-surface));
    margin: 0;
}

.hero-subtitle {
    font-size: clamp(1.25rem, 2.5vw, 1.5rem) !important;
    line-height: 1.6 !important;
    line-height: 1.6 !important;
    color: rgba(var(--v-theme-on-surface), 0.8);
    font-weight: 400;
}

.hero-quote {
    font-size: 1.125rem !important;
    line-height: 1.8 !important;
    line-height: 1.8 !important;
    color: rgba(var(--v-theme-on-surface), 0.7);
    border-left: 4px solid #FF6D00;
    padding-left: 1.5rem;
    font-style: italic;
}

/* Animaciones de entrada */
.animate-fade-up {
    animation: fadeUp 0.8s ease-out;
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes rotate-ring {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
}

.v-skeleton-loader ::v-deep .v-skeleton-loader__avatar {
    width: 24px;
    height: 24px;
    margin-right: 2px;
}

.v-skeleton-loader ::v-deep .v-skeleton-loader__text {
    margin-top: 6px;
}

.v-skeleton-loader ::v-deep .v-skeleton-loader__list-item-avatar-two-line {
    padding: 2px;
}

.v-blockquote {
    border-left: 6px solid #FF6D00;
    background-color: rgb(var(--v-theme-surface-variant));
    padding: 24px;
    border-radius: 0 4px 4px 0;
    margin: 16px 0;
    display: block;
}

</style>
