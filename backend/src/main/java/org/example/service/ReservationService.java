package org.example.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.example.dto.ReserveDTO;
import org.example.exception.ApiError;
import org.example.model.Reservation;
import org.example.model.Room;
import org.example.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final RoomService roomService;

//    public ReservationDTO getLatestReservationByRoomId(Long roomId) {
//        return ReservationDTO.from(reservationRepository.findFirstByRoomIdOrderByStartTimeDesc(roomId));
//    }
//
//    public ReservationDTO getCurrentReservationByRoomId(Long roomId) {
//        ReservationDTO latestReservation = this.getLatestReservationByRoomId(roomId);
//        if (latestReservation == null) {
//            return null;
//        }
//        boolean isCurrent = LocalDateTime.parse(latestReservation.endTime()).isAfter(LocalDateTime.now());
//        if (isCurrent) {
//            return latestReservation;
//        }
//        return null;
//    }

    public List<Reservation> getReservationsByRoomId(Long roomId) {
        return reservationRepository.findAllByRoomId(roomId);
    }


    public Reservation getReservationById(Long id) {
        Optional<Reservation> reservationOptional = reservationRepository.findById(id);
        if (reservationOptional.isEmpty()) {
            throw ApiError.notFound("No id with this reservation!");
        }
        return reservationOptional.get();
    }

    public Reservation createReservation(ReserveDTO reserveDTO, long roomId) {

        Reservation reservation = Reservation.builder()
                .reserverName(reserveDTO.getReserverName())
                .phoneNumber(reserveDTO.getPhoneNumber())
                .startTime(new Date())
                .multi(reserveDTO.isMulti())
                .room(roomService.getRoomById(roomId))
                .build();
        Room room = roomService.getRoomById(roomId);
        room.setAvailable(false);

        return reservationRepository.save(reservation);
    }

    @Transactional
    public Reservation checkout(long reservationId) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(reservationId);
        if (!optionalReservation.isPresent()) {
            throw ApiError.notFound("Reservation not found with this id");
        }

        Reservation reservation = optionalReservation.get();
        Room room = roomService.getRoomById(reservation.getRoom().getId());

        Date endTime = new Date();
        reservation.setEndTime(endTime);

        long durationMillis = endTime.getTime() - reservation.getStartTime().getTime();

        long durationMinutes = durationMillis / (1000 * 60);
        double durationHours = durationMinutes / 60.0;

        double totalCost = room.getPriceSingle() * durationHours;
        reservation.setCost(Math.floor(totalCost));
        room.setAvailable(true);
//        roomService.saveRoom(room);
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
