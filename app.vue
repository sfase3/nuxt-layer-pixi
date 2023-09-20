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

const list = ref(
  [
  {
    "position": 20,
    "price": 150,
    "multiplier": 1.5,
    "id": 0,
    "color": "purple",
    "arrows": "#6F71A2",
    "shadowColor": "#464877",
    "text": 20
  },
  {
    "position": 21,
    "price": 50000,
    "multiplier": 500,
    "id": 1,
    "color": "silver",
    "arrows": "#C5C5C5",
    "shadowColor": "#797979",
    "text": 21
  },
  {
    "position": 22,
    "price": 100,
    "multiplier": 1,
    "id": 2,
    "color": "dark-red",
    "arrows": "#C24022",
    "shadowColor": "#8E240C",
    "text": 22
  },
  {
    "position": 23,
    "price": 125,
    "multiplier": 1.25,
    "id": 3,
    "color": "dark-red",
    "arrows": "#C24022",
    "shadowColor": "#8E240C",
    "text": 23
  },
  {
    "position": 24,
    "price": 1000,
    "multiplier": 10,
    "id": 4,
    "color": "gold",
    "arrows": "#E5C239",
    "shadowColor": "#B68900",
    "text": 24
  },
  {
    "position": 25,
    "price": 200,
    "multiplier": 2,
    "id": 5,
    "color": "violet",
    "arrows": "#6F71A2",
    "shadowColor": "#464877",
    "text": 25
  },
  {
    "position": 26,
    "price": 75,
    "multiplier": 0.75,
    "id": 6,
    "color": "bronze",
    "arrows": "#E18A3E",
    "shadowColor": "#B14E00",
    "text": 26
  },
  {
    "position": 27,
    "price": 100000,
    "multiplier": 1000,
    "id": 7,
    "color": "silver",
    "arrows": "#C5C5C5",
    "shadowColor": "#797979",
    "text": 27
  },
  {
    "position": 28,
    "price": 250,
    "multiplier": 2.5,
    "id": 8,
    "color": "purple",
    "arrows": "#6F71A2",
    "shadowColor": "#464877",
    "text": 28
  },
  {
    "position": 29,
    "price": 150,
    "multiplier": 1.5,
    "id": 9,
    "color": "purple",
    "arrows": "#6F71A2",
    "shadowColor": "#464877",
    "text": 29
  },
  {
    "position": 30,
    "price": 10000,
    "multiplier": 100,
    "id": 10,
    "color": "gold",
    "arrows": "#E5C239",
    "shadowColor": "#B68900",
    "text": 30
  },
  {
    "position": 31,
    "price": 100,
    "multiplier": 1,
    "id": 11,
    "color": "dark-red",
    "arrows": "#C24022",
    "shadowColor": "#8E240C",
    "text": 31
  },
  {
    "position": 32,
    "price": 50,
    "multiplier": 0.5,
    "id": 12,
    "color": "bronze",
    "arrows": "#E18A3E",
    "shadowColor": "#B14E00",
    "text": 32
  },
  {
    "position": 33,
    "price": 25000,
    "multiplier": 250,
    "id": 13,
    "color": "gold",
    "arrows": "#E5C239",
    "shadowColor": "#B68900",
    "text": 33
  },
  {
    "position": 34,
    "price": 125,
    "multiplier": 1.25,
    "id": 14,
    "color": "dark-red",
    "arrows": "#C24022",
    "shadowColor": "#8E240C",
    "text": 34
  },
  {
    "position": 35,
    "price": 25,
    "multiplier": 0.25,
    "id": 15,
    "color": "bronze",
    "arrows": "#E18A3E",
    "shadowColor": "#B14E00",
    "text": 35
  },
  {
    "position": 36,
    "price": 5000,
    "multiplier": 50,
    "id": 16,
    "color": "gold",
    "arrows": "#E5C239",
    "shadowColor": "#B68900",
    "text": 36
  },
  {
    "position": 37,
    "price": 10,
    "multiplier": 0.1,
    "id": 17,
    "color": "bronze",
    "arrows": "#E18A3E",
    "shadowColor": "#B14E00",
    "text": 37
  }
]
)

