/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { ReservationDTO } from './reservationDTO';
import type { RoomDTOType } from './roomDTOType';

export interface RoomDTO {
  available?: boolean;
  currentReservationDto?: ReservationDTO;
  id?: number;
  name?: string;
  pricePerHour?: number;
  reservationDtos?: ReservationDTO[];
  type?: RoomDTOType;
}