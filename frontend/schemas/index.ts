import { z } from "zod";

export const reservationSchema = z.object({
  id: z.number(),
  room_id: z.number(),
  customer_phone_number: z.string().optional(),
  start_time: z.date(),
  end_time: z.date().nullable(),
});

export type Reservation = z.infer<typeof reservationSchema>;

export const roomSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.union([
    z.literal("playstaion"),
    z.literal("pool"),
    z.literal("ping-pong"),
  ]),
  price_per_hour: z.number(),
  // status: z.union([
  //   z.literal("occupied"),
  //   z.literal("reserved"),
  //   z.literal("vacant"),
  // ]),
  current_reservation: reservationSchema.optional(),
});

export type Room = z.infer<typeof roomSchema>;
