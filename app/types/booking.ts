export type Booking = {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  patient: string;
  status: "confirmed" | "completed" | "cancelled";
  price: number;
};
