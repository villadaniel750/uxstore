<template>
    <v-app-bar>
      <v-btn @click="rail = !rail" class="hidden-sm-and-down" icon="mdi-menu"></v-btn>
      <div style="display: flex; flex: 1; align-items: center;">
      <v-icon class="ml-3 ">
        <img :src="iconPath" alt="Fire Icon" width="24" height="24" />
      </v-icon>
      <v-toolbar-title><b class="pl-1 font-weight-bold text-button">EARNLUMENS</b></v-toolbar-title>
    </div>
  
      <div style="display: flex; flex: 1; justify-content: flex-end;">
        <cx-search-dialog v-if="true"></cx-search-dialog>
        
        <cx-language-dialog></cx-language-dialog>
        <cx-dark-light-mode v-if="!loggedIn"></cx-dark-light-mode>
        <!-- <cx-register-dialog v-if="!loggedIn"></cx-register-dialog> -->
        <cx-login-dialog v-if="!loggedIn"></cx-login-dialog>
        <cx-popover-menu v-else></cx-popover-menu>
      </div>
    </v-app-bar>
  
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      :location="drawerLocation"
      :permanent="permanent"
    >
      <v-list density="compact" nav>
        <v-tooltip :text="$t('AppBar.home')">
          <template v-slot:activator="{ props }">
            <v-list-item
              :active="activeItem === 'Home'"
              v-bind="props"
              class="hidden-sm-and-down"
              prepend-icon="mdi-home"
              :title="$t('AppBar.home')"
              value="home"
              to="/"
              exact
            ></v-list-item>
          </template>
        </v-tooltip>
  
        <v-divider class="hidden-sm-and-down"></v-divider>
  
        <!-- <v-tooltip :text="$t('AppBar.wallet')">
          <template v-slot:activator="{ props }">
            <v-list-item
              :active="activeItem === 'Wallet'"
              v-bind="props"
              class="hidden-sm-and-down"
              prepend-icon="mdi-wallet-outline"
              :title="$t('AppBar.wallet')"
              value="wallet"
              to="/wallet"
              exact
              :disabled="!loggedIn"
            ></v-list-item>
          </template>
        </v-tooltip> -->
  
        <v-tooltip :text="$t('AppBar.wallet')">
          <template v-slot:activator="{ props }">
            <v-list-item
              :active="activeItem === 'Wallet'"
              v-bind="props"
              class="hidden-sm-and-down"
              prepend-icon="mdi-wallet-outline"
              :title="$t('AppBar.wallet')"
              value="wallet"
              to="/wallet"
              exact
            ></v-list-item>
          </template>
        </v-tooltip>
  
        <v-tooltip :text="$t('AppBar.forFree')">
          <template v-slot:activator="{ props }">
            <v-list-item
              :active="activeItem === 'ForFree'"
              v-bind="props"
              prepend-icon="mdi-lock-open-outline"
              :title="$t('AppBar.forFree')"
              value="forFree"
              to="/forFree"
              exact
              :disabled="!loggedIn"
            ></v-list-item>
          </template>
        </v-tooltip>
  
        <v-tooltip :text="$t('AppBar.purchased')">
          <template v-slot:activator="{ props }">
            <v-list-item
              :active="activeItem === 'ForPurchased'"
              v-bind="props"
              prepend-icon="mdi-shopping-outline"
              :title="$t('AppBar.purchased')"
              value="purchased"
              to="/purchased"
              exact
              :disabled="!loggedIn"
            ></v-list-item>
          </template>
        </v-tooltip>
  
        <v-tooltip :text="$t('AppBar.favorites')">
          <template v-slot:activator="{ props }">
            <v-list-item
              :active="activeItem === 'Favorites'"
              v-bind="props"
              prepend-icon="mdi-heart-outline"
              :title="$t('AppBar.favorites')"
              value="favorites"
              to="/favorites"
              exact
            ></v-list-item>
          </template>
        </v-tooltip>
  
        <v-divider></v-divider>
  
        <v-tooltip :text="$t('AppBar.premieres')">
          <template v-slot:activator="{ props }">
            <v-list-item
              :active="activeItem === 'Premieres'"
              v-bind="props"
              prepend-icon="mdi-filmstrip"
              :title="$t('AppBar.premieres')"
              value="premieres"
              to="/premieres"
              exact
              :disabled="!loggedIn"
            ></v-list-item>
          </template>
        </v-tooltip>
  
        <v-tooltip :text="$t('AppBar.mostSold')">
          <template v-slot:activator="{ props }">
            <v-list-item
              :active="activeItem === 'MostSold'"
              v-bind="props"
              prepend-icon="mdi-fire"
              :title="$t('AppBar.mostSold')"
              value="mostSold"
              to="/mostsold"
              exact
              :disabled="!loggedIn"
            ></v-list-item>
          </template>
        </v-tooltip>
  
        <v-tooltip :text="$t('AppBar.offers')">
          <template v-slot:activator="{ props }">
            <v-list-item
              :active="activeItem === 'Offers'"
              v-bind="props"
              prepend-icon="mdi-tag-outline"
              :title="$t('AppBar.offers')"
              value="offers"
              to="/offers"
              exact
              :disabled="!loggedIn"
            ></v-list-item>
          </template>
        </v-tooltip>
  
        <v-tooltip :text="$t('AppBar.topRated')">
          <template v-slot:activator="{ props }">
            <v-list-item
              :active="activeItem === 'TopRated'"
              v-bind="props"
              prepend-icon="mdi-star-outline"
              :title="$t('AppBar.topRated')"
              value="topRated"
              to="/toprated"
              exact
              :disabled="!loggedIn"
            ></v-list-item>
          </template>
        </v-tooltip>
  
        <v-divider></v-divider>
  
        <v-tooltip :text="$t('AppBar.account')">
          <template v-slot:activator="{ props }">
            <v-list-item
              :active="activeItem === 'Account'"
              v-bind="props"
              prepend-icon="mdi-account-outline"
              :title="$t('AppBar.account')"
              value="account"
              to="/account"
              exact
              :disabled="!loggedIn"
            ></v-list-item>
          </template>
        </v-tooltip>
  
        <!-- Rail item is positioned at the bottom -->
  
        <v-list-item style="position: fixed; bottom: 0" @click="rail = !rail">
          <v-list-item-icon>
            <v-icon>{{
              drawerLocation === "right"
                ? rail
                  ? "mdi-chevron-left"
                  : "mdi-chevron-right"
                : rail
                ? "mdi-chevron-right"
                : "mdi-chevron-left"
            }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  
    <v-bottom-navigation class="hidden-md-and-up" :elevation="9" grow>
      <v-btn to="/" exact>
        <v-icon>mdi-home</v-icon>
        {{ $t("AppBar.home") }}
      </v-btn>
  
      <!-- <v-btn to="/wallet" exact :disabled="!loggedIn">
        <v-icon>mdi-wallet-outline</v-icon>
        {{ $t("AppBar.wallet") }}
      </v-btn> -->
  
      <v-btn to="/wallet" exact>
        <v-icon>mdi-wallet-outline</v-icon>
        {{ $t("AppBar.wallet") }}
      </v-btn>
  
      <v-btn @click="drawer = !drawer" :active="false">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  import CxLanguageDialog from "@/components/CxLanguageDialog";
  import CxLoginDialog from "@/components/CxLoginDialog";
  import CxRegisterDialog from "@/components/CxRegisterDialog";
  import CxPopoverMenu from "@/components/CxPopoverMenu.vue";
  import CxSearchDialog from "@/components/CxSearchDialog.vue";
  import CxDarkLightMode from "@/components/CxDarkLightMode.vue";
  import fireIcon from "@/assets/logo.svg";
  import fireIconBlack from "@/assets/logo-dm.svg";
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
    components: {
      CxLanguageDialog,
      CxLoginDialog,
      CxRegisterDialog,
      CxPopoverMenu,
      CxSearchDialog,
      CxDarkLightMode,
    },
    methods: {
      handleResize() {
        if (this.mobileView) {
          this.rail = false,
          this.drawer = false;
          this.drawerLocation = 'right';
          this.permanent = false;
        } else {
          if(this.windowWidth < 1264) {
            this.rail = true,
            this.drawer = true;
            this.drawerLocation = 'left';
            this.permanent = true;
          }else{
            this.rail = false,
            this.drawer = true;
            this.drawerLocation = 'left';
            this.permanent = true;
          }
          
        }
      },
    },
    mounted() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    },
    watch: {
    // Observar '$route' te permitirá manejar cada cambio de ruta
    '$route': function(to, from) {
      // Aquí, 'to' es la ruta a la que estamos yendo
      this.activeItem = to.name; // puedes usar 'name' o 'path' aquí dependiendo de lo que estés usando para tus valores de ítems
    }
    },
    created() {
      // Cuando se crea el componente, establecemos el 'activeItem' basado en la ruta actual.
      // Esto maneja la selección correcta del ítem cuando el usuario entra a una URL específica directamente.
      this.activeItem = this.$route.name; // o 'this.$route.name' si estás utilizando nombres de ruta
    },
    computed: {
      ...mapGetters([
        'mobileView', 'loggedIn', 'isDarkTheme', 'windowWidth'
      ]),
      iconPath() {
        return this.isDarkTheme ? fireIcon : fireIconBlack;
      }
    },
  };//ss
  </script>
  