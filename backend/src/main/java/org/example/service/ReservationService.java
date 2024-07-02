package org.example.service;

import lombok.RequiredArgsConstructor;
import org.example.exception.ApiError;
import org.example.model.Reservation;
import org.example.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation getReservationById(Long id) {
        Optional<Reservation> reservationOptional = reservationRepository.findById(id);
        if(reservationOptional.isEmpty()) {
            throw ApiError.notFound("No id with this reservation!");
        }
        return reservationOptional.get();
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
        if(reservationOptional.isEmpty()) {
            throw ApiError.notFound("No id with this reservation!");
        }
        reservationRepository.deleteById(id);
    }
}
