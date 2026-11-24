export interface AuthState {
  user: unknown | null;
  loading: {
    register: boolean;
    login: boolean;
    forgotPassword: boolean;
    resetPassword: boolean;
  };
}
export const initialState: AuthState = {
  user: null,
  loading: {
    register: false,
    login: false,
    forgotPassword: false,
    resetPassword: false,
  },
};
