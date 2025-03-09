<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img
        contain
        height="300"
        src="@/assets/fire.svg"
      />

      <div class="text-body-2 font-weight-light mb-n1">{{ $t("Common.welcome") }}</div>

      <h1 class="text-h3">
          <b class="font-weight-medium">EARNLUMENS</b>
      </h1>

      <div class="text-body-2 font-weight-regular pt-1 text-medium-emphasis">{{ $t("Common.shortAbout") }}</div>

      <div class="py-3" />

      <div class="d-flex justify-center">
          <v-row justify="center">
              <v-col cols="12" md="10" lg="8" xl="6">
                  <blockquote class="v-blockquote">
                      <span class="text-body-1 text-high-emphasis">{{ $t("Common.blockquote") }}</span>
                  </blockquote>
              </v-col>
          </v-row>
      </div>

      <div class="py-3" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn href="https://stellar.org/learn/lumens" min-width="164" rel="noopener noreferrer" target="_blank" variant="text">
            <img :src="stellarIconPath" alt="Twitter" style="height: 24px; width: 24px; margin-right: 8px;"/>
            {{ $t("Home.aboutXLM") }}
          </v-btn>
        </v-col>

        <v-col cols="auto">

          <v-btn
            color="primary"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            variant="flat"
            @click="this.$router.push({ name: 'WaitList' });"
          >
            <v-icon
              icon="mdi-calendar-clock"
              size="large"
              start
            />

            {{ $t("Home.joinWaitlist") }}
          </v-btn>
        </v-col>
        

        <v-col cols="auto">
          <v-btn href="https://twitter.com/earnlumens" min-width="164" rel="noopener noreferrer" target="_blank" variant="text">
            <img :src="xIconPath" alt="Twitter" style="height: 24px; width: 24px; margin-right: 8px;"/>
            {{ $t("Home.community") }}
          </v-btn>
        </v-col>
      </v-row>

      <div class="py-3" />
    <div class="py-3" />


    <v-sheet class="mx-auto" width="100%" color="transparent" elevation="0">
    <div class="d-flex justify-space-between align-center" :class="{ 'pl-13': !mobileView }">
      <v-btn href="" variant="text" class="text-h6 font-weight-bold text-h6" :ripple="false" append-icon="mdi-chevron-right" >Stellar Ecosystem</v-btn>
    </div>
    <v-slide-group v-model="model" selected-class="bg-success" :show-arrows="!mobileView">
      <v-slide-group-item v-for="(img, index) in images" :key="index" v-slot="{ isSelected, toggle, selectedClass }">
        <v-card :class="['ma-4', selectedClass]" width="260" flat tile color="transparent">          
          <CxVideo
            :lazy-src="img.lazySrc"
            :src="img.src"
            :blocked="index%3===1"
            :isPlaylist="index%4===1"
            :playlist-count="index + 1"
            title="One meets his destiny on the road he takes to avoid it destiny on the road he takes to avoid it destiny on the road he takes to avoid it destiny on the road he takes to avoid it"
            username="Shamus"
            uploadDate="2024/10/7"
            :profileBadge="index%3"
            @loadstart="loading[index] = true"
            @load="loading[index] = false"
          />
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>

  <div class="py-3" />

  <v-sheet class="mx-auto" width="100%" color="transparent" elevation="0">
    <div class="d-flex justify-space-between align-center" :class="{ 'pl-13': !mobileView }">
      <v-btn href="" variant="text" class="text-h6 font-weight-bold text-h6" :ripple="false" append-icon="mdi-chevron-right">Community</v-btn>
    </div>
    <v-slide-group v-model="model" selected-class="bg-success" :show-arrows="!mobileView">
      <v-slide-group-item v-for="(img, index) in images" :key="index" v-slot="{ isSelected, toggle, selectedClass }">
        <v-card :class="['ma-4', selectedClass]"  width="260" flat tile color="transparent">
          <CxVideo
            :lazy-src="img.lazySrc"
            :src="img.src"
            :blocked="index%3===1"
            :isPlaylist="index%4===1"
            :playlist-count="index + 1"
            title="One meets his destiny on the road he takes to avoid it destiny on the road he takes to avoid it destiny on the road he takes to avoid it destiny on the road he takes to avoid it"
            username="Shamus"
            uploadDate="2024/10/7"
            :profileBadge="index%3"
            @loadstart="loading[index] = true"
            @load="loading[index] = false"
          />
          <!-- <v-img :lazy-src="img.lazySrc" :src="img.src" alt="Image" cover class="fill-height" rounded="lg" /> -->

        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>

  <div class="py-3" />

  <v-sheet class="mx-auto" width="100%" color="transparent" elevation="0">
    <div class="d-flex justify-space-between align-center" :class="{ 'pl-13': !mobileView }">
      <v-btn href="" variant="text" class="text-h6 font-weight-bold text-h6" :ripple="false" append-icon="mdi-chevron-right">{{ $t('AppBar.featured') }}</v-btn>
    </div>
    <v-slide-group v-model="model" selected-class="bg-success" :show-arrows="!mobileView">
      <v-slide-group-item v-for="(img, index) in images" :key="index" v-slot="{ isSelected, toggle, selectedClass }">
        <v-card :class="['ma-4', selectedClass]" height="150" width="150" flat tile color="transparent">
          <v-img :lazy-src="img.lazySrc" :src="img.src" alt="Image" cover class="fill-height" rounded="circle" />
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>

  

  <v-divider></v-divider>
  
      
    <v-footer class=" text-center d-flex flex-column">
      

      <!-- <div class="d-flex justify-center">
          <v-row justify="center">
              <v-col cols="12" md="10" lg="8" xl="6">
                      <span class="text-caption">{{ $t("Common.messageToUsers") }}</span>
              </v-col>
          </v-row>
      </div>


      <v-divider></v-divider> -->

      <div class="text-overline text-medium-emphasis">
              &copy;{{ new Date().getFullYear() }} <strong>. EARNLUMENS</strong>
      </div>
    </v-footer>
      
      
    </v-responsive>
    
  </v-container>
</template>

<script>
  import { mapGetters } from "vuex";
  import stellarIcon from "@/assets/stellar.svg";
  import stellarBlackIcon from "@/assets/stellar-black.svg";
  import xIcon from "@/assets/twitterx.svg";
  import xBlackIcon from "@/assets/twitterx-black.svg";
  import CxVideo from "@/components/media/CxVideo.vue";

  export default {
    components: {
      CxVideo
    },
    data: () => ({
      drawer: false,
      menuActive: true,
      rail: true,
      drawerLocation: 'right',
      permanent: false,
      desktopView: true,
      activeItem: null,
      model: null,
      images: Array.from({ length: 15 }, (_, i) => {
        const index = i + 1;
        return {
          lazySrc: `https://picsum.photos/10/6?image=${index * 5 + 10}`,
          src: `https://picsum.photos/500/300?image=${index * 5 + 10}`
        };
      }),
      loading: Array(15).fill(false)
    }),
    methods: {

    },
    mounted() {
    },
    watch: {
    },
    created() {
      },
    computed: {
      ...mapGetters([
        'mobileView', 'loggedIn', 'isDarkTheme'
      ]),
      stellarIconPath() {
        return this.isDarkTheme ? stellarIcon : stellarBlackIcon;
      },
      xIconPath() {
        return this.isDarkTheme ? xIcon : xBlackIcon;
      }
    },
  };//ss
</script>
