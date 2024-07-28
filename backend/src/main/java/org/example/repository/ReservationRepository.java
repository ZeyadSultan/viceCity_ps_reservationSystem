package org.example.repository;

import org.example.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
  List<Reservation> findAllByRoomId(Long roomId);
  Reservation findTopByRoomIdOrderByStartTimeDesc(Long roomId);
}
