import * as PIXI from 'pixi.js';
import { Ref } from 'vue';

export const SYMBOL_SIZE = 100;
export const STAT_WIDTH = 900;  

export const lerp = (a1, a2, t) => a1 * (1 - t) + a2 * t;

export const backout = (amount) => (t) => (--t * t * ((amount + 1) * t + amount) + 1);

export const resizer = (app: PIXI.Application<PIXI.ICanvas>, rc: PIXI.Container) => {
    const width = document.body.clientWidth as number;
    if (width < STAT_WIDTH) {
        rc.x = (93 / 2) - ((893.5 - width) / 2);
        app.renderer.resize(width, 130);
    } else {
        rc.x = 50.5;
        app.renderer.resize(STAT_WIDTH, 130);
    }
};

export const tweenTo = (object, property, target, time, easing, onchange, oncomplete) => {
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
    return tween;
}

export const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    // fontStyle: 'italic',
    fontWeight: 'bold',
    fill: '#ff0000',
    stroke: '#EAF2FF',
    strokeThickness: 0,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 1,
    dropShadowAngle: Math.PI / 2,
    dropShadowDistance: 1,
    wordWrap: true,
    wordWrapWidth: 440,
  });

export const moveReels = (reels: Ref<unknown[]>, tweening: Ref<unknown[]>, rc: PIXI.Container, running: Ref<boolean>, position: number) => {
    for (let i = 0; i < reels.value.length; i++) {
    const r = reels.value[i]; 
    const extra = Math.floor(Math.random() * 3);
    const time = 2500 + i * 600 + extra * 600;
    
    const tween = tweenTo(r, 'position', position, time, backout(1), null, i === reels.value.length - 1 ? reelsComplete(running) : null);
    tweening.value.push(tween);
    return time;
}
}

const reelsComplete = (running: Ref<boolean>) => running.value = false;

export const resetReels = (reels: Ref<unknown[]>, arrowColor: Ref<string>, rc: PIXI.Container | undefined) => {
    reels.value[0].position = 0;
    reels.value[0].previousPosition = 0;
        rc.children.forEach(reel => {
            reel.scale.x = 1;
            reel.scale.y = 1;
        })
    arrowColor.value = '#878B94';
};