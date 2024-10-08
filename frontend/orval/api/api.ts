/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type {
  Reservation,
  ReservationDTO,
  ReserveDTO,
  Room,
  RoomsReservationsDTO
} from './model'
import { customInstance } from '../custom-instance';


type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];


  export const updateReservation = (
    id: number,
    reservation: Reservation,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<Reservation>(
      {url: `/api/reservations/${id}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: reservation
    },
      options);
    }
  
export const deleteReservation = (
    id: number,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<void>(
      {url: `/api/reservations/${id}`, method: 'DELETE'
    },
      options);
    }
  
export const getAllRooms = (
    
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<Room[]>(
      {url: `/api/rooms`, method: 'GET'
    },
      options);
    }
  
export const createRoom = (
    room: Room,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<Room>(
      {url: `/api/rooms`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: room
    },
      options);
    }
  
export const getReservationsByRoomId = (
    roomId: number,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<Reservation[]>(
      {url: `/api/reservations/${roomId}`, method: 'GET'
    },
      options);
    }
  
export const reserve = (
    roomId: number,
    reserveDTO: ReserveDTO,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<Reservation>(
      {url: `/api/reservations/${roomId}`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: reserveDTO
    },
      options);
    }
  
export const getRoomById = (
    id: number,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<Room>(
      {url: `/api/rooms/${id}`, method: 'GET'
    },
      options);
    }
  
export const deleteRoom = (
    id: number,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<void>(
      {url: `/api/rooms/${id}`, method: 'DELETE'
    },
      options);
    }
  
export const getRoomsReservations = (
    
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<RoomsReservationsDTO[]>(
      {url: `/api/rooms/roomsReservations`, method: 'GET'
    },
      options);
    }
  
export const getAvailable = (
    
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<Room[]>(
      {url: `/api/rooms/available`, method: 'GET'
    },
      options);
    }
  
export const getReservations = (
    
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<ReservationDTO[]>(
      {url: `/api/reservations`, method: 'GET'
    },
      options);
    }
  
export const checkout = (
    reservationId: number,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<Reservation>(
      {url: `/api/reservations/checkout/${reservationId}`, method: 'GET'
    },
      options);
    }
  
export type UpdateReservationResult = NonNullable<Awaited<ReturnType<typeof updateReservation>>>
export type DeleteReservationResult = NonNullable<Awaited<ReturnType<typeof deleteReservation>>>
export type GetAllRoomsResult = NonNullable<Awaited<ReturnType<typeof getAllRooms>>>
export type CreateRoomResult = NonNullable<Awaited<ReturnType<typeof createRoom>>>
export type GetReservationsByRoomIdResult = NonNullable<Awaited<ReturnType<typeof getReservationsByRoomId>>>
export type ReserveResult = NonNullable<Awaited<ReturnType<typeof reserve>>>
export type GetRoomByIdResult = NonNullable<Awaited<ReturnType<typeof getRoomById>>>
export type DeleteRoomResult = NonNullable<Awaited<ReturnType<typeof deleteRoom>>>
export type GetRoomsReservationsResult = NonNullable<Awaited<ReturnType<typeof getRoomsReservations>>>
export type GetAvailableResult = NonNullable<Awaited<ReturnType<typeof getAvailable>>>
export type GetReservationsResult = NonNullable<Awaited<ReturnType<typeof getReservations>>>
export type CheckoutResult = NonNullable<Awaited<ReturnType<typeof checkout>>>
