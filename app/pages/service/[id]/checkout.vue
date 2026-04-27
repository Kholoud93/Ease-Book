<script setup lang="ts">
import { format } from "date-fns";
import { getDoctor } from "~/data/doctors";
import { useBookingsStore } from "~/stores/bookings";

const route = useRoute();
const router = useRouter();
const bookingsStore = useBookingsStore();
onMounted(() => bookingsStore.load());

const doctor = computed(() => getDoctor(String(route.params.id)));
const dateISO = computed(() => String(route.query.date ?? new Date().toISOString()));
const time = computed(() => String(route.query.time ?? "10:30"));
const appointmentDate = computed(() => new Date(dateISO.value));
const name = ref("");
const email = ref("");
const card = ref("");
const done = ref(false);

const submit = () => {
  if (!doctor.value || !name.value || !email.value) return;
  bookingsStore.add({
    doctorId: doctor.value.id,
    doctorName: doctor.value.name,
    specialty: doctor.value.specialty,
    date: appointmentDate.value.toISOString(),
    time: time.value,
    patient: name.value,
    price: doctor.value.price
  });
  done.value = true;
};
</script>

<template>
  <section v-if="doctor && done" class="container py-32 text-center max-w-xl">
    <h1 class="font-display text-5xl">Confirmed.</h1>
    <p class="mt-4 text-muted-foreground">A gentle reminder will be sent before your visit with {{ doctor.name }} on {{ format(appointmentDate, "EEEE, MMMM d") }} at {{ time }}.</p>
  </section>
  <section v-else-if="doctor" class="container grid lg:grid-cols-12 gap-12 py-16">
    <form class="lg:col-span-7 space-y-6" @submit.prevent="submit">
      <h1 class="font-display text-5xl">Your details</h1>
      <input v-model="name" class="h-12 bg-card w-full rounded-sm border border-border px-3" placeholder="Full name" />
      <input v-model="email" type="email" class="h-12 bg-card w-full rounded-sm border border-border px-3" placeholder="Email" />
      <input v-model="card" class="h-12 bg-card w-full rounded-sm border border-border px-3" placeholder="Card number" />
      <button class="rounded-full px-10 h-12 bg-primary text-primary-foreground">Confirm appointment · €{{ doctor.price }}</button>
    </form>
    <aside class="lg:col-span-5">
      <div class="rounded-sm border border-border bg-card p-8">
        <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">Summary</p>
        <div class="mt-3">{{ doctor.name }} · {{ doctor.specialty }}</div>
      </div>
    </aside>
  </section>
</template>
