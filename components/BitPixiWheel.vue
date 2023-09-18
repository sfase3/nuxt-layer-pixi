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
import { GlowFilter } from '@pixi/filter-glow';
import { STAT_WIDTH, SYMBOL_SIZE, lerp, resizer, style, moveReels, resetReels } from '../utils/helpers';

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
const textures = shallowRef([]);

const app = new PIXI.Application({ 
  background: 0x181d29,
  width: STAT_WIDTH, 
  height: 130, 
  antialias: true, 
  resolution: window.devicePixelRatio || 1, 
  autoDensity: true,
  powerPreference: 'high-performance',
});

const glowFilter = new GlowFilter({
  distance: 10, 
  outerStrength: 2, 
  innerStrength: 2, 
  color: 0xA040F2, 
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
]).then((e: PIXI.Texture[]) => onAssetsLoaded(e));

async function onAssetsLoaded(assets: PIXI.Texture[]) {
  textures.value = assets;
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
    const gradientTexture = textures.value[`/wheel/${props.list[j].color}.svg`] as PIXI.Texture;
    
    // gradientTexture.baseTexture.
    const symbol = new PIXI.Sprite(gradientTexture);
    symbol.anchor.set(0.5);
    symbol.texture.baseTexture.mipmap = PIXI.MIPMAP_MODES.ON;
    // symbol.texture.baseTexture.resolution = 25;
    // symbol.texture.baseTexture.setResolution(1)
    // symbol.scale.set(0.75, 0.75)
    
    // symbol.filters = [glowFilter];

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
        emit('stop');      
    }, time)
  };
};

watch(() => props.spin, (spin) => spin && startPlay());

watch(() => props.list, (list) => rc.children.forEach((reel, idx) => {
  reel.filters = [];
  const displayText = reel.children[1] as PIXI.Text;
  const displayTexture = reel.children[0] as PIXI.Text;

  const newStyle = Object.create(style);
  newStyle.dropShadowColor = props.list[idx].shadowColor;

  displayText.text = list[idx].text;
  displayText.style = newStyle;
  displayTexture.texture = textures.value[`/wheel/${list[idx].color}.svg`];
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