<template>
  <div>
  <div ref="container">
  </div>
  
  <div>{{ position }}</div>
  <button @click="resizer">resize</button>
</div>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js';
import gsap from 'gsap';

const props = defineProps<{
  position: number;
  list: any[];
}>();

const container = shallowRef<HTMLDivElement>();
const running = shallowRef(false);
const reels = shallowRef<any>([]);
const SYMBOL_SIZE = 100;
const STAT_WIDTH = 857;  

const app = new PIXI.Application({ 
  background: 0x181d29,
  width: 897, 
  height: 120, 
  antialias: true, 
  resolution: window.devicePixelRatio || 1, 
  autoDensity: true,
  powerPreference: 'high-performance'
});

const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 20,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'],
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440,
});

const rc = new PIXI.Container();

PIXI.Assets.load([
    '/images/yellow.svg',
    '/images/red.svg',
    '/images/blue.svg',
    '/images/green.svg',
    '/images/violet.svg'
]).then(onAssetsLoaded);

async function onAssetsLoaded() {
  
  const reelContainer = new PIXI.Container();
  const brushsprite = await PIXI.Sprite.from('/images/maska.jpeg');

  brushsprite.width = STAT_WIDTH;
  reelContainer.addChild(brushsprite);
  reelContainer.mask = brushsprite;

  for (let i = 0; i < 1; i++) {
      rc.x = 0;
      rc.y = 60;
      reelContainer.addChild(rc);
    
      const reel = {
          container: rc,
          symbols: [],
          position: 0,
          previousPosition: 0
      };
      for (let j = 0; j < 10; j++) {
        const gradientTexture = await PIXI.Texture.from(`/images/${props.list[j].color}1.svg`, {
            resourceOptions: {
            scale: 15
            },
            resolution: 15,
        });
          const symbol = new PIXI.Sprite(gradientTexture);
          symbol.anchor.set(0.5);
          //${props.list[j].text}
          const text = new PIXI.Text(`${props.list[j].text}`, style); 
        //   text.anchor.set(0.5); 
        
          text.position.set(120 / 2, 91 / 2);

          const symbolContainer = new PIXI.Graphics();
          symbolContainer.beginFill(0, 1);
    
          symbolContainer.addChild(symbol, text);
         
          reel.symbols.push(symbolContainer); 
          rc.addChild(symbolContainer); 
      }
      reels.value.push(reel);   
  }
  app.stage.addChild(reelContainer);

//   reelContainer.y = 14.5;
  reelContainer.x = 3.5;

  app.ticker.add((delta) => {
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

const tweening = [];

function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
  const tween = {
      object,
      property,
      propertyBeginValue: object[property],
      target,
      easing,
      time,
      change: onchange,
      complete: oncomplete,
      start: Date.now(),
  };
  tweening.push(tween);
//   reels.value[target-20].scale.x = 1.1;
//   reels.value[target-20].scale.y = 1.1;
  return tween;
}

app.ticker.add((delta) => {
  const now = Date.now();
  const remove = [];

  for (let i = 0; i < tweening.length; i++) {
      const t = tweening[i];
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
      tweening.splice(tweening.indexOf(remove[i]), 1);
  }
});

const lerp = (a1, a2, t) => a1 * (1 - t) + a2 * t;

const backout = (amount) => (t) => (--t * t * ((amount + 1) * t + amount) + 1);

const reelsComplete = () => running.value = false;

const startPlay = () => {
      reels.value[0].position = 0;
      reels.value[0].previousPosition = 0;
      if (running.value) return;
      running.value = true;

      for (let i = 0; i < reels.value.length; i++) {
        const r = reels.value[i]; 
        const extra = Math.floor(Math.random() * 3);
        const time = 2500 + i * 600 + extra * 600;
        setTimeout(() => {
            // sprite.style.transformOrigin = 'center center';
       
            // rc.children[props.position - 21].style.transform = 'scale(1)';
            gsap.to(rc.children[props.position - 21].scale, {
                x: 1.1, 
                y: 1.1, 
                duration: 1,
                ease: 'none'
            })            
        }, time)
        tweenTo(r, 'position', props.position, time, backout(1), null, i === reels.value.length - 1 ? reelsComplete : null);
    }
};

const resizer = () => {
    const width = document.body.clientWidth as number;
    // console.log(width)
    if (width < STAT_WIDTH) {
        // console.log(1)
        rc.x = (93 / 2) - ((897 - width) / 2);
        app.renderer.resize(width, 120);
    } else {
        // console.log(2)
        rc.x = 0;
        app.renderer.resize(STAT_WIDTH, 120);
    }
};

watch(() => props.position, () => startPlay());

onMounted(() => {
  container.value.appendChild(app.view);
  window.addEventListener('resize', resizer);
  resizer()
});

onUnmounted(() => removeEventListener('resize', resizer));
</script>