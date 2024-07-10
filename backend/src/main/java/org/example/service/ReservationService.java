package org.example.service;

import lombok.RequiredArgsConstructor;

import org.example.dto.ReservationDTO;
import org.example.exception.ApiError;
import org.example.model.Reservation;
import org.example.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public ReservationDTO getLatestReservationByRoomId(Long roomId) {
        return ReservationDTO.from(reservationRepository.findFirstByRoomIdOrderByStartTimeDesc(roomId));
    }

    public ReservationDTO getCurrentReservationByRoomId(Long roomId) {
        ReservationDTO latestReservation = this.getLatestReservationByRoomId(roomId);
        if (latestReservation == null) {
            return null;
        }
        boolean isCurrent = LocalDateTime.parse(latestReservation.endTime()).isAfter(LocalDateTime.now());
        if (isCurrent) {
            return latestReservation;
        }
        return null;
    }

    public List<ReservationDTO> getAllReservations() {
        return reservationRepository.findAll().stream().map(reservation -> {
            return ReservationDTO.from(reservation);
        }).toList();
    }

    public ReservationDTO getReservationById(Long id) {
        Optional<Reservation> reservationOptional = reservationRepository.findById(id);
        if (reservationOptional.isEmpty()) {
            throw ApiError.notFound("No id with this reservation!");
        }
        return ReservationDTO.from(reservationOptional.get());
    }

    public Reservation createReservation(Reservation reservation) {

        return reservationRepository.save(reservation);
    }

    public Reservation updateReservation(Long id, Reservation reservation) {
        Optional<Reservation> reservationOptional = reservationRepository.findById(id);
        if (reservationOptional.isPresent()) {
            Reservation existingReservation = reservationOptional.get();
            existingReservation.setRoom(reservation.getRoom());
            existingReservation.setReserverName(reservation.getReserverName());
            existingReservation.setPhoneNumber(reservation.getPhoneNumber());
            existingReservation.setStartTime(reservation.getStartTime());
            existingReservation.setEndTime(reservation.getEndTime());
            existingReservation.setCost(reservation.getCost());
            return reservationRepository.save(existingReservation);
        } else {
            throw ApiError.notFound("No id with this reservation!");
        }
    }

    public void deleteReservation(Long id) {
        Optional<Reservation> reservationOptional = reservationRepository.findById(id);
        if (reservationOptional.isEmpty()) {
            throw ApiError.notFound("No id with this reservation!");
        }
        reservationRepository.deleteById(id);
    }
}
