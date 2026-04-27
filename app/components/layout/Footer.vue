<template>
  <footer class="mt-20 border-t border-border/60 bg-secondary/40 md:mt-28">
    <div class="container py-12 grid gap-10 md:grid-cols-4 md:py-16">
      <div class="md:col-span-2 max-w-sm">
        <div class="font-display text-3xl">BookEase</div>
        <p class="mt-4 text-sm leading-relaxed text-muted-foreground">
          A quietly considered booking experience. We curate vetted specialists and craft a calm path from search to confirmation.
        </p>
      </div>
      <div class="text-sm">
        <div class="mb-4 font-medium">Platform</div>
        <ul class="space-y-2 text-muted-foreground">
          <li><NuxtLink class="story-link" to="/search">Find a doctor</NuxtLink></li>
          <li><NuxtLink class="story-link" to="/favorites">Saved specialists</NuxtLink></li>
          <li><NuxtLink class="story-link" to="/dashboard">My bookings</NuxtLink></li>
        </ul>
      </div>
      <div class="text-sm">
        <div class="mb-4 font-medium">Company</div>
        <ul class="space-y-2 text-muted-foreground">
          <li>About</li>
          <li>Editorial</li>
          <li>Press</li>
        </ul>
      </div>
    </div>
    <div class="border-t border-border/60">
      <div class="container flex flex-col gap-2 md:flex-row md:items-center justify-between py-6 text-center md:text-left text-xs text-muted-foreground">
        <span>© {{ new Date().getFullYear() }} BookEase Platform. Crafted with care.</span>
        <span class="font-display italic">Calm, considered, confirmed.</span>
      </div>
    </div>
  </footer>
</template>
