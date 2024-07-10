package org.example.dto;

import org.example.model.Reservation;

public record ReservationDTO(
    Long roomId,
    String startTime,
    String endTime,
    String reserverName,
    String phoneNumber,
    double cost,
    Long id) {
  public static ReservationDTO from(Reservation reservation) {
    if (reservation == null)
      return null;
    ReservationDTO reservationDTO = new ReservationDTO(
        reservation.getRoom().getId(),
        reservation.getStartTime().toString(),
        reservation.getEndTime().toString(),
        reservation.getReserverName(),
        reservation.getPhoneNumber(),
        reservation.getCost(),
        reservation.getId());
    return reservationDTO;
  }

}
