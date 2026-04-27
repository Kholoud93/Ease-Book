<script setup lang="ts">
import { cities, doctors, specialties } from "~/data/doctors";

const route = useRoute();
const router = useRouter();
const queryValue = ref(String(route.query.q ?? ""));
const selectedSpecialty = computed(() => String(route.query.specialty ?? ""));
const selectedCity = computed(() => String(route.query.city ?? ""));

const setQueryParam = (key: string, value: string) => {
  const nextQuery = { ...route.query };
  if (value) nextQuery[key] = value;
  else delete nextQuery[key];
  router.replace({ query: nextQuery });
};

watch(queryValue, (value) => setQueryParam("q", value));
watch(() => route.query.q, (value) => {
  queryValue.value = String(value ?? "");
});

useSeoMeta({
  title: "Find a doctor — BookEase",
  description: "Search vetted specialists by name, specialty or city and book in seconds."
});

const results = computed(() => {
  const term = queryValue.value.trim().toLowerCase();
  return doctors.filter((doctor) => {
    if (selectedSpecialty.value && doctor.specialty !== selectedSpecialty.value) return false;
    if (selectedCity.value && doctor.city !== selectedCity.value) return false;
    if (!term) return true;
    return `${doctor.name} ${doctor.specialty} ${doctor.clinic} ${doctor.tags.join(" ")}`.toLowerCase().includes(term);
  });
});
</script>

<template>
  <section class="bg-gradient-warm border-b border-border/60">
    <div class="container py-16 md:py-24">
      <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">Discover</p>
      <h1 class="font-display text-5xl md:text-6xl mt-3 max-w-2xl">A quiet directory of trusted specialists.</h1>
      <div class="mt-10 flex flex-col md:flex-row gap-3 max-w-3xl">
        <div class="relative flex-1">
          <Icon name="lucide:search" size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input v-model="queryValue" type="text" placeholder="Search by name, specialty, or clinic" class="h-12 pl-11 rounded-full border border-border bg-background w-full" />
        </div>
        <button class="h-12 rounded-full px-8 bg-primary text-primary-foreground">Search</button>
      </div>
    </div>
  </section>
  <section class="container py-12">
    <div class="flex flex-wrap items-center gap-3 mb-10">
      <span class="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><Icon name="lucide:sliders-horizontal" size="12" /> Filter</span>
      <button class="rounded-full border px-4 py-1.5 text-sm transition" :class="selectedSpecialty ? 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40' : 'bg-primary text-primary-foreground border-primary'" @click="setQueryParam('specialty', '')">All specialties</button>
      <button v-for="specialty in specialties" :key="specialty" class="rounded-full border px-4 py-1.5 text-sm transition" :class="selectedSpecialty === specialty ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40'" @click="setQueryParam('specialty', specialty)">{{ specialty }}</button>
      <span class="mx-2 h-4 w-px bg-border" />
      <button class="rounded-full border px-4 py-1.5 text-sm transition" :class="selectedCity ? 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40' : 'bg-primary text-primary-foreground border-primary'" @click="setQueryParam('city', '')">All cities</button>
      <button v-for="city in cities" :key="city" class="rounded-full border px-4 py-1.5 text-sm transition" :class="selectedCity === city ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40'" @click="setQueryParam('city', city)">{{ city }}</button>
    </div>
    <div class="flex items-baseline justify-between mb-8"><h2 class="font-display text-2xl">{{ results.length }} specialists</h2></div>
    <div v-if="results.length === 0" class="py-24 text-center text-muted-foreground">No matches. Try adjusting your filters.</div>
    <div v-else class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      <DoctorCard v-for="(doctor, index) in results" :key="doctor.id" :doctor="doctor" :index="index" />
    </div>
  </section>
</template>
