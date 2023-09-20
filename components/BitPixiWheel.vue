<template>
  <div class="w-fit bg-[#181d29]">
    <ArrowUp :color="arrowColor"/>
    <div ref="container" class="mx-auto" />
    <ArrowUp :color="arrowColor" rotate/>
  </div>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import { STAT_WIDTH, rc, glowFilter, lerp, resizer, style, moveReels, resetReels, changeList } from '../utils/helpers';

const props = defineProps<{
  position: number;
  spin: boolean;
  list: List[];
}>();

const emit = defineEmits<{
  (e: 'stop'): void;
}>();

const container = shallowRef<HTMLDivElement>();
const running = shallowRef(props.spin);
const arrowColor = shallowRef('#878B94');
const reels = shallowRef<any>([]);
const tweening = shallowRef([]);
const brushsprite = shallowRef<PIXI.Sprite>();
const textures = shallowRef([]);
const symbolSize = shallowRef(100);

const app = new PIXI.Application({ 
  background: 0x181d29,
  width: STAT_WIDTH, 
  height: 130, 
  antialias: true, 
  resolution: window.devicePixelRatio || 1, 
  autoDensity: true,
  powerPreference: 'high-performance',
});

const handleResize = () => {
  symbolSize.value = document.body.clientWidth > 320 ? 100 : 82;
  resizer(app, brushsprite);
}

await PIXI.Assets.load([
    '/wheel/yellow.png',
    '/wheel/red.png',
    '/wheel/blue.png',
    '/wheel/green.png',
    '/wheel/violet.png',
    '/wheel/bronze.png',
    '/wheel/dark-red.png',
    '/wheel/gold.png',
    '/wheel/purple.png',
    '/wheel/silver.png'
]).then((e: PIXI.Texture[]) => onAssetsLoaded(e));

async function onAssetsLoaded(assets: PIXI.Texture[]) {
  textures.value = assets;

  const reelContainer = new PIXI.Container();
  brushsprite.value = await PIXI.Sprite.from('/wheel/maska.png');
  brushsprite.value.width = 900;
  reelContainer.mask = brushsprite.value;
  reelContainer.addChild(brushsprite.value);
  reelContainer.addChild(rc);
    
  const reel = {
    container: rc,
    symbols: [],
    position: 0,
    previousPosition: 0
  };
     
  for (let j = 0; j < props.list.length; j++) {
    const gradientTexture = textures.value[`/wheel/${props.list[j].color}.png`] as PIXI.Texture;
    
    const symbol = new PIXI.Sprite(gradientTexture);
    symbol.anchor.set(0.5);

    const displayText = props.list[j].text;
    const displayStyle = Object.create(style);
    displayStyle.dropShadowColor = props.list[j].shadowColor;

    const text = new PIXI.Text(displayText, displayStyle); 
    text.position.set(0, -1.5);
    text.anchor.set(0.5)

    const symbolContainer = new PIXI.Graphics();
    symbolContainer.beginFill(0, 1);
    symbolContainer.arrowColor = props.list[j].arrows;
    symbolContainer.reelPos = props.list[j].position;

    symbolContainer.addChild(symbol, text);

    reel.symbols.push(symbolContainer); 
    rc.addChild(symbolContainer); 
    }

    reels.value.push(reel);   
    reelContainer.x = 0;
    app.stage.addChild(reelContainer);
    
    app.ticker.add(() => {
      for (let i = 0; i < reels.value.length; i++) {
          const r = reels.value[i];
          r.previousPosition = r.position;
          for (let j = 0; j < r.symbols.length; j++) {
              const s = r.symbols[j];
              s.x = ((r.position + j) % r.symbols.length) * symbolSize.value - symbolSize.value;
          }
      }
  });
}

app.ticker.add(() => {
  const now = Date.now();
  const remove = [];

  for (let i = 0; i < tweening.value.length; i++) {
      const t = tweening.value[i];
      const phase = Math.min(1, (now - t.start) / t.time);

      t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
      if (t.change) t.change(t);
      if (phase === 1) {
          t.object[t.property] = t.target;
          if (t.complete) t.complete(t);
          remove.push(t);
      }
  }
  for (let i = 0; i < remove.length; i++) {
      tweening.value.splice(tweening.value.indexOf(remove[i]), 1);
  }
});

const startPlay = async () => {
  await resetReels(reels, arrowColor);

  if (!running.value) {
    running.value = true;
    try {
      const time = moveReels(reels, tweening, running, (3 - ((props.position - 20) * 2) + props.position));
      
      setTimeout(() => {
          const target = rc.children.find(e => e.reelPos === props.position)
          glowFilter.color = +`0x${target.arrowColor.slice(1)}`;
          target.filters = [ glowFilter ];
       
          gsap.to(target.scale, {
              x: 1.1, 
              y: 1.1, 
              duration: 1,
              ease: 'none'
          });
          arrowColor.value = target.arrowColor;   

          setTimeout(() => emit('stop'), 2000);
      }, time)
      } catch (err) {
        console.log('pixi: ', err);
      }
    };
};

watch(() => props.spin, (spin) => spin && startPlay());

watch(() => props.list, (list) => changeList(list, textures));

onMounted(() => {
  container.value.appendChild(app.view);
  addEventListener('resize', handleResize);
  handleResize();
});

onBeforeUnmount(() => {
  app.destroy(true);
  removeEventListener('resize', handleResize)
})
</script>