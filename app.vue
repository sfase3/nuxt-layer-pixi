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

const list = ref([ { "position": 25, "price": 150, "multiplier": 1.5, "color": "yellow", "arrows": "#FF7236" }, { "position": 24, "price": 50000, "multiplier": 500, "color": "yellow", "arrows": "#FF7236" }, { "position": 23, "price": 100, "multiplier": 1, "color": "yellow", "arrows": "#FF7236" }, { "position": 22, "price": 125, "multiplier": 1.25, "color": "yellow", "arrows": "#FF7236" }, { "position": 21, "price": 1000, "multiplier": 10, "color": "yellow", "arrows": "#FF7236" }, { "position": 20, "price": 200, "multiplier": 2, "color": "yellow", "arrows": "#FF7236" }, { "position": 19, "price": 75, "multiplier": 0.75, "color": "yellow", "arrows": "#FF7236" }, { "position": 18, "price": 100000, "multiplier": 1000, "color": "yellow", "arrows": "#FF7236" }, { "position": 17, "price": 250, "multiplier": 2.5, "color": "yellow", "arrows": "#FF7236" }, { "position": 16, "price": 150, "multiplier": 1.5, "color": "yellow", "arrows": "#FF7236" }, { "position": 15, "price": 10000, "multiplier": 100, "color": "yellow", "arrows": "#FF7236" }, { "position": 14, "price": 100, "multiplier": 1, "color": "yellow", "arrows": "#FF7236" }, { "position": 13, "price": 50, "multiplier": 0.5, "color": "yellow", "arrows": "#FF7236" }, { "position": 12, "price": 25000, "multiplier": 250, "color": "yellow", "arrows": "#FF7236" }, { "position": 11, "price": 125, "multiplier": 1.25, "color": "yellow", "arrows": "#FF7236" }, { "position": 10, "price": 25, "multiplier": 0.25, "color": "yellow", "arrows": "#FF7236" }, { "position": 9, "price": 5000, "multiplier": 50, "color": "yellow", "arrows": "#FF7236" }, { "position": 8, "price": 10, "multiplier": 0.1, "color": "yellow", "arrows": "#FF7236" } ])


// const list2 = ref([ { "position": 25, "price": 300, "multiplier": 1.5, "color": "yellow", "arrows": "#FF7236" }, { "position": 24, "price": 100000, "multiplier": 500, "color": "yellow", "arrows": "#FF7236" }, { "position": 23, "price": 200, "multiplier": 1, "color": "yellow", "arrows": "#FF7236" }, { "position": 22, "price": 250, "multiplier": 1.25, "color": "yellow", "arrows": "#FF7236" }, { "position": 21, "price": 2000, "multiplier": 10, "color": "yellow", "arrows": "#FF7236" }, { "position": 20, "price": 400, "multiplier": 2, "color": "yellow", "arrows": "#FF7236" }, { "position": 19, "price": 150, "multiplier": 0.75, "color": "yellow", "arrows": "#FF7236" }, { "position": 18, "price": 200000, "multiplier": 1000, "color": "yellow", "arrows": "#FF7236" }, { "position": 17, "price": 500, "multiplier": 2.5, "color": "yellow", "arrows": "#FF7236" }, { "position": 16, "price": 300, "multiplier": 1.5, "color": "yellow", "arrows": "#FF7236" }, { "position": 15, "price": 20000, "multiplier": 100, "color": "yellow", "arrows": "#FF7236" }, { "position": 14, "price": 200, "multiplier": 1, "color": "yellow", "arrows": "#FF7236" }, { "position": 13, "price": 100, "multiplier": 0.5, "color": "yellow", "arrows": "#FF7236" }, { "position": 12, "price": 50000, "multiplier": 250, "color": "yellow", "arrows": "#FF7236" }, { "position": 11, "price": 250, "multiplier": 1.25, "color": "yellow", "arrows": "#FF7236" }, { "position": 10, "price": 50, "multiplier": 0.25, "color": "yellow", "arrows": "#FF7236" }, { "position": 9, "price": 10000, "multiplier": 50, "color": "yellow", "arrows": "#FF7236" }, { "position": 8, "price": 20, "multiplier": 0.1, "color": "yellow", "arrows": "#FF7236" } ]
</script>

<style>
* {
    padding: 0;
    margin: 0;
}
</style>