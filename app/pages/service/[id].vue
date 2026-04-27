<script setup lang="ts">
import { addDays, format } from "date-fns";
import { getDoctor } from "~/data/doctors";
import { useFavoritesStore } from "~/stores/favorites";

const route = useRoute();
const router = useRouter();
const favoritesStore = useFavoritesStore();
onMounted(() => favoritesStore.load());

const doctor = computed(() => getDoctor(String(route.params.id)));
const selectedDate = ref<Date | undefined>(addDays(new Date(), 1));
const selectedTime = ref("10:30");
const timeSlots = ["09:00", "10:30", "11:15", "13:45", "15:00", "16:30", "17:45"];

const proceed = () => {
  if (!doctor.value || !selectedDate.value) return;
  router.push({ path: `/service/${doctor.value.id}/checkout`, query: { date: selectedDate.value.toISOString(), time: selectedTime.value } });
};
</script>

<template>
  <section v-if="doctor">
    <div class="container pt-8 sm:pt-10">
      <NuxtLink to="/search" class="inline-flex items-center gap-2 text-sm text-muted-foreground story-link"><Icon name="lucide:arrow-left" size="12" /> All specialists</NuxtLink>
    </div>
    <div class="container grid gap-8 sm:gap-12 lg:grid-cols-12 pt-6 sm:pt-10 pb-14 sm:pb-20">
      <div class="lg:col-span-5"><img :src="doctor.image" :alt="doctor.name" class="w-full aspect-[4/5] object-cover rounded-sm shadow-elegant max-h-[560px]" /></div>
      <div class="lg:col-span-7">
        <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">{{ doctor.specialty }}</p>
        <h1 class="font-display text-4xl sm:text-5xl md:text-6xl mt-3">{{ doctor.name }}</h1>
        <p class="mt-5 sm:mt-8 text-base sm:text-lg leading-relaxed text-foreground/80 max-w-2xl">{{ doctor.bio }}</p>
        <div class="mt-8 flex flex-wrap gap-2"><span v-for="tag in doctor.tags" :key="tag" class="rounded-full bg-secondary px-3 py-1 text-xs">{{ tag }}</span></div>
      </div>
    </div>
    <div class="bg-secondary/40 border-y border-border/60">
      <div class="container py-14 sm:py-20 grid gap-8 sm:gap-12 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <h2 class="font-display text-3xl sm:text-4xl">Choose a moment.</h2>
          <input type="date" class="mt-6 h-10 rounded-sm border border-border bg-background px-3 w-full sm:w-auto" @input="selectedDate = new Date(($event.target as HTMLInputElement).value)" />
        </div>
        <div class="lg:col-span-7">
          <div class="rounded-sm bg-card border border-border p-5 sm:p-8 shadow-soft">
            <h3 class="font-display text-xl sm:text-2xl">{{ selectedDate ? format(selectedDate, "EEEE, MMMM d") : "Select a date" }}</h3>
            <div class="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              <button v-for="time in timeSlots" :key="time" class="rounded-sm border px-4 py-3 text-sm transition" :class="selectedTime === time ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary'" @click="selectedTime = time">{{ time }}</button>
            </div>
            <button class="mt-8 rounded-full px-8 h-12 inline-flex items-center justify-center bg-primary text-primary-foreground w-full sm:w-auto" @click="proceed">Continue to checkout</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
