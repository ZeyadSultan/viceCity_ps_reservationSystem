package org.example.controller;

import lombok.RequiredArgsConstructor;

import org.example.dto.ReservationDTO;
import org.example.model.Reservation;
import org.example.model.Room;
import org.example.service.ReservationService;
import org.example.service.RoomService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    private final RoomService roomService;

    @GetMapping
    public List<ReservationDTO> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @PostMapping
    public Reservation createReservation(@RequestBody ReservationDTO reservationDto) {
        Reservation reservation = new Reservation();
        Room room = roomService.getRoomById(reservationDto.roomId());
        reservation.setRoom(room); // 2024-07-10T17:52:08.320Z
        LocalDateTime startTime = LocalDateTime.parse(reservationDto.startTime(),
                DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
        reservation.setStartTime(startTime);
        LocalDateTime endTime = LocalDateTime.parse(reservationDto.endTime(),
                DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
        reservation.setEndTime(endTime);
        reservation.setReserverName(reservationDto.reserverName());
        reservation.setPhoneNumber(reservationDto.phoneNumber());
        return reservationService.createReservation(reservation);
    }

    @GetMapping("/{id}")
    public ReservationDTO getReservationById(@PathVariable Long id) {
        return reservationService.getReservationById(id);
    }

    @PutMapping("/{id}")
    public Reservation updateReservation(@PathVariable Long id, @RequestBody Reservation reservation) {
        return reservationService.updateReservation(id, reservation);
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
    }
}
