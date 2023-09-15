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
import { STAT_WIDTH, SYMBOL_SIZE, lerp, resizer, style, moveReels, resetReels, getDisplayText } from '../utils/helpers'

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
const brushsprite = shallowRef<PIXI.Sprite>();

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

const handleResize = () => resizer(app, rc, brushsprite)

await PIXI.Assets.load([
    '/wheel/yellow.svg',
    '/wheel/red.svg',
    '/wheel/blue.svg',
    '/wheel/green.svg',
    '/wheel/violet.svg',
    '/wheel/bronze.svg',
    '/wheel/dark-red.svg',
    '/wheel/gold.svg',
    '/wheel/purple.svg',
    '/wheel/silver.svg'
]).then(onAssetsLoaded);

async function onAssetsLoaded() {
  const reelContainer = new PIXI.Container();

  brushsprite.value = await PIXI.Sprite.from('/wheel/maska.png');

  brushsprite.value.width = 900;

  reelContainer.mask = brushsprite.value;
  reelContainer.addChild(brushsprite.value);

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
        scale: 20
      },
      resolution: 20,
    });

    const symbol = new PIXI.Sprite(gradientTexture);
    symbol.anchor.set(0.5);

    const displayText = props.list[j].price;
    const displayStyle = Object.create(style);
    displayStyle.dropShadowColor = props.list[j].shadowColor;

    const text = new PIXI.Text(displayText, displayStyle ); 
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

const startPlay = async () => {
  await resetReels(reels, arrowColor, rc);
  if (!running.value) {
    running.value = true;
    const time = moveReels(reels, tweening, running, props.position);
    setTimeout(() => {
        const target = rc.children.find(e => e.reelPos === props.position + 2)
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

watch(() => props.spin, (spin) => spin && startPlay());

watch(() => props.list, (list) => rc.children.forEach((reel, idx) => {
  const displayText = reel.children[1] as PIXI.Text;
  const displayTexture = reel.children[0] as PIXI.Text;

  const newStyle = Object.create(style);
  newStyle.dropShadowColor = props.list[idx].shadowColor;

  displayText.text = list[idx].price;
  displayText.style = newStyle;
  displayTexture.texture = PIXI.Texture.from(`/wheel/${list[idx].color}.svg`);
  reel.arrowColor = list[idx].arrows;
}));

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