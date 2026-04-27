<script setup lang="ts">
import { useFavoritesStore } from "~/stores/favorites";

const favoritesStore = useFavoritesStore();
const route = useRoute();

onMounted(() => {
  favoritesStore.load();
});

const navClass = (path: string) =>
  `story-link transition-colors ${route.path === path ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`;
</script>

<template>
  <header class="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
    <div class="container flex h-14 items-center justify-between md:h-16">
      <NuxtLink to="/" class="flex items-baseline gap-1">
        <span class="font-display text-xl tracking-tight sm:text-2xl">BookEase</span>
        <span class="h-1.5 w-1.5 rounded-full bg-accent" />
      </NuxtLink>
      <nav class="hidden md:flex items-center gap-8 text-sm">
        <NuxtLink to="/search" :class="navClass('/search')">Find a doctor</NuxtLink>
        <NuxtLink to="/dashboard" :class="navClass('/dashboard')">My bookings</NuxtLink>
        <NuxtLink to="/favorites" :class="navClass('/favorites')">Saved</NuxtLink>
      </nav>
      <div class="flex items-center gap-2">
        <NuxtLink to="/search" aria-label="Search" class="h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-secondary">
          <Icon name="lucide:search" size="16" />
        </NuxtLink>
        <NuxtLink to="/favorites" aria-label="Favorites" class="relative h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-secondary">
          <Icon name="lucide:heart" size="16" />
          <span
            v-if="favoritesStore.favorites.length > 0"
            class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-foreground"
          >
            {{ favoritesStore.favorites.length }}
          </span>
        </NuxtLink>
        <NuxtLink to="/dashboard" aria-label="Dashboard" class="h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-secondary">
          <Icon name="lucide:layout-grid" size="16" />
        </NuxtLink>
      </div>
    </div>
    <div class="border-t border-border/60 md:hidden">
      <nav class="container flex items-center justify-between gap-3 py-2 text-sm">
        <NuxtLink to="/search" :class="navClass('/search')">Find a doctor</NuxtLink>
        <NuxtLink to="/dashboard" :class="navClass('/dashboard')">My bookings</NuxtLink>
        <NuxtLink to="/favorites" :class="navClass('/favorites')">Saved</NuxtLink>
      </nav>
    </div>
  </header>
</template>
