<template>
<v-container class="pa-4">
    <v-row align="center" justify="start" class="text-center">
        <!-- Imagen ajustada con skeleton loading -->
        <v-col cols="12" md="2" class="d-flex justify-center">
            <v-img :src="logoImage" class="rounded-circle" max-width="210" max-height="210" aspect-ratio="1" alt="Profile image">
                <!-- Skeleton mientras carga la imagen -->
                <template v-slot:placeholder>
                    <v-skeleton-loader type="card"></v-skeleton-loader>
                </template>
            </v-img>
        </v-col>

        <!-- Texto ajustado -->
        <v-col cols="12" md="6" class="text-left">
            <h3>@{{ this.sniped }}</h3>
            <div class="d-flex align-center">
                <h4>{{ this.sniped }}</h4>
                <div class="d-flex align-center">
                <v-img v-if="profileBadge === 1" class="d-inline-block ml-1" style="vertical-align: middle;" height="14" width="14" src="/src/assets/blue-verified-badge.svg"></v-img>
                <v-img v-if="profileBadge === 2" class="d-inline-block ml-1" style="vertical-align: middle;" height="14" width="14" src="/src/assets/yellow-verified-badge.svg"></v-img>
                </div>
            </div>
            <p>296.9K Seguidores | 323.6K Me gusta</p>
            <v-btn color="black" class="mr-2">Seguir</v-btn>
            <v-btn outlined>Mensaje</v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    props: {
        profileBadge: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            logoImage: "https://picsum.photos/210/210", // URL de imagen simulada
            sniped: window.location.pathname.substring(1).toLowerCase(),
        };
    },
};
</script>
