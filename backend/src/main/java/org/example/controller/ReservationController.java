package org.example.controller;

import lombok.RequiredArgsConstructor;

import org.example.dto.ReserveDTO;
import org.example.model.Reservation;
import org.example.model.Room;
import org.example.service.ReservationService;
import org.example.service.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping("/{roomId}")
    public ResponseEntity<Reservation> reserve(@PathVariable("roomId") long roomId,
                                               @RequestBody ReserveDTO reserveDTO) {
        Reservation reservation = reservationService.createReservation(reserveDTO, roomId);
        return ResponseEntity.ok(reservation);
    }

    @GetMapping("/checkout/{reservationId}")
    public ResponseEntity<Reservation> checkout(@PathVariable("reservationId") long reservationId) {
        Reservation reservation = reservationService.checkout(reservationId);
        return ResponseEntity.ok(reservation);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<List<Reservation>> getReservationsByRoomId(@PathVariable Long roomId) {
        List<Reservation> reservations = reservationService.getReservationsByRoomId(roomId);
        return ResponseEntity.ok(reservations);
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
