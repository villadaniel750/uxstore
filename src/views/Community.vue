<template>
    <v-container fluid class="overflow-x-hidden">
        <v-list-item :active="activeItem === 'community'" v-slot:prepend="" class="mb-4">
            <v-icon color="primary" size="24">mdi-handshake-outline</v-icon>
            <v-list-item-title  class="ml-3 text-h6">
                {{ $t('AppBar.community') }}
            </v-list-item-title>
        </v-list-item>
        <v-row>
            <v-col 
                v-for="(item, index) in paginatedItems" 
                :key="`video-${item._id}`"
                cols="12" 
                sm="6" 
                md="4" 
                lg="3" 
                xl="2"
            >
                <div>
                    <CxVideo 
                        :loading="isItemLoading(index)" 
                        :lazy-src="item.lazySrc" 
                        :src="item.src" 
                        :blocked="item.blocked" 
                        :isPlaylist="item.type === 'playlist'" 
                        :playlist-count="item.playlistCount" 
                        :title="item.title" 
                        :username="item.username" 
                        :uploadDate="formatDate(item.uploadDate)" 
                        :profileBadge="item.profileBadge" 
                        :profileImage="item.profileImageUrl"
                        :duration="item.duration"
                    />
                </div>
            </v-col>
        </v-row>
    
        <!-- Pagination -->
        <div class="d-flex justify-center mt-6">
            <v-pagination
                v-model="currentPage"
                :length="totalPages"
                :total-visible="10"
                rounded="circle"
            ></v-pagination>
        </div>
    </v-container>
    </template>
    
    <script>
    import CxVideo from "@/components/media/CxVideo.vue";
    import api from "@/api";
    
    export default {
        components: {
            CxVideo,
        },
        data() {
            return {
                currentPage: 1,
                itemsPerPage: 48,
                items: [],
                pageLoading: true,
                loadedPages: new Set(),
                totalPages: 0,
                totalElements: 0,
                // Add skeleton items for loading state
                skeletonItems: Array.from({ length: 48 }, (_, i) => ({
                    _id: `skeleton-${i}`,
                    lazySrc: '',
                    src: '',
                    blocked: false,
                    type: 'video',
                    playlistCount: 0,
                    title: '',
                    username: '',
                    uploadDate: '',
                    profileBadge: 0,
                    profileImage: '',
                    duration: 0
                }))
            };
        },
        computed: {
            paginatedItems() {
                // Return skeleton items when loading, otherwise return actual items
                return this.pageLoading ? this.skeletonItems : this.items;
            }
        },
        methods: {
            getAbsoluteIndex(localIndex) {
                return (this.currentPage - 1) * this.itemsPerPage + localIndex;
            },
            isItemLoading(index) {
                return this.pageLoading;
            },
            formatDate(dateString) {
                const date = new Date(dateString);
                return date.toLocaleDateString();
            },
            async loadCurrentPage() {
                this.pageLoading = true;
                
                try {
                    console.log(`Loading page ${this.currentPage}...`);
                    const response = await api.getCommunityVideosList(this.currentPage - 1, this.itemsPerPage);
                    
                    // Process the response data
                    let items = response.content;
                    
                    // Always replace first and last images with random images from the response
                    if (items.length > 2) {
                        // Get a random index from the middle of the array (avoiding first and last)
                        const randomIndex1 = Math.floor(Math.random() * (items.length - 2)) + 1;
                        const randomIndex2 = Math.floor(Math.random() * (items.length - 2)) + 1;
                        
                        // Replace first and last images with random images
                        items[0] = { ...items[randomIndex1] };
                        items[items.length - 1] = { ...items[randomIndex2] };
                        
                        console.log(`Replaced first and last images with random images from positions ${randomIndex1} and ${randomIndex2}`);
                    }
                    
                    this.items = items;
                    this.totalPages = response.totalPages;
                    this.totalElements = response.totalElements || response.content.length * response.totalPages;
                    this.loadedPages.add(this.currentPage);
                    
                    console.log(`Loaded ${this.items.length} items for page ${this.currentPage}`);
                } catch (error) {
                    console.error("Error loading community videos:", error);
                    // Handle error appropriately
                } finally {
                    this.pageLoading = false;
                }
            }
        },
        watch: {
            currentPage: {
                immediate: true,
                handler(newPage) {
                    // Always load the page when it changes, regardless of whether it's in loadedPages
                    this.loadCurrentPage();
                    
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }
        },
        mounted() {
            this.loadCurrentPage();
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
    