import { useCallback, useEffect, useState } from "react";

const KEY = "bookease.bookings";

export type Booking = {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string; // ISO
  time: string;
  patient: string;
  status: "confirmed" | "completed" | "cancelled";
  price: number;
};

const read = (): Booking[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>(read);

  useEffect(() => {
    const h = (e: StorageEvent) => {
      if (e.key === KEY) setBookings(read());
    };
    window.addEventListener("storage", h);
    return () => window.removeEventListener("storage", h);
  }, []);

  const add = useCallback((b: Omit<Booking, "id" | "status">) => {
    const full: Booking = { ...b, id: crypto.randomUUID(), status: "confirmed" };
    setBookings((prev) => {
      const next = [full, ...prev];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
    return full;
  }, []);

  const cancel = useCallback((id: string) => {
    setBookings((prev) => {
      const next = prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b));
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { bookings, add, cancel };
}