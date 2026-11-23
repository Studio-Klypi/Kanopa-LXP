import { type AuthState, initialState } from '~/types/states/auth.state.ts';
import type { RegisterPayload } from '~/types/forms/register.form.ts';
import type { LoginPayload } from '~/types/forms/login.form.ts';
import type { ForgotPasswordPayload } from '~/types/forms/forgot-password.form.ts';

export const useAuth = defineStore('auth', {
  state: (): AuthState => ({ ...initialState }),
  getters: {
    translate: () => useNuxtApp().$i18n.t,

    isLoggedIn: state => !!state.user,
  },
  actions: {
    async recover() {},

    async register(payload: RegisterPayload) {
      if (this.loading.register) return;
      this.loading.register = true;

      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('[Register] Payload received', payload);
      this.loading.register = false;
    },
    async login(payload: LoginPayload) {
      if (this.loading.login) return;
      this.loading.login = true;

      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('[Login] Payload received', payload);
      this.loading.login = false;
    },

    async forgotPassword(payload: ForgotPasswordPayload) {
      if (this.loading.forgotPassword) return;
      this.loading.forgotPassword = true;

      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('[ForgotPassword] Payload received', payload);
      this.loading.forgotPassword = false;
    },
  },
});
