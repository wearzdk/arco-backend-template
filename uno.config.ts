import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
} from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  content: {
    filesystem: ['**/*.{jsx,tsx,vue}'],
  },
  presets: [
    // 基础预设（Tailwind）
    presetUno(),
    // css 图标预设
    presetIcons({
      prefix: 'i-',
      collections: {
        // 引入 ./public/icons 目录下的所有 svg 图标
        // 使用方式：<i class="i-custom:filename"></i>
        custom: FileSystemIconLoader('./public/icons'),
      },
    }),
    // Attributify 预设 https://unocss.dev/presets/attributify#attributify-mode
    presetAttributify(),
  ],
  transformers: [],
  theme: {
    // 定义主题
    colors: {
      // 背景色
      ...{
        bg1: 'var(--color-bg-1)',
        bg2: 'var(--color-bg-2)',
        bg3: 'var(--color-bg-3)',
        bg4: 'var(--color-bg-4)',
        bg5: 'var(--color-bg-5)',
      },
      // 填充色
      ...{
        fill1: 'var(--color-fill-1)',
        fill2: 'var(--color-fill-2)',
        fill3: 'var(--color-fill-3)',
        fill4: 'var(--color-fill-4)',
      },
      // 文字
      ...{
        text1: 'var(--color-text-1)',
        text2: 'var(--color-text-2)',
        text3: 'var(--color-text-3)',
        text4: 'var(--color-text-4)',
      },
      // 边框色
      ...{
        border1: 'var(--color-border-1)',
        border2: 'var(--color-border-2)',
        border3: 'var(--color-border-3)',
        border4: 'var(--color-border-4)',
      },
      // 主题色
      brand: {
        primary: 'rgb(var(--primary-6))',
        5: 'rgb(var(--primary-5))',
        7: 'rgb(var(--primary-7))',
        4: 'rgb(var(--primary-4))',
        3: 'rgb(var(--primary-3))',
        2: 'rgb(var(--primary-2))',
        1: 'rgb(var(--primary-1))',
      },
    },
  },
  shortcuts: {
    center: 'flex items-center justify-center',
    hover: 'transition hover:bg-opacity-80',
    row: 'flex flex-row',
    col: 'flex flex-col',
    centerRow: 'row items-center',
    centerCol: 'col items-center',
  },
})
