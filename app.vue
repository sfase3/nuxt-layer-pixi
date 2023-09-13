<template>
    <div>
        <bit-pixi-wheel :position="p" :list="list" :spin="run" @stop="c"/>
            <div @click="handleClick">click</div>
            <div @click="list = list2">change list</div>
            <div>{{ run }}</div>
            <input type="text" v-model.number="p">
    </div>
</template>

<script setup lang="ts">

const c = () => {
    run.value = false
}
const p = shallowRef(0)
const run = ref(false);
const handleClick = () => {
    
    run.value = true;
}
const list = ref([
    {
        id: 0,
        color: 'blue',
        prize: '25',
        arrows: '#409DF1'
    },
    {
        id: 1,
        color: 'yellow',
        prize: '24',
        arrows: '#ffbd37'
    },
    {
        id: 2,
        color: 'red',
        prize: '23',
        arrows: '#FF7236'
    },
    {
        id: 3,
        color: 'violet',
        prize: '22',
        arrows: '#AF3DF2'
    },
    {
        id: 4,
        color: 'green',
        prize: '21',
        arrows: '#7AD533'
    },
    {
        id: 5,
        color: 'blue',
        prize: '20',
        arrows: '#409DF1'
    },
    {
        id: 6,
        color: 'yellow',
        prize: '19',
        arrows: '#ffbd37'
    },
    {
        id: 7,
        color: 'red',
        prize: '18',
        arrows: '#FF7236'
    },
    {
        id: 8,
        color: 'violet',
        prize: '17',
        arrows: '#AF3DF2'
    },
    {
        id: 9,
        color: 'green',
        prize: '16',
        arrows: '#7AD533'
    },
])


const list2 = ref([
    {
        id: 0,
        color: 'blue',
        prize: '1K',
        arrows: '#409DF1'
    },
    {
        id: 1,
        color: 'yellow',
        prize: '2M',
        arrows: '#ffbd37'
    },
    {
        id: 2,
        color: 'red',
        prize: '3K',
        arrows: '#FF7236'
    },
    {
        id: 3,
        color: 'violet',
        prize: '4K',
        arrows: '#AF3DF2'
    },
    {
        id: 4,
        color: 'green',
        prize: '5K',
        arrows: '#7AD533'
    },
    {
        id: 5,
        color: 'blue',
        prize: '6K',
        arrows: '#409DF1'
    },
    {
        id: 6,
        color: 'yellow',
        prize: '7M',
        arrows: '#ffbd37'
    },
    {
        id: 7,
        color: 'red',
        prize: '8K',
        arrows: '#FF7236'
    },
    {
        id: 8,
        color: 'violet',
        prize: '9k',
        arrows: '#AF3DF2'
    },
    {
        id: 9,
        color: 'green',
        prize: '10K',
        arrows: '#7AD533'
    },
])
</script>

<style>
* {
    padding: 0;
    margin: 0;
}
</style>