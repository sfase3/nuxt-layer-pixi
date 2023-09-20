<template>
    <div class="flex justify-center">
        <svg class="max-sm:hidden" :class="{'rotate-180': rotate}" width="390" height="13" viewBox="0 0 390 13" :fill='color' xmlns="http://www.w3.org/2000/svg">
            <path d="M185.278 2.80741C184.928 2.41235 184.909 2.01215 185.218 1.60682C185.527 1.20227 186.004 1 186.65 1L203.35 1C203.995 1 204.473 1.20227 204.783 1.60681C205.092 2.01215 205.071 2.41235 204.722 2.80741L196.371 12.4667C196.049 12.8222 195.591 13 195 13C194.408 13 193.951 12.8222 193.628 12.4667L185.278 2.80741Z" :fill='color'/>
            <path d="M390 1L-3.57628e-07 1" stroke="url(#paint0_linear_15218_119858)" stroke-width="2"/>
            <defs>
            <linearGradient id="paint0_linear_15218_119858" x1="-0.593601" y1="1" x2="390" y2="1" gradientUnits="userSpaceOnUse">
            <stop :stop-color="color" stop-opacity="0"/>
            <stop offset="0.244792" :stop-color="color"/>
            <stop offset="0.682292" :stop-color="color"/>
            <stop offset="1" :stop-color="color" stop-opacity="0"/>
            </linearGradient>
            </defs>
        </svg>
        <svg class="sm:hidden" :class="{'rotate-180': rotate}" width="230" height="13" viewBox="0 0 230 13" xmlns="http://www.w3.org/2000/svg">
            <path d="M105.264 2.80741C104.932 2.41235 104.913 2.01215 105.207 1.60682C105.501 1.20227 105.954 1 106.567 1L122.432 1C123.046 1 123.499 1.20227 123.794 1.60681C124.087 2.01215 124.068 2.41235 123.735 2.80741L115.803 12.4667C115.496 12.8222 115.062 13 114.5 13C113.938 13 113.503 12.8222 113.197 12.4667L105.264 2.80741Z" :fill='color'/>
            <path d="M230 1L0 1.00002" stroke="url(#paint0_linear_15218_119864)" stroke-width="2"/>
            <defs>
            <linearGradient id="paint0_linear_15218_119864" x1="-0.350072" y1="1.00002" x2="230" y2="1" gradientUnits="userSpaceOnUse">
            <stop :stop-color="color" stop-opacity="0"/>
            <stop offset="0.244792" :stop-color="color"/>
            <stop offset="0.682292" :stop-color="color"/>
            <stop offset="1" :stop-color="color" stop-opacity="0"/>
            </linearGradient>
            </defs>
        </svg>
    </div>
</template>

<script lang="ts" setup>
interface Arrow {
    rotate?: boolean;
    color?: string;
};

defineProps<Arrow>();
</script>
