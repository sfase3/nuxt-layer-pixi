import { GlowFilter } from '@pixi/filter-glow';
import * as PIXI from 'pixi.js';
import { Ref } from 'vue';

export const STAT_WIDTH = 900;  

export const rc = new PIXI.Container();

export const glowFilter = new GlowFilter({
    distance: 10, 
    outerStrength: 2, 
    innerStrength: 2, 
    color: 0xA040F2, 
});

export const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    fontWeight: 'bold',
    fill: '#EAF2FF',
    stroke: '#EAF2FF',
    strokeThickness: 0,
    dropShadow: true,
    dropShadowBlur: 0,
    dropShadowAngle: Math.PI / 2,
    dropShadowDistance: 2,
});

export const lerp = (a1, a2, t) => a1 * (1 - t) + a2 * t;

export const backout = (amount) => (t) => (--t * t * ((amount + 1) * t + amount) + 1);

export const resizer = async (app: PIXI.Application<PIXI.ICanvas>, mask: Ref<PIXI.Sprite>) => {
    const width = document.body.clientWidth as number;
    if (width < STAT_WIDTH) {
        mask.value.width = width;
        rc.x = (90 / 2) - ((893.5 - width) / 2);
        rc.y = 65;
        changeSpriteSize(90);
        app.renderer.resize(width, 130);
    } 
    if (width <= 320) {
        mask.value.width = width;
        rc.x = (72 / 2) - ((730 - width) / 2);
        rc.y = 50;
        changeSpriteSize(72);
        app.renderer.resize(width, 100);
    } 
    if (width >= STAT_WIDTH) {
        mask.value.width = width;
        rc.x = 50.5;
        rc.y = 65;
        mask.value.width = STAT_WIDTH;
        changeSpriteSize(90);
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

export const moveReels = (reels: Ref<unknown[]>, tweening: Ref<unknown[]>, running: Ref<boolean>, position: number) => {
    for (let i = 0; i < reels.value.length; i++) {
    const r = reels.value[i]; 
    const extra = Math.floor(Math.random() * 3);
    const time = 2500 + i * 600 + extra * 600;
    
    const tween = tweenTo(r, 'position', position, time, backout(0.5), null, i === reels.value.length - 1 ? reelsComplete(running) : null);
    tweening.value.push(tween);
    return time;
}
}

const reelsComplete = (running: Ref<boolean>) => running.value = false;

const changeSpriteSize = (size: number) => {
    rc.children.forEach((el: PIXI.Graphics) => {
        el.children[0].width = size;
        el.children[0].height = size;
    })
}

export const resetReels = async (reels: Ref<unknown[]>, arrowColor: Ref<string>) => {
    reels.value[0].position = 0;
    reels.value[0].previousPosition = 0;
    await rc.children.forEach(reel => {
        reel.filters = []
        reel.scale.x = 1;
        reel.scale.y = 1;
    })
    arrowColor.value = '#878B94';
};

export const changeList = (list: any, textures: Ref<PIXI.Texture[]>) => {
    rc.children.forEach((reel, idx) => {
    reel.scale.x = 1;
    reel.scale.y = 1;
    reel.filters = [];

    const displayText = reel.children![1] as PIXI.Text;
    const displayTexture = reel.children![0] as PIXI.Text;
      
    const newStyle = Object.create(style);
    newStyle.dropShadowColor = list[idx].shadowColor;
      
    displayText.text = list[idx].text;
    displayText.style = newStyle;
    displayTexture.texture = textures.value[`/wheel/${list[idx].color}.png`];
    reel.arrowColor = list[idx].arrows;
})
}