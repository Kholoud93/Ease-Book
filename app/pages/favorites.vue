<script setup lang="ts">
import { doctors } from "~/data/doctors";
import { useFavoritesStore } from "~/stores/favorites";

const favoritesStore = useFavoritesStore();
onMounted(() => favoritesStore.load());
const favoriteDoctors = computed(() => doctors.filter((doctor) => favoritesStore.favorites.includes(doctor.id)));

useSeoMeta({
  title: "Saved specialists — BookEase",
  description: "Your shortlist of trusted doctors."
});
</script>

<template>
  <section class="bg-gradient-warm border-b border-border/60">
    <div class="container py-14 sm:py-20">
      <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">Saved</p>
      <h1 class="font-display text-4xl sm:text-5xl md:text-6xl mt-3">Your shortlist.</h1>
      <p class="mt-4 text-muted-foreground max-w-xl">A quiet collection of specialists you'd like to return to.</p>
    </div>
  </section>
  <section class="container py-12 sm:py-16">
    <div v-if="favoriteDoctors.length === 0" class="border border-dashed border-border rounded-sm py-24 text-center">
      <p class="text-muted-foreground">No favorites yet. Tap the heart on any specialist to save them here.</p>
      <NuxtLink to="/search" class="mt-6 rounded-full inline-flex h-10 items-center px-6 bg-primary text-primary-foreground">Discover specialists</NuxtLink>
    </div>
    <div v-else class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      <DoctorCard v-for="(doctor, index) in favoriteDoctors" :key="doctor.id" :doctor="doctor" :index="index" />
    </div>
  </section>
</template>
