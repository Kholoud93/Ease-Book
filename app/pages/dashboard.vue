<script setup lang="ts">
import { format, isFuture } from "date-fns";
import { useBookingsStore } from "~/stores/bookings";

const bookingsStore = useBookingsStore();
onMounted(() => bookingsStore.load());
const upcoming = computed(() => bookingsStore.bookings.filter((booking) => booking.status === "confirmed" && isFuture(new Date(booking.date))));
const history = computed(() => bookingsStore.bookings.filter((booking) => !(booking.status === "confirmed" && isFuture(new Date(booking.date)))));

useSeoMeta({
  title: "My bookings — BookEase",
  description: "Manage your upcoming and past appointments."
});
</script>

<template>
  <section class="bg-gradient-warm border-b border-border/60">
    <div class="container py-20">
      <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">Your dashboard</p>
      <h1 class="font-display text-5xl md:text-6xl mt-3">A calm overview.</h1>
      <p class="mt-4 text-muted-foreground max-w-xl">Every appointment, gently arranged. Cancel up to 24 hours before with no fee.</p>
      <div class="mt-12 grid grid-cols-3 gap-6 max-w-md">
        <div><div class="font-display text-4xl">{{ upcoming.length }}</div><div class="text-xs uppercase tracking-widest text-muted-foreground mt-1">Upcoming</div></div>
        <div><div class="font-display text-4xl">{{ history.filter((item) => item.status !== "cancelled").length }}</div><div class="text-xs uppercase tracking-widest text-muted-foreground mt-1">Completed</div></div>
        <div><div class="font-display text-4xl">{{ history.filter((item) => item.status === "cancelled").length }}</div><div class="text-xs uppercase tracking-widest text-muted-foreground mt-1">Cancelled</div></div>
      </div>
    </div>
  </section>
  <section class="container py-16">
    <h2 class="font-display text-3xl mb-8">Upcoming</h2>
    <div v-if="upcoming.length === 0" class="border border-dashed border-border rounded-sm py-16 text-center">
      <p class="text-muted-foreground">No appointments yet.</p>
      <NuxtLink to="/search" class="mt-6 rounded-full inline-flex h-10 items-center px-6 bg-primary text-primary-foreground">Find a doctor</NuxtLink>
    </div>
    <div v-else class="space-y-4">
      <article v-for="(booking, index) in upcoming" :key="booking.id" class="group flex items-center gap-6 rounded-sm border border-border bg-card p-5 transition hover:shadow-soft animate-fade-in-up" :style="{ animationDelay: `${index * 60}ms` }">
        <div class="flex flex-col items-center w-16 shrink-0 border-r border-border pr-4">
          <span class="text-[10px] uppercase tracking-widest text-muted-foreground">{{ format(new Date(booking.date), "MMM") }}</span>
          <span class="font-display text-3xl">{{ format(new Date(booking.date), "d") }}</span>
          <span class="text-xs text-muted-foreground">{{ booking.time }}</span>
        </div>
        <div class="flex-1">
          <div class="font-display text-xl">{{ booking.doctorName }}</div>
          <div class="text-sm text-muted-foreground">{{ booking.specialty }} · {{ booking.patient }}</div>
        </div>
        <div class="text-right">
          <div class="font-medium">€{{ booking.price }}</div>
          <div class="text-[10px] uppercase tracking-widest mt-1 text-accent">{{ booking.status }}</div>
        </div>
        <div class="flex items-center gap-2">
          <button aria-label="Cancel" class="h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-secondary" @click="bookingsStore.cancel(booking.id)">
            <Icon name="lucide:calendar-x" size="16" />
          </button>
          <NuxtLink :to="`/service/${booking.doctorId}`" class="text-muted-foreground hover:text-foreground"><Icon name="lucide:chevron-right" size="16" /></NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>
