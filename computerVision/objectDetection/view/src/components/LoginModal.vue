<template>
  <modal :show="show" v-on:close="closeLoginModal">

    <form style="display: flex; flex-direction: column;" v-if="!forgotPassword">
    <h2>Välkommen in!</h2>
      <label>
        Email:
        <label v-if="$v.email.$error">
          <label v-if="!$v.email.required" class="error">(krävs)</label>
          <label v-else-if="!$v.email.email" class="error">(ogiltig email)</label>
        </label>
      </label>
      <input
        ref="email"
        v-model="$v.email.$model"
        placeholder="din@email.se"
        :class="status($v.email)"
        type="email"
     v-on:keyup.enter="$refs.password.focus()"
        @blur="$v.email.$touch()"
      />

      <label>
        Lösenord:
        <label v-if="$v.password.$error">
          <label v-if="!$v.password.required" class="error">(krävs)</label>
        </label>
      </label>
      <input
        v-model="$v.password.$model"
        placeholder="********"
        :class="status($v.password)"
        type="password"
        ref="password"
        @blur="$v.password.$touch()"
     v-on:keyup.enter="loginHandler(email, password)"
      />
      <custom-button
        @click="loginHandler(email, password)"
        primary
        :disabled="!$v.$anyDirty || $v.$anyError || states.login.state === 3"
      >Logga in</custom-button>
      <p
      style="margin-bottom: 18px"
          v-if="states.login.state !== 0"
          :class="{ errorMessage : states.login.state === 2, confirmMessage : states.login.state === 1, loadingMessage : states.login.state === 3}"
        >
          <font-awesome-icon
          :icon="['fas', states.login.state === 2 ? 'exclamation-triangle' : states.reset.state === 1 ? 'check-circle' : 'spinner']"
          class="icon"
          :class="states.login.state === 3 ? 'fa-pulse': null"
          ></font-awesome-icon>
          {{ states.login.msg }}
        </p>

      <a @click="forgotPassword = true" class="alignRight link">Glömt lösenord?</a>
    </form>
    <span v-else>

        <button class="back-button-top" @click="forgotPassword = false" type="button">
          <font-awesome-icon :icon="['fas', 'caret-left']"></font-awesome-icon
          >Tillbaka
        </button>
        <header>
          <h2>Glömt lösenord</h2>
          <p>För dig som redan har ett konto</p>
        </header>
        <custom-radio-button
          value="Återställ via email"
          :options="['Återställ via email', 'Återställ via personnummer']"
          v-on:click="methodToRestorePassword = $event"
        />
        <section v-if="methodToRestorePassword === 'Återställ via email'">
          <label>
            Email:
            <label v-if="$v.email.error" class="error">(ogiltigt)</label>
          </label>
          <input
            :class="status($v.email)"
            ref="forgotPasswordEmail"
            v-model="email"
            placeholder="din@email.se"
          />
            <custom-button
              :disabled="states.reset.state === 1 ||  states.reset.state === 3"
              primary
              @click="resetPasswordHandler(email)"
              >{{ sendPasswordResetHeader }}</custom-button
            >
        </section>
        <section v-else>
          <h5>Kontakta oss så hjälper vi dig!</h5>
          <div>
            <custom-button :disabled="true" primary
              >Verifiera med bank id</custom-button
            >
          </div>
        </section>
      <p
        v-if="states.reset.state !== 0"
        :class="{ errorMessage : states.reset.state === 2, confirmMessage : states.reset.state === 1, loadingMessage : states.reset.state === 3}"
      >
        <font-awesome-icon
          :icon="['fas', states.reset.state === 2 ? 'exclamation-triangle' : states.reset.state === 1 ? 'check-circle' : 'spinner']"
          class="icon"
          :class="states.reset.state === 3 ? 'fa-pulse': null"
        ></font-awesome-icon>
        {{ states.reset.msg }}
      </p>
      </span>
  </modal>
</template>

<script>
import Modal from '@/components/Modal.vue'
import CustomButton from '@/components/Button.vue'
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { status } from '@/script/validations'
import { resetPasswordAsync, loginAsync } from '@/script/auth'
import CustomRadioButton from '@/components/CustomRadioButton'

export default {
  data () {
    return {
      status,
      states: {
        login: {
          state: 0,
          msg: ''
        },
        reset: {
          state: 0,
          msg: ''
        }
      },
      email: '',
      password: '',
      forgotPassword: false,
      methodToRestorePassword: 'Återställ via email',
      sendPasswordResetHeader: 'Skicka återställningsmail'
    }
  },
  components: {
    Modal,
    CustomButton,
    CustomRadioButton
  },
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  watch: {
    showLoginModal () {
      if (this.show) {
        Vue.nextTick().then(() => {
          this.$refs.email.focus()
        })
      }
    },
    // Toggles inputfocus when change conditional render
    forgotPassword () {
      Vue.nextTick().then(() => {
        this.forgotPassword ? this.$refs.forgotPasswordEmail.focus() : this.$refs.loginEmail.focus()
      })
    }
  },
  computed: {
    ...mapGetters(['showLoginModal'])
  },
  props: ['show'],
  methods: {
    async resetPasswordHandler (email) {
      try {
        this.states.reset = {
          state: 3,
          msg: 'Återställer lösenord'
        }
        await resetPasswordAsync(email)
        this.states.reset = {
          state: 1,
          msg: 'Lösenord återställt'
        }
      } catch (err) {
        this.states.reset = {
          state: 2,
          msg: err.message || err
        }
      }
    },

    async loginHandler (email, password) {
      try {
        this.states.login = {
          state: 3,
          msg: 'Loggar in'
        }
        await loginAsync(email, password)
        this.states.login = {
          state: 1,
          msg: 'Inloggning lyckades!'
        }
        this.$router.replace('/mina-sidor')
        this.closeLoginModal()
      } catch (err) {
        this.states.login = {
          state: 2,
          msg: err.message || err
        }
      }
    },
    ...mapActions(['closeLoginModal'])
  }
}
</script>
