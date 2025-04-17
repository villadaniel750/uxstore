<template>
<v-container fluid>
    <v-list-item :active="activeItem === 'ecosystem'" v-slot:prepend="" class="mb-4">
        <v-icon color="primary" size="24">mdi-creation</v-icon>
        <v-list-item-title  class="ml-3 text-h6">
            {{ $t('AppBar.ecosystem') }}
        </v-list-item-title>
    </v-list-item>
    <v-row>
        <v-col v-for="(img, index) in paginatedImages" :key="index" cols="12" sm="6" md="4" lg="3" xl="2">
            <div>
                <CxVideo :loading="loading[index]" :lazy-src="img.lazySrc" :src="img.src" :blocked="index % 3 === 1" :isPlaylist="index % 4 === 1" :playlist-count="index + 1" title="One meets his destiny on the road he takes to avoid it destiny on the road he takes to avoid it destiny on the road he takes to avoid it destiny on the road he takes to avoid it" username="Shamus" uploadDate="2024/10/7" :profileBadge="index % 3" />
            </div>
        </v-col>
    </v-row>

    <!-- Pagination -->
    <div class="d-flex justify-center mt-6">
        <v-pagination
            v-model="currentPage"
            :length="totalPages"
            :total-visible="7"
            rounded="circle"
        ></v-pagination>
    </div>
</v-container>
</template>

<script>
import CxVideo from "@/components/media/CxVideo.vue";

export default {
    components: {
        CxVideo,
    },
    data() {
        return {
            currentPage: 1,
            itemsPerPage: 48,
            images: Array.from({
                length: 150
            }, (_, i) => {
                const index = i + 1;
                return {
                    lazySrc: `https://picsum.photos/10/6?image=${index * 5 + 10}`,
                    src: `https://picsum.photos/500/300?image=${index * 5 + 10}`,
                };
            }),
            loading: Array(150).fill(true),
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.images.length / this.itemsPerPage);
        },
        paginatedImages() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.images.slice(start, end);
        }
    },
    watch: {
        currentPage() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            this.loading = Array(this.images.length).fill(true);
            
            setTimeout(() => {
                const newLoading = [...this.loading];
                for (let i = start; i < end; i++) {
                    if (i < this.loading.length) {
                        newLoading[i] = false;
                    }
                }
                this.loading = newLoading;
            }, 1000);
        }
    },
    mounted() {
        
        setTimeout(() => {
            const newLoading = [...this.loading];
            for (let i = 0; i < this.itemsPerPage; i++) {
                if (i < this.loading.length) {
                    newLoading[i] = false;
                }
            }
            this.loading = newLoading;
        }, 1000);
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
</style>
