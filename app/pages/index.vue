<script setup lang="ts">
import { doctors } from "~/data/doctors";
import { specialties } from "~/data/doctors";

useSeoMeta({
  title: "BookEase — Book trusted doctors with elegance",
  description: "A refined booking platform to discover vetted specialists and confirm appointments in seconds."
});
</script>

<template>
  <section class="relative overflow-hidden bg-gradient-warm">
    <div class="container grid gap-10 lg:grid-cols-12 lg:gap-16 py-14 sm:py-16 md:py-24 lg:py-32">
      <div class="lg:col-span-6 flex flex-col justify-center">
        <div class="inline-flex items-center gap-2 self-start rounded-full border border-border/80 bg-background/60 px-3 py-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground animate-fade-in">
          <Icon name="lucide:sparkles" size="12" class="text-accent" />
          A quieter way to book care
        </div>
        <h1 class="mt-5 font-display text-[2.5rem] leading-[1.04] sm:text-5xl md:text-7xl lg:text-[5.5rem] text-balance animate-fade-in-up">
          Considered care, <em class="text-primary/80">confirmed</em> in seconds.
        </h1>
        <p class="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed animate-fade-in-up [animation-delay:120ms]">
          BookEase is an editorially curated platform of vetted doctors. Browse profiles, choose a moment that suits you, and step into a clinic that already feels familiar.
        </p>
        <div class="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4 animate-fade-in-up [animation-delay:240ms]">
          <NuxtLink to="/search" class="rounded-full px-6 sm:px-8 h-11 sm:h-12 inline-flex items-center bg-primary text-primary-foreground text-sm sm:text-base">
            Find a doctor <Icon name="lucide:arrow-up-right" size="16" class="ml-1" />
          </NuxtLink>
          <NuxtLink to="/dashboard" class="story-link text-sm">View my bookings</NuxtLink>
        </div>
        <dl class="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-6 max-w-md animate-fade-in [animation-delay:360ms]">
          <div>
            <dt class="font-display text-2xl sm:text-3xl">120+</dt>
            <dd class="text-xs uppercase tracking-widest text-muted-foreground mt-1">Specialists</dd>
          </div>
          <div>
            <dt class="font-display text-2xl sm:text-3xl">24</dt>
            <dd class="text-xs uppercase tracking-widest text-muted-foreground mt-1">Cities</dd>
          </div>
          <div>
            <dt class="font-display text-2xl sm:text-3xl">4.9</dt>
            <dd class="text-xs uppercase tracking-widest text-muted-foreground mt-1">Avg. rating</dd>
          </div>
        </dl>
      </div>
      <div class="lg:col-span-6 relative animate-scale-in [animation-delay:200ms]">
        <div class="relative rounded-sm overflow-hidden shadow-elegant">
          <img
            src="/hero-clinic.jpg"
            alt="Serene clinic interior with emerald velvet chair and marble desk"
            width="1600"
            height="1200"
            class="w-full h-[360px] sm:h-[460px] md:h-[620px] lg:h-[640px] object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
        </div>
        <div class="absolute -bottom-6 -left-6 hidden md:block bg-card border border-border/60 rounded-sm p-5 shadow-soft animate-float w-64">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="lucide:calendar-check" size="16" class="text-primary" />
            </div>
            <div>
              <div class="font-medium text-sm">Tomorrow, 10:30</div>
              <div class="text-xs text-muted-foreground">Dr. Laurent · Cardiology</div>
            </div>
          </div>
          <div class="mt-3 text-[10px] uppercase tracking-widest text-accent">Confirmed</div>
        </div>
      </div>
    </div>
  </section>
  <section class="border-y border-border/60 bg-card">
    <div class="container py-8 sm:py-10 flex flex-wrap items-center justify-between gap-4 sm:gap-6">
      <span class="text-xs uppercase tracking-[0.25em] text-muted-foreground">Browse by specialty</span>
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="specialty in specialties"
          :key="specialty"
          :to="`/search?specialty=${encodeURIComponent(specialty)}`"
          class="rounded-full border border-border px-4 py-1.5 text-sm transition hover:bg-primary hover:text-primary-foreground hover:border-primary"
        >
          {{ specialty }}
        </NuxtLink>
      </div>
    </div>
  </section>
  <section class="container py-16 sm:py-20 md:py-32">
    <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10 sm:mb-12">
      <div>
        <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">The atelier</p>
        <h2 class="font-display text-4xl md:text-5xl max-w-2xl">Specialists, hand-selected.</h2>
      </div>
      <NuxtLink to="/search" class="story-link text-sm hidden md:inline">View all</NuxtLink>
    </div>
    <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      <DoctorCard v-for="(doctor, index) in doctors.slice(0, 3)" :key="doctor.id" :doctor="doctor" :index="index" />
    </div>
  </section>
  <section class="bg-primary text-primary-foreground">
    <div class="container py-16 sm:py-20 md:py-32">
      <p class="text-xs uppercase tracking-[0.25em] text-primary-foreground/60">The ritual</p>
      <h2 class="font-display text-3xl sm:text-4xl md:text-5xl mt-3 max-w-2xl">Three quiet steps to a confirmed appointment.</h2>
      <div class="mt-10 sm:mt-16 grid gap-8 sm:gap-10 md:grid-cols-3 md:gap-12">
        <div
          v-for="(step, index) in [
            { icon: 'lucide:stethoscope', n: '01', t: 'Discover', d: 'Browse vetted profiles, read patient notes, and shortlist specialists who feel right.' },
            { icon: 'lucide:calendar-check', n: '02', t: 'Choose a moment', d: 'An interactive calendar reveals available windows. Pick the one that fits your day.' },
            { icon: 'lucide:shield-check', n: '03', t: 'Confirm with care', d: 'A frictionless checkout, a calm confirmation, and gentle reminders before your visit.' }
          ]"
          :key="step.n"
          class="animate-fade-in-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div class="flex items-center gap-4">
            <span class="font-display text-3xl text-accent">{{ step.n }}</span>
            <div class="h-px flex-1 bg-primary-foreground/20" />
            <Icon :name="step.icon" size="20" class="text-accent" />
          </div>
          <h3 class="font-display text-2xl sm:text-3xl mt-5 sm:mt-6">{{ step.t }}</h3>
          <p class="mt-3 text-primary-foreground/70 leading-relaxed">{{ step.d }}</p>
        </div>
      </div>
    </div>
  </section>
  <section class="container py-16 sm:py-20 md:py-32 text-center">
    <h2 class="font-display text-3xl sm:text-4xl md:text-6xl max-w-3xl mx-auto text-balance">
      Care, the way it should have always felt.
    </h2>
    <p class="mt-6 text-muted-foreground max-w-xl mx-auto">
      Begin with a single search. Your next appointment is a few unhurried clicks away.
    </p>
    <NuxtLink to="/search" class="mt-8 sm:mt-10 rounded-full px-8 sm:px-10 h-11 sm:h-12 inline-flex items-center bg-primary text-primary-foreground text-sm sm:text-base">
      Start your search
    </NuxtLink>
  </section>
</template>
