<template>
  <div style="width: fit-content; background-color: #181d29;" class="w-fit">
    <ArrowUp :color="arrowColor"/>
    <div ref="container" class="mx-auto" />
    <ArrowUp :color="arrowColor" rotate/>
  </div>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import { STAT_WIDTH, SYMBOL_SIZE, lerp, resizer, style, moveReels, resetReels } from '../utils/helpers'

const props = defineProps<{
  position: number;
  spin: boolean;
  list: any[];
}>();

const emit = defineEmits<{
  (e: 'stop'): void;
}>();

const container = shallowRef<HTMLDivElement>();
const running = shallowRef(props.spin);
const arrowColor = shallowRef('#878B94');
const reels = shallowRef<any>([]);
const tweening = shallowRef([]);

const app = new PIXI.Application({ 
  background: 0x181d29,
  width: STAT_WIDTH, 
  height: 130, 
  antialias: true, 
  resolution: window.devicePixelRatio || 1, 
  autoDensity: true,
  powerPreference: 'high-performance'
});

const rc = new PIXI.Container();

PIXI.Assets.load([
    '/images/yellow.svg',
    '/images/red.svg',
    '/images/blue.svg',
    '/images/green.svg',
    '/images/violet.svg',
    '/images/bronze.svg',
    '/images/dark-red.svg',
    '/images/gold.svg',
    '/images/purple.svg',
    '/images/silver.svg'
]).then(onAssetsLoaded);

async function onAssetsLoaded() {
  
  const reelContainer = new PIXI.Container();
  const brushsprite = await PIXI.Sprite.from('/wheel/maska.jpeg');

  brushsprite.width = STAT_WIDTH;
  reelContainer.addChild(brushsprite);
  reelContainer.mask = brushsprite;

  rc.x = 50.5;
  rc.y = 65;
  reelContainer.addChild(rc);
    
  const reel = {
    container: rc,
    symbols: [],
    position: 0,
    previousPosition: 0
  };
     
  for (let j = 0; j < props.list.length; j++) {

    const gradientTexture = await PIXI.Texture.from(`/wheel/${props.list[j].color}.svg`, {
      resourceOptions: {
        scale: 15
      },
      resolution: 15,
    });

    const symbol = new PIXI.Sprite(gradientTexture);
    symbol.anchor.set(0.5);
         
    const text = new PIXI.Text(`${props.list[j].price}`, style); 
    text.position.set(0, -1.5);
    text.anchor.set(0.5)

    const symbolContainer = new PIXI.Graphics();
    symbolContainer.beginFill(0, 1);
    symbolContainer.arrowColor = props.list[j].arrows;
    symbolContainer.reelId = props.list[j].id;
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
              s.x = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
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

const startPlay = () => {
  resetReels(reels, arrowColor, rc);
  if (!running.value) {
    running.value = true;
    const time = moveReels(reels, tweening, rc, running, props.position);
    setTimeout(() => {
        const target = rc.children.find(e => e.reelPos === props.position + 2)
        console.log(target)
        gsap.to(target.scale, {
            x: 1.1, 
            y: 1.1, 
            duration: 1,
            ease: 'none'
        });
        arrowColor.value = target.arrowColor;   
        emit('stop');      
    }, time)
  };
};

const handleResize = () => resizer(app, rc)

watch(() => props.spin, (spin) => spin && startPlay());
watch(() => props.list, (list) => rc.children.forEach((reel, idx) => (reel.children[1] as PIXI.Text).text = list[idx].price));

onMounted(() => {
  container.value.appendChild(app.view);
  addEventListener('resize', handleResize);
  resizer(app, rc)
});

onUnmounted(() => removeEventListener('resize', handleResize));
</script>