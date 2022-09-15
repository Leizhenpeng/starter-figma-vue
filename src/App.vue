<script setup>
import { ref } from 'vue'
const triggerOne = ref('This works!')
const consoleTry = () => {
    parent.postMessage({ pluginMessage: { type: 'apply-code', triggerOne: triggerOne.value } }, '*')
}

const cancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
}
const create = () => {
    parent.postMessage({ pluginMessage: { type: 'create-rectangles', count:5 } }, '*')
}
</script>

<template>
    <div flex="~ center col" >
        <img  src="./assets/logo.png" :style="{
            height: '100px',
            width: '100px',
        }"/>
    
        <div flex="~ row gap-4 max-w-500px">
            <button btn @click="consoleTry">console</button>
            <button @click="create" btn >creat</button>
            <button @click="cancel" btn>cancel</button>
        </div>
    </div>
</template>

<style>
</style>
