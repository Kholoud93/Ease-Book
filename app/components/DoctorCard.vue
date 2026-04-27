<script setup lang="ts">
import type { Doctor } from "~/types/doctor";
import { useFavoritesStore } from "~/stores/favorites";

const props = defineProps<{
  doctor: Doctor;
  index?: number;
}>();

const favoritesStore = useFavoritesStore();

onMounted(() => {
  favoritesStore.load();
});

const isFavorite = computed(() => favoritesStore.isFavorite(props.doctor.id));
</script>

<template>
  <article class="group relative animate-fade-in-up" :style="{ animationDelay: `${(props.index ?? 0) * 60}ms` }">
    <NuxtLink :to="`/service/${props.doctor.id}`" class="block">
      <div class="relative overflow-hidden rounded-sm bg-muted aspect-[4/5]">
        <img
          :src="props.doctor.image"
          :alt="`${props.doctor.name}, ${props.doctor.specialty}`"
          loading="lazy"
          class="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
        />
        <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent p-5">
          <p class="text-xs uppercase tracking-[0.2em] text-background/80">{{ props.doctor.specialty }}</p>
          <h3 class="font-display text-2xl text-background mt-1">{{ props.doctor.name }}</h3>
        </div>
      </div>
    </NuxtLink>
    <button
      :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
      class="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur transition hover:scale-110"
      @click.prevent="favoritesStore.toggle(props.doctor.id)"
    >
      <Icon
        :name="'lucide:heart'"
        size="16"
        :class="isFavorite ? 'fill-accent text-accent transition' : 'text-foreground transition'"
      />
    </button>
    <div class="mt-4 flex items-start justify-between gap-3">
      <div>
        <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Icon name="lucide:map-pin" size="12" />
          <span>{{ props.doctor.clinic }}, {{ props.doctor.city }}</span>
        </div>
        <div class="mt-1.5 flex items-center gap-1 text-xs">
          <Icon name="lucide:star" size="12" class="fill-accent text-accent" />
          <span class="font-medium">{{ props.doctor.rating.toFixed(1) }}</span>
          <span class="text-muted-foreground">· {{ props.doctor.reviews }} reviews</span>
        </div>
      </div>
      <div class="text-right">
        <div class="font-display text-xl">€{{ props.doctor.price }}</div>
        <div class="text-[10px] uppercase tracking-widest text-muted-foreground">per visit</div>
      </div>
    </div>
  </article>
</template>