const list2 = ref(
  [
  {
    "position": 20,
    "price": 150,
    "multiplier": 1.5,
    "id": 0,
    "color": "purple",
    "arrows": "#6F71A2",
    "shadowColor": "#464877",
    "text": 20
  },
  {
    "position": 21,
    "price": 50000,
    "multiplier": 500,
    "id": 1,
    "color": "silver",
    "arrows": "#C5C5C5",
    "shadowColor": "#797979",
    "text": 21
  },
  {
    "position": 22,
    "price": 100,
    "multiplier": 1,
    "id": 2,
    "color": "dark-red",
    "arrows": "#C24022",
    "shadowColor": "#8E240C",
    "text": 22
  },
  {
    "position": 23,
    "price": 125,
    "multiplier": 1.25,
    "id": 3,
    "color": "dark-red",
    "arrows": "#C24022",
    "shadowColor": "#8E240C",
    "text": 23
  },
  {
    "position": 24,
    "price": 1000,
    "multiplier": 10,
    "id": 4,
    "color": "gold",
    "arrows": "#E5C239",
    "shadowColor": "#B68900",
    "text": 24
  },
  {
    "position": 25,
    "price": 200,
    "multiplier": 2,
    "id": 5,
    "color": "violet",
    "arrows": "#6F71A2",
    "shadowColor": "#464877",
    "text": 252
  },
  {
    "position": 26,
    "price": 75,
    "multiplier": 0.75,
    "id": 6,
    "color": "bronze",
    "arrows": "#E18A3E",
    "shadowColor": "#B14E00",
    "text": 26
  },
  {
    "position": 27,
    "price": 100000,
    "multiplier": 1000,
    "id": 7,
    "color": "silver",
    "arrows": "#C5C5C5",
    "shadowColor": "#797979",
    "text": 27
  },
  {
    "position": 28,
    "price": 250,
    "multiplier": 2.5,
    "id": 8,
    "color": "purple",
    "arrows": "#6F71A2",
    "shadowColor": "#464877",
    "text": 28
  },
  {
    "position": 29,
    "price": 150,
    "multiplier": 1.5,
    "id": 9,
    "color": "purple",
    "arrows": "#6F71A2",
    "shadowColor": "#464877",
    "text": 29
  },
  {
    "position": 30,
    "price": 10000,
    "multiplier": 100,
    "id": 10,
    "color": "gold",
    "arrows": "#E5C239",
    "shadowColor": "#B68900",
    "text": 30
  },
  {
    "position": 31,
    "price": 100,
    "multiplier": 1,
    "id": 11,
    "color": "dark-red",
    "arrows": "#C24022",
    "shadowColor": "#8E240C",
    "text": 31
  },
  {
    "position": 32,
    "price": 50,
    "multiplier": 0.5,
    "id": 12,
    "color": "bronze",
    "arrows": "#E18A3E",
    "shadowColor": "#B14E00",
    "text": 32
  },
  {
    "position": 33,
    "price": 25000,
    "multiplier": 250,
    "id": 13,
    "color": "gold",
    "arrows": "#E5C239",
    "shadowColor": "#B68900",
    "text": 33
  },
  {
    "position": 34,
    "price": 125,
    "multiplier": 1.25,
    "id": 14,
    "color": "dark-red",
    "arrows": "#C24022",
    "shadowColor": "#8E240C",
    "text": 34
  },
  {
    "position": 35,
    "price": 2,
    "multiplier": 0.25,
    "id": 15,
    "color": "bronze",
    "arrows": "#E18A3E",
    "shadowColor": "#B14E00",
    "text": 35
  },
  {
    "position": 36,
    "price": 5000,
    "multiplier": 50,
    "id": 16,
    "color": "gold",
    "arrows": "#E5C239",
    "shadowColor": "#B68900",
    "text": 36
  },
  {
    "position": 37,
    "price": 10,
    "multiplier": 0.1,
    "id": 17,
    "color": "bronze",
    "arrows": "#E18A3E",
    "shadowColor": "#B14E00",
    "text": 37
  }
]
)

// const list2 = ref([ { "position": 25, "price": 300, "multiplier": 1.5, "color": "yellow", "arrows": "#FF7236" }, { "position": 24, "price": 100000, "multiplier": 500, "color": "yellow", "arrows": "#FF7236" }, { "position": 23, "price": 200, "multiplier": 1, "color": "yellow", "arrows": "#FF7236" }, { "position": 22, "price": 250, "multiplier": 1.25, "color": "yellow", "arrows": "#FF7236" }, { "position": 21, "price": 2000, "multiplier": 10, "color": "yellow", "arrows": "#FF7236" }, { "position": 20, "price": 400, "multiplier": 2, "color": "yellow", "arrows": "#FF7236" }, { "position": 19, "price": 150, "multiplier": 0.75, "color": "yellow", "arrows": "#FF7236" }, { "position": 18, "price": 200000, "multiplier": 1000, "color": "yellow", "arrows": "#FF7236" }, { "position": 17, "price": 500, "multiplier": 2.5, "color": "yellow", "arrows": "#FF7236" }, { "position": 16, "price": 300, "multiplier": 1.5, "color": "yellow", "arrows": "#FF7236" }, { "position": 15, "price": 20000, "multiplier": 100, "color": "yellow", "arrows": "#FF7236" }, { "position": 14, "price": 200, "multiplier": 1, "color": "yellow", "arrows": "#FF7236" }, { "position": 13, "price": 100, "multiplier": 0.5, "color": "yellow", "arrows": "#FF7236" }, { "position": 12, "price": 50000, "multiplier": 250, "color": "yellow", "arrows": "#FF7236" }, { "position": 11, "price": 250, "multiplier": 1.25, "color": "yellow", "arrows": "#FF7236" }, { "position": 10, "price": 50, "multiplier": 0.25, "color": "yellow", "arrows": "#FF7236" }, { "position": 9, "price": 10000, "multiplier": 50, "color": "yellow", "arrows": "#FF7236" }, { "position": 8, "price": 20, "multiplier": 0.1, "color": "yellow", "arrows": "#FF7236" } ]
</script>

<style>
* {
    padding: 0;
    margin: 0;
}
</style>