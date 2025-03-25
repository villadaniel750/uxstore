<template>
  <v-container>
    <div class="ma-6 d-flex justify-center">
      <div class="pa-2 bg-white elevation-2 d-flex align-center">
        <qrcode-vue
          :value="this.addr"
          :size="size"
          level="H"
          @click="copyTextToClipboard(this.addr)"
        />
      </div>
    </div>
    <div class="px-6 mb-6 text-center p-5 break-word">
      <span v-if="addr.length >= 15" @click="copyTextToClipboard(this.addr)">{{ this.addr }}</span>
    </div>

    <div class="text-center">
      <v-btn
        prepend-icon="mdi-content-copy"
        variant="outlined"
        type="submit"
        color="primary"
        class="mt-2 mx-auto mb-6"
        rounded
        @click="copyTextToClipboard(this.addr)"
        >{{ $t("CxDeposit.tap") }}</v-btn
      >
    </div>
    <!-- <div class="px-6 mb-1 text-center p-5 break-word hidden" >
      <p color="primary" class="text-overline font-weight-thin">
        Memo: {{ $t("CxDeposit.memo") }}
      </p>
    </div>
    <!-- agregado para pruebas -->
    <!-- <div class="px-6 mb-6 text-center text-red p-5 break-word">
      <p class="text-overline font-weight-light">
        {{ $t("CxDeposit.demo") }}
      </p>
    </div>  -->
    <!-- fin agregado para pruebas -->
  </v-container>
  <v-snackbar
    location="center"
    :color="this.textColor"
    rounded="pill"
    v-model="snackbar"
    :timeout="timeout"
  >
    <v-icon left>mdi-check</v-icon>
    {{ this.snackbarText }}
    <template v-slot:actions> </template>
  </v-snackbar>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    size: 300,
    snackbar: false,
    timeout: 2000,
    snackbarText: "",
    textColor: "success",
  }),
  components: {
    QrcodeVue,
  },
  methods: {
    handleResize() {
      if(this.windowWidth < 320) {
        this.size = this.windowWidth - 40;
      } else {
        this.size = 300;
      }
    },
    copyTextToClipboard(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            this.copySuccess();
          })
          .catch((error) => {
            this.copyError(error);
          });
      } else {
        this.fallbackCopyTextToClipboard(text);
      }
    },
    fallbackCopyTextToClipboard(text) {
      if (
        document.queryCommandSupported &&
        document.queryCommandSupported("copy")
      ) {
        var textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = 0;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          var successful = document.execCommand("copy");
          if (successful) {
            this.copySuccess();
          } else {
            this.copyError();
          }
        } catch (error) {
          this.copyError(error);
        }
        document.body.removeChild(textarea);
      } else {
        this.copyNotSupported();
      }
    },
    copySuccess() {
      this.textColor = "success";
      this.snackbarText = this.$t("CxDeposit.snackbarSuccess");
      this.snackbar = true;
    },
    copyError(error) {
      this.textColor = "error";
      this.snackbarText = this.$t("CxDeposit.snackbarError");
      if (error) {
        this.snackbarText = this.$t("CxDeposit.snackbarErrorDetails");
        console.error("Error copying text to clipboard: ", error);
      }
      this.snackbar = true;
    },
    copyNotSupported() {
      this.textColor = "error";
      this.snackbarText = this.$t("CxDeposit.snackbarNotSupported");
      this.snackbar = true;
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    
    // Set addr to lobstrPublicKey if available
    if (this.lobstrPublicKey) {
      this.$store.commit('setAddr', this.lobstrPublicKey);
    }
  },
  watch: {
    lobstrPublicKey(newValue) {
      if (newValue) {
        this.$store.commit('setAddr', newValue);
      }
    }
  },
  computed: {
    ...mapGetters([
      'windowWidth', 'addr', 'lobstrPublicKey'
    ])
  },
};
</script>
