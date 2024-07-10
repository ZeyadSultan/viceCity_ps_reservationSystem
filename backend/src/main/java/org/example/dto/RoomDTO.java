package org.example.dto;

import org.example.model.RoomType;
import java.util.List;

public record RoomDTO(
    Long id,
    String name,
    RoomType type,
    double pricePerHour,
    boolean available,
    List<ReservationDTO> reservationDtos,
    ReservationDTO currentReservationDto) {
}
