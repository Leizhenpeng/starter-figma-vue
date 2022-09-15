<script setup lang="ts">
import { darkTheme, GlobalThemeOverrides } from 'naive-ui';
import logo from './assets/logo.svg';


const triggerOne = ref('This works!')
const consoleTry = () => {
    parent.postMessage({ pluginMessage: { type: 'apply-code', triggerOne: triggerOne.value } }, '*')
}

const cancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
}
const create = () => {
    parent.postMessage({ pluginMessage: { type: 'create-rectangles', count: 5 } }, '*')
}
const isDark = useDark()
const ifUseDarkTheme = computed(() => {
    if (isDark.value)
        return darkTheme
    return undefined
})
const el = ref(null)
const mainColor = useCssVar('--c-primary', el)
useTitle('Figma Plugin UI')
const themeOverrides = computed(() => {
    /**
   * js 文件下使用这个做类型提示
   * @type import('naive-ui').GlobalThemeOverrides
   */
    const custom: GlobalThemeOverrides = {
        common: {
            primaryColor: mainColor.value,
            primaryColorHover: mainColor.value,
            successColor: mainColor.value,
        },
        Button: {
            textColor: mainColor.value,
            textColorFocus: mainColor.value,
            color: mainColor.value,
            borderHover: mainColor.value,
            borderPressed: mainColor.value,
        },
    }
    return custom
})
</script>

<template>
    <div>
        <n-config-provider :theme-overrides="themeOverrides" :theme="ifUseDarkTheme">
            <div flex="~ center col">

                <img :src="logo" mt-12 w-140px h-140px />

                <div flex="~ row gap-4" mt-12>
                    <button btn @click="consoleTry">Show Console</button>
                    <button @click="create" btn>Manipulate UI</button>
                </div>
                
                <div mxa mt-10 flex="col ~ gap-4 center">
                    <n-gradient-text type="success" :size="24">
                        Vue 3 + Vite + Naive UI + Uno + VueUse
                    </n-gradient-text>
                    <n-rate />
                    
                </div>
                <button flex="~ center gap-2" mt-12 @click="cancel">
                    <div i-ph-hands-clapping icon-btn />
                    <div icon-btn>
                        See U Again
                    </div>
                </button>
            </div>
        </n-config-provider>
    </div>

</template>

<style>

</style>
