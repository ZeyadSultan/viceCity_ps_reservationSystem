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
}
