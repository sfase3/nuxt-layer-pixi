<template>
    <div>
        <hello-world-sfase :position="p" :list="list"/>
            <div @click="p = 23">vvbsa</div>
    </div>
</template>

<script setup lang="ts">
const p = shallowRef(0)
const list = [
    {
        id: 0,
        color: 'blue',
        text: '1K'
    },
    {
        id: 1,
        color: 'yellow',
        text: '1M'
    },
    {
        id: 2,
        color: 'red',
        text: '500K2'
    },
    {
        id: 3,
        color: 'violet',
        text: '250'
    },
    {
        id: 4,
        color: 'green',
        text: '1K'
    },
    {
        id: 5,
        color: 'blue',
        text: '1K'
    },
    {
        id: 6,
        color: 'yellow',
        text: '1M'
    },
    {
        id: 7,
        color: 'red',
        text: '500K1'
    },
    {
        id: 8,
        color: 'violet',
        text: '250'
    },
    {
        id: 9,
        color: 'green',
        text: '1K'
    },
    {
        id: 10,
        color: 'blue',
        text: '1K'
    },
    {
        id: 11,
        color: 'yellow',
        text: '1M'
    },
]
</script>

<style>
* {
    padding: 0;
    margin: 0;
}
</style>