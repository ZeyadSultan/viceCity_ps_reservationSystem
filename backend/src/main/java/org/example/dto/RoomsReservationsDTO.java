package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.model.Reservation;
import org.example.model.RoomType;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomsReservationsDTO {
    private Long id;
    private String name;
    private RoomType type;
    private Double priceSingle;
    private Double priceMulti;
    private Boolean available;
    private Reservation currentReservation;
}
