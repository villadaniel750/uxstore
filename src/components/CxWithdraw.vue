<template>
  <v-container>
    <v-sheet :width="size" class="mx-auto">
      <v-form ref="form" v-model="valid" @submit.prevent>
        <v-textarea v-model="address" :label="addressLabel" :rules="addressRules" rows="1" auto-grow></v-textarea>

        <v-text-field v-model="amount" :label="amountLabel" :rules="amountRules">
          <template v-slot:append-inner>
            <v-btn append-icon="mdi-format-vertical-align-top" variant="plain" @click="setAmountToMax">{{
              $t("CxWithdraw.maximum") }}</v-btn>
          </template>
        </v-text-field>

        <v-text-field ref="memoField" v-model="memo" :label="memoLabel" :rules="memoRules"></v-text-field>

        <v-btn prepend-icon="mdi-send" variant="outlined" type="submit" block color="primary" class="mt-2" rounded
          :disabled="!valid" @click="submit">{{ $t("CxWithdraw.send") }}</v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
// import { loadLanguage } from '@/main.js';
export default {
  data() {
    return {
      StellarSdk: null,
      usaldo: 125.93,
      address: "",
      amount: "",
      memo: "",
      size: 610,
      valid: false,
      addressRules: [
        v => !!v || this.$t('CxWithdraw.addressRequired'),
        v => this.isValidPublicKey(v) || this.$t('CxWithdraw.addressInvalid')
      ],
      amountRules: [
        v => !!v || this.$t('CxWithdraw.amountRequired'),
        v => !isNaN(parseFloat(v)) && isFinite(v) && parseFloat(v) > 0 || this.$t('CxWithdraw.amountInvalid'),
        v => (!isNaN(v) && v.toString().includes('.') && v.toString().split('.')[1].length <= 7) ||
          (!v.toString().includes('.')) ||
          this.$t('CxWithdraw.amountResolution'),
        v => (Number(v) <= this.usaldo - 0.1) || this.$t('CxWithdraw.amountInsufficient'),
      ],
      memoRules: [
        v => (v === undefined || v === '' || this.lengthInUtf8Bytes(v) <= 28) || this.$t('CxWithdraw.memoMaxSize'),
      ],
    };
  },
  methods: {
    withdraw() {
      console.log(this.address);
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.withdraw();
      }
    },
    setAmountToMax() {
      this.amount = this.usaldo - 1;
    },
    isValidPublicKey(destinationAddress) {
      if (this.StellarSdk) {
        let isValid = this.StellarSdk.StrKey.isValidEd25519PublicKey(destinationAddress)
        if (isValid) {
          return true
        } else {
          return false
        }
      } else {
        // The Stellar SDK library has not been loaded yet.
        if (!destinationAddress || destinationAddress.length !== 56) {
          return false;
        }
        const validCharacters = /^[A-Z0-9]+$/;
        if (!validCharacters.test(destinationAddress)) {
          return false;
        }
        if (destinationAddress[0] !== "G" || !(/[A-Z]/.test(destinationAddress[1]))) {
          return false;
        }
        return true;
      }
    },
    handleResize() {
      const windowWidth = window.innerWidth;
      if (windowWidth < 610) {
        this.size = windowWidth - 40;
      } else {
        this.size = 610;
      }
    },
    lengthInUtf8Bytes(str) {
      const encoder = new TextEncoder();
      const bytes = encoder.encode(str);
      return bytes.length;
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();

    let script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/stellar-sdk/7.0.0/stellar-sdk.min.js'
    script.onload = () => {
      this.StellarSdk = window.StellarSdk
    }
    document.head.appendChild(script)
    this.$nextTick(() => {
      this.$refs.memoField.validate()
    })
  },
  computed: {
    addressLabel() {
      return this.$t('CxWithdraw.address');
    },
    amountLabel() {
      return this.$t('CxWithdraw.amount');
    },
    memoLabel() {
      return 'Memo (' + this.$t('CxWithdraw.memo') + ')';
    },
  }
};
</script>