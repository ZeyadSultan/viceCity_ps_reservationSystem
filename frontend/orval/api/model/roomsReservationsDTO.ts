/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { Reservation } from './reservation';
import type { RoomsReservationsDTOType } from './roomsReservationsDTOType';

export interface RoomsReservationsDTO {
  available?: boolean;
  currentReservation?: Reservation;
  id?: number;
  name?: string;
  priceMulti?: number;
  priceSingle?: number;
  type?: RoomsReservationsDTOType;
}
