<template>
  <v-container fluid>
      <v-list-item :active="activeItem === 'ecosystem'" v-slot:prepend="" class="mb-4">
          <v-icon color="primary" size="24">mdi-creation</v-icon>
          <v-list-item-title  class="ml-3 text-h6">
              {{ $t('AppBar.ecosystem') }}
          </v-list-item-title>
      </v-list-item>
      <v-row>
          <v-col 
              v-for="(img, index) in paginatedImages" 
              :key="`video-${img.id}`"
              cols="12" 
              sm="6" 
              md="4" 
              lg="3" 
              xl="2"
          >
              <div>
                  <CxVideo 
                      :loading="isItemLoading(index)" 
                      :lazy-src="img.lazySrc" 
                      :src="img.src" 
                      :blocked="img.id % 3 === 1" 
                      :isPlaylist="img.id % 4 === 1" 
                      :playlist-count="img.id + 1" 
                      title="One meets his destiny on the road he takes to avoid it destiny on the road he takes to avoid it destiny on the road he takes to avoid it destiny on the road he takes to avoid it" 
                      username="Shamus" 
                      uploadDate="2024/10/7" 
                      :profileBadge="img.id % 3" 
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
  
  export default {
      components: {
          CxVideo,
      },
      data() {
          return {
              currentPage: 1,
              itemsPerPage: 48,
              images: Array.from({ length: 160 }, (_, i) => {
                  const imageNumber = (i + 1) % 48;
                  return {
                      id: i,
                      lazySrc: `https://picsum.photos/10/6?image=${imageNumber}`,
                      src: `https://picsum.photos/500/300?image=${imageNumber}`,
                  };
              }),
              pageLoading: true,
              loadedPages: new Set(),
          };
      },
      computed: {
          totalPages() {
              return Math.ceil(this.images.length / this.itemsPerPage);
          },
          paginatedImages() {
              const start = (this.currentPage - 1) * this.itemsPerPage;
              const end = start + this.itemsPerPage;
              console.log(this.images.slice(start, end));
              return this.images.slice(start, end);
          }
      },
      methods: {
          getAbsoluteIndex(localIndex) {
              // Calculate the absolute index in the full list
              return (this.currentPage - 1) * this.itemsPerPage + localIndex;
          },
          isItemLoading(index) {
              // Check if the current page is still loading
              return !this.loadedPages.has(this.currentPage);
          },
          loadCurrentPage() {
              this.pageLoading = true;
              
              // Simulate loading delay
              setTimeout(() => {
                  this.loadedPages.add(this.currentPage);
                  this.pageLoading = false;
              }, 1000);
          }
      },
      watch: {
          currentPage: {
              immediate: true,
              handler(newPage) {
                  // Reset loading state for new page
                  if (!this.loadedPages.has(newPage)) {
                      this.loadCurrentPage();
                  }
                  
                  // Scroll to top
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
  