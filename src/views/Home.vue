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
      <div class="d-flex justify-center">
        <iframe
          width="600"
          height="340"
          :src="`https://www.youtube.com/embed/${$t('Common.videoId')}`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
    </div>
    <div class="py-3" />

    <v-sheet
  class="mx-auto"
  elevation="8"
  width="100%"
>
    <v-slide-group
      v-model="model"
      class="pa-4"
      selected-class="bg-success"
      show-arrows
    >
      <v-slide-group-item
        v-for="n in 15"
        :key="n"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <v-card
          :class="['ma-4', selectedClass]"
          color="grey-lighten-1"
          height="150"
          width="260"
          @click="toggle"
        >
          <div class="d-flex fill-height align-center justify-center">
            <v-scale-transition>
              <v-icon
                v-if="isSelected"
                color="white"
                icon="mdi-close-circle-outline"
                size="48"
              ></v-icon>
            </v-scale-transition>
          </div>
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
              &copy;{{ new Date().getFullYear() }} <strong>EARNLUMENS</strong>
      </div>
    </v-footer>
      
      
    </v-responsive>
    
  </v-container>
</template>

<script>
  import { mapGetters } from "vuex";
  import stellarIcon from "@/assets/stellar.svg";
  import stellarBlackIcon from "@/assets/stellarBlack.svg";
  import xIcon from "@/assets/twitterx.svg";
  import xBlackIcon from "@/assets/twitterxBlack.svg";


  export default {
    data: () => ({
      drawer: false,
      menuActive: true,
      rail: true,
      drawerLocation: 'right',
      permanent: false,
      desktopView: true,
      activeItem: null,
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
