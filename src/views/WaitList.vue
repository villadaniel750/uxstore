<template>
<v-card>
       <v-list lines="two" subheader>
          <div :style="mobileView ? '' : 'display: flex; justify-content: center; align-items: center; flex-direction: column;'">
            <v-list-item :title="$t('WaitList.joinOurWaitingList')" :disabled="isLoading"></v-list-item>
            <v-list-item-group>
              <v-list-item>
                <v-text-field :style="mobileView ? '' : 'width: 800px;'" :label="$t('Common.email')" prepend-icon="mdi-email" :rules="emailRules" v-model="email" :disabled="isLoading" type="email"></v-text-field>
              </v-list-item>

              <!-- Área de texto para feedback opcional -->
              <v-list-item>
                <v-textarea :style="mobileView ? '' : 'width: 800px;'" :label="$t('WaitList.feedbackOptional')" prepend-icon="mdi-comment-text-outline" :rules="feedbackRules" v-model="feedback" outlined :disabled="isLoading"></v-textarea>
              </v-list-item>

              <v-list-item>
                <div :style="mobileView ? '' : 'width: 800px;'">
                  <v-btn v-if="!responseOk" block :loading="isLoading" color="orange-accent-2" :disabled="!formIsValid || isLoading" @click="this.joinClicked">{{ $t("WaitList.join") }}</v-btn>
                  <v-btn v-else block color="green" @click="closeDialog">{{ $t("Common.close") }}</v-btn>
                  <v-card-text class="text-center">
                    <span class="text-orange-accent-2" v-if="this.sendingRequest">
                      {{ $t("Common.pleaseWait") }}
                    </span>
                    <span v-if="this.responseOk" class="text-green">
                      <i class="mdi mdi-check"></i>
                      {{ $t("WaitList.registeredEmailWeWillKeepYouInformed") }}
                    </span>
                    <span v-if="this.responseError" class="text-red">
                      <i class="mdi mdi-check"></i>
                      {{ $t("Common.operationFailedPleaseTryAgain") }}
                    </span>
                  </v-card-text>
                </div>
              </v-list-item>

              <!-- Captcha centrado -->
              <v-list-item class="d-flex justify-center">
                <vue-hcaptcha
                  ref="captcha69"
                  size="invisible"
                  theme="dark"
                  :sitekey="this.sitekey"
                  @verify="onVerify"
                  @closed="onClosed"
                  @challenge-expired="onChallengeExpire"
                  @error="onError"
                >
                </vue-hcaptcha>
              </v-list-item>
            </v-list-item-group>
          </div>
        </v-list>
      </v-card>
      <cx-wait-list-stats v-if="showChart"></cx-wait-list-stats>
  </template>

<script>
import { mapGetters } from "vuex";
import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";
import api from "@/api";
import CxWaitListStats from "@/components/CxWaitListStats";

function validateEmail(email) {
let wep = email.match(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
return !!wep;
}

export default {
  data() {
      return {
          showChart: true,
          sitekey: "faf7b138-4fe8-4613-bd64-861007d6800c",
          captchaToken: '',
          dialog: false,
          email: '',
          emailRules: [
              v => !!v || this.$t('CxLoginDialog.emailRequired'),
              v => validateEmail(v) || this.$t('CxLoginDialog.emailMostBeValid') 
          ],
          feedback: '',
          feedbackRules: [
            v => v.length <= 500 || this.$t('YourTranslationKey.feedbackMaxLength')
          ],
          isLoading: false,
          sendingRequest: false,
          responseOk: false,
          responseError: false,
      }
  },
  components: { VueHcaptcha, CxWaitListStats },
  methods: {
    isFieldValid(value, rules) {
        return rules.every(rule => rule(value) === true);
    },
    resetForm() {
      this.email = '';
      this.feedback = '';
      this.captchaToken = '';
      this.isLoading = false;
      this.responseOk = false;
      this.responseError = false;
    },
    closeDialog() {
      this.$router.push({ name: 'Home' });
      this.dialog = false;
      this.resetForm();
    },
    joinClicked() {
      this.responseError = false;
      this.$refs.captcha69.execute();
      this.isLoading = true;

    },
    operationFailed() {
      this.sendingRequest = false;
      this.isLoading = false;
      this.responseError = true;
    },
    operationSuccess() {
      this.sendingRequest = false;
      this.responseOk = true;
    },
    onVerify(token) {
      this.sendingRequest = true;
      this.joinWaitlist(this.email, this.feedback, token)
    },
    onClosed() {
      this.operationFailed();
      console.log("Closed");
    },
    onChallengeExpire(){
      this.operationFailed();
      console.log("Challenge expired");
    },
    onError(err){
      this.operationFailed();
      console.log("Error", err);
    },
    async joinWaitlist(email, feedback, token) {
      try {
        this.showChart = false;
        const result = await api.subscribe(email, feedback, token);
        console.log(result.status);
        console.log(result.data);
        if (result.status === 200) {
          this.operationSuccess();
        }else{
          this.operationFailed();
        }
      } catch (error) {
        this.operationFailed();
        if (error.response) {
          console.log("Error");
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      } finally {
        this.showChart = true;
      }
    },
  },
  created() {
    this.$emit('scrollToTop');
  },
  computed: {
      ...mapGetters([
          'mobileView'
      ]),
      formIsValid() {
      return (
          this.isFieldValid(this.email, this.emailRules) &&
          this.isFieldValid(this.feedback, this.feedbackRules)
      );
  }
  },
}
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
</style>
