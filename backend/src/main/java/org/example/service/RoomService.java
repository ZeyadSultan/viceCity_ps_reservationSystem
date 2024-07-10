package org.example.service;

import lombok.RequiredArgsConstructor;
import org.example.exception.ApiError;
import org.example.model.Room;
import org.example.repository.RoomRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

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

    public Room createRoom(Room room) {

        return roomRepository.save(room);
    }

    public Room updateRoom(Long id, Room room) {
        Optional<Room> roomOptional = roomRepository.findById(id);
        if (roomOptional.isPresent()) {
            Room existingRoom = roomOptional.get();
            existingRoom.setName(room.getName());
            existingRoom.setType(room.getType());
            existingRoom.setPricePerHour(room.getPricePerHour());
            existingRoom.setAvailable(room.isAvailable());
            return roomRepository.save(existingRoom);
        } else {
            throw ApiError.notFound("No room with this id!");
        }
    }

    public void deleteRoom(Long id) {
        Optional<Room> roomOptional = roomRepository.findById(id);
        if(roomOptional.isEmpty()) {
            throw ApiError.notFound("No room with this id!");
        }
        roomRepository.deleteById(id);
    }
}
