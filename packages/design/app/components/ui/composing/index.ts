import type { HTMLAttributes } from 'vue';

export { default as Page } from './Page.vue';
export { default as Layout } from './Layout.vue';
export { default as Container } from './Container.vue';

export interface ContainerProps {
  class?: HTMLAttributes['class'];
}
export interface ComposingProps extends ContainerProps {
  name?: string;
}
export interface PageProps extends ComposingProps {
  seoRoot?: string;
  seoData?: {
    title: string;
    description?: string;
    author?: string;
  };
}
