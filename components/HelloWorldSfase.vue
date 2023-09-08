<template>
  <div ref="container">
      hello
  </div>
  <base-button @click="ab++" >+</base-button>
  <base-button @click="ab--">-</base-button>
  <div>{{ ab }}</div>
</template>

<script setup lang="ts">
const container = ref<HTMLDivElement>();

const ab = ref(0);
const app = new PIXI.Application({ 
  background: 0xff0000,
  width: 900, 
  height: 100, 
  antialias: true, 
  resolution: window.devicePixelRatio || 1, 
  autoDensity: true,

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
Promise.resolve().then(onAssetsLoaded);

const SYMBOL_SIZE = 100;

async function onAssetsLoaded() {
  const reels = [];
  const reelContainer = new PIXI.Container();

const brushsprite = await PIXI.Sprite.from('https://raw.githubusercontent.com/sfase3/nuxt-layers-vanya/main/components/maska.jpeg');
  brushsprite.width = 900;
  reelContainer.addChild(brushsprite);
  reelContainer.mask = brushsprite;

  const gradientTexture = await PIXI.Texture.from('https://raw.githubusercontent.com/sfase3/nuxt-layers-vanya/main/components/Group.svg');

  for (let i = 0; i < 1; i++) {
      rc.x = 100;
      reelContainer.addChild(rc);
    
      const reel = {
          container: rc,
          symbols: [],
          position: 0,
          previousPosition: 0
      };
      for (let j = 0; j < 10; j++) {
          const symbol = new PIXI.Sprite(gradientTexture);
          
          const text = new PIXI.Text(`${j}`, style); 
          text.anchor.set(0.5); 
          text.position.set(93 / 2, 91 / 2);

          const symbolContainer = new PIXI.Graphics();
          symbolContainer.beginFill(0, 1);
    
          symbolContainer.addChild(symbol, text);
      
          reel.symbols.push(symbolContainer); 
          rc.addChild(symbolContainer); 
      }
      reels.push(reel);   
  }
  app.stage.addChild(reelContainer);

  const margin = (app.screen.height - SYMBOL_SIZE * 1) / 1;

  reelContainer.y = margin;
  reelContainer.x = 3.5;

  const bottom = new PIXI.Graphics();

  const playText = new PIXI.Text('Spin the wheels!', style);

  playText.x = Math.round((bottom.width - playText.width) / 4);
  playText.y = app.screen.height - margin + Math.round((margin - playText.height) / 2);
  bottom.addChild(playText);

  app.stage.addChild(bottom);

  bottom.interactive = true;
  bottom.buttonMode = true;

  bottom.on('pointerdown', () => {
      startPlay();
  });

  let running = false;

  function startPlay() {
      reels[0].position = 0;
      // reels[0].previousPosition = 0;
      if (running) return;
      running = true;

      for (let i = 0; i < reels.length; i++) {
          const r = reels[i];
         
          const extra = Math.floor(Math.random() * 3);
          const target = r.position + 10 + i * 5 + extra;
          const time = 2500 + i * 600 + extra * 600;

          tweenTo(r, 'position', ab.value, time, backout(1), null, i === reels.length - 1 ? reelsComplete : null);
      }
  }

  function reelsComplete() {
      running = false;
  }

  app.ticker.add((delta) => {
      for (let i = 0; i < reels.length; i++) {
          const r = reels[i];
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

onMounted(() => {
  container.value.appendChild(app.view);
  window.addEventListener('resize', () => {
      const width = container.value.clientWidth as number;
      if (width < 900) {
          rc.x = 100 - ((900 - width) / 2);
          app.renderer.resize(width, 100);
      } else {
          rc.x = 100;
          app.renderer.resize(900, 100);
      }
  });
});
</script>