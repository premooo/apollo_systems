import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default"
declare module "../../node_modules/.pnpm/nuxt@3.14.159_@parcel+watcher@2.5.0_@types+node@22.9.0_eslint@9.14.0_jiti@2.4.0__ioredis@5.4._xtobtu3ndkb6so5vmd5pyu6emy/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}