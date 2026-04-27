<template>
  <div class="min-h-screen flex flex-col">
    <LayoutHeader />
    <main class="flex-1 overflow-x-hidden">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
