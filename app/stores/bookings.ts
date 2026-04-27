import type { Booking } from "~/types/booking";

const storageKey = "bookease.bookings";

export const useBookingsStore = defineStore("bookings", () => {
  const bookings = ref<Booking[]>([]);
  let storageListenerAttached = false;

  const load = () => {
    if (!import.meta.client) return;
    try {
      const stored = localStorage.getItem(storageKey);
      bookings.value = stored ? JSON.parse(stored) : [];
    } catch {
      bookings.value = [];
    }
    if (!storageListenerAttached) {
      window.addEventListener("storage", (event: StorageEvent) => {
        if (event.key !== storageKey) return;
        try {
          bookings.value = event.newValue ? JSON.parse(event.newValue) : [];
        } catch {
          bookings.value = [];
        }
      });
      storageListenerAttached = true;
    }
  };

  const save = () => {
    if (!import.meta.client) return;
    localStorage.setItem(storageKey, JSON.stringify(bookings.value));
  };

  const add = (payload: Omit<Booking, "id" | "status">) => {
    const entry: Booking = { ...payload, id: crypto.randomUUID(), status: "confirmed" };
    bookings.value = [entry, ...bookings.value];
    save();
    return entry;
  };

  const cancel = (id: string) => {
    bookings.value = bookings.value.map((item) => (item.id === id ? { ...item, status: "cancelled" } : item));
    save();
  };

  return { bookings, load, add, cancel };
});
