<template>
<v-container fluid>
    <v-list-item :active="activeItem === 'featured'" v-slot:prepend="" class="mb-4">
        <v-icon color="primary" size="24">mdi-star-outline</v-icon>
        <v-list-item-title  class="ml-3 text-h6">
            {{ $t('AppBar.featured') }}
        </v-list-item-title>
    </v-list-item>
    <v-row>
        <v-col v-for="(img, index) in images" :key="index" sm="6" md="4" lg="3" xl="2">
            <div class="pa-0 ma-0 d-flex justify-center">
                <CxUser :username="'username'" :profile_image_url="img.src" />
            </div>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import CxUser from "@/components/media/CxUser.vue";
export default {
    components: {
        CxUser,
    },
    data() {
        return {
            // Array de imágenes, que luego puedes reemplazar con la respuesta de tu webservice.
            images: Array.from({
                length: 18
            }, (_, i) => {
                const index = i + 1;
                return {
                    lazySrc: `https://picsum.photos/10/6?image=${index * 5 + 10}`,
                    src: `https://picsum.photos/500/300?image=${index * 5 + 10}`,
                };
            }),
            loading: Array(18).fill(false), // loading state for each image
        };
    },
};
</script>
