package org.example.service;

import lombok.RequiredArgsConstructor;
import org.example.dto.RoomsReservationsDTO;
import org.example.exception.ApiError;
import org.example.model.Reservation;
import org.example.model.Room;
import org.example.repository.RoomRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final ReservationService reservationService;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room getRoomById(Long id) {
        Optional<Room> roomOptional = roomRepository.findById(id);
        if(roomOptional.isEmpty()) {
            throw ApiError.notFound("No room with this id!");
        }
        return roomOptional.get();
    }

    public List<Room> getAvailableRooms() {
        List<Room> rooms = roomRepository.findByAvailable(true);
        if(rooms.isEmpty()) {
            throw ApiError.notFound("No rooms available!");
        }
        return rooms;
    }

    public Room createRoom(Room room) {

        return roomRepository.save(room);
    }

    public void saveRoom(Room room) {
        roomRepository.save(room);
    }

    public void deleteRoom(Long id) {
        Optional<Room> roomOptional = roomRepository.findById(id);
        if(roomOptional.isEmpty()) {
            throw ApiError.notFound("No room with this id!");
        }
        roomRepository.deleteById(id);
    }

    public List<RoomsReservationsDTO> getRoomsReservations() {
        List<Room> rooms = roomRepository.findAll();
        System.out.println("Rooms found: " + rooms.size()); // Debug statement

        return rooms.stream().map(room -> {
            RoomsReservationsDTO roomDTO = new RoomsReservationsDTO();
            roomDTO.setId(room.getId());
            roomDTO.setName(room.getName());
            roomDTO.setType(room.getType());
            roomDTO.setAvailable(room.isAvailable());
            roomDTO.setPriceSingle(room.getPriceSingle());
            roomDTO.setPriceMulti(room.getPriceMulti());

            if(room.isAvailable()) {
                roomDTO.setCurrentReservation(null);
            }
            else {
                Reservation lastReservation = reservationService.findCurrentReservation(room.getId());
                roomDTO.setCurrentReservation(lastReservation);
            }

            System.out.println("Processed room: " + roomDTO); // Debug statement

            return roomDTO;
        }).collect(Collectors.toList());
    }
}
