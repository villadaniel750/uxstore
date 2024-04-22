<template>
    <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
        <template v-slot:activator="{ props }">
            <v-btn v-if="mobileView" v-bind="props" class="ma-2" icon="mdi-account-plus" variant="flat" type="submit"
                color="primary" size="small">
            </v-btn>

            <v-btn v-else v-bind="props" class="ma-2" prepend-icon="mdi-account-plus" variant="flat"
                type="submit" color="primary">
                {{ $t("Common.signup") }}
            </v-btn>

            
        </template>
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ $t("Common.signup") }}</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-list lines="two" subheader>
                <div
                    :style="mobileView ? '' : 'display: flex; justify-content: center; align-items: center; flex-direction: column;'">
                    <v-list-item :title="$t('CxRegisterDialog.createAnAccount')"></v-list-item>
                    <v-list-item-group>
                        <v-list-item>
                            <v-text-field :style="mobileView ? '' : 'width: 800px;'" :label="$t('Common.email')" 
                                prepend-icon="mdi-email" :rules="emailRules" v-model="email"></v-text-field>
                        </v-list-item>
                        <v-list-item>
                            <v-text-field :style="mobileView ? '' : 'width: 800px;'" :label="$t('Common.password')"
                                prepend-icon="mdi-lock" v-model="password" :rules="passwordRules" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" 
                                :type="visible ? 'text' : 'password'" @click:append-inner="visible = !visible"></v-text-field>
                        </v-list-item>
                        <v-list-item>
                            <v-text-field :style="mobileView ? '' : 'width: 800px;'" :label="$t('CxRegisterDialog.confirmPassword')"
                                prepend-icon="mdi-lock-check" v-model="confirmPassword" :rules="confirmPasswordRules" :append-inner-icon="visibleC ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="visibleC ? 'text' : 'password'" @click:append-inner="visibleC = !visibleC"></v-text-field>
                        </v-list-item>
                        <v-list-item>
                            <v-checkbox v-model="termsAgreed" label="By registering, I accept the">
                                <template v-slot:label>
                                    <div>
                                        {{ $t("CxRegisterDialog.byCreatingAccount") }}
                                        <br>
                                        <a href="/terms-and-privacy-policy" target="_blank">{{ $t("CxRegisterDialog.termsAndPrivacyPolicy") }}</a>
                                    </div>
                                </template>
                            </v-checkbox>

                        </v-list-item>
                        <v-list-item>
                            <div :style="mobileView ? '' : 'width: 800px;'">
                                <v-btn block color="primary" :disabled="!formIsValid">{{ $t("CxRegisterDialog.createAccount") }}</v-btn>
                            </div>
                        </v-list-item>
                    </v-list-item-group>
                </div>

            </v-list>
        </v-card>
    </v-dialog>
</template>
  
<script>
import { mapGetters } from "vuex";

function validateEmail(email) {
  let wep = email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return !!wep;
}

export default {
    data() {
        return {
            dialog: false,
            termsAgreed: false,
            email: '',
            emailRules: [
                v => !!v || this.$t('CxLoginDialog.emailRequired'),
                v => validateEmail(v) || this.$t('CxLoginDialog.emailMostBeValid') 
            ],
            password: '',
            passwordRules: [
                v => !!v || this.$t('CxLoginDialog.passwordRequired'),
                v => v.length >= 8 || this.$t('CxRegisterDialog.errorPassword'),
                v => /[A-Z]/.test(v) || this.$t('CxRegisterDialog.errorPassword'),
                v => /[0-9]/.test(v) || this.$t('CxRegisterDialog.errorPassword'),
            ],
            confirmPassword: '',
            confirmPasswordRules: [
                v => !!v || this.$t('CxRegisterDialog.errorConfirm'),
                v => v === this.password || this.$t('CxRegisterDialog.errorConfirm')
            ],
            visible: false,
            visibleC: false,
        }
    },
    methods: {
    isFieldValid(value, rules) {
        return rules.every(rule => rule(value) === true);
    }
    },
    computed: {
        ...mapGetters([
            'windowWidth','mobileView'
        ]),
        formIsValid() {
        return (
            this.isFieldValid(this.email, this.emailRules) &&
            this.isFieldValid(this.password, this.passwordRules) &&
            this.isFieldValid(this.confirmPassword, this.confirmPasswordRules) &&
            this.termsAgreed
        );
    }
    },
    watch: {
    password(newVal, oldVal) {
        if (newVal !== oldVal && this.confirmPassword) {
            this.confirmPassword = ''; 
        }
    }
}
}
</script>
  
<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
    transition: transform 0.2s ease-in-out;
}
</style>
  