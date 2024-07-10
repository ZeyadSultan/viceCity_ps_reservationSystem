package org.example.controller;

import lombok.RequiredArgsConstructor;

import org.example.dto.RoomDTO;
import org.example.model.Room;
import org.example.service.ReservationService;
import org.example.service.RoomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;
    private final ReservationService reservationService;

    @GetMapping("/with-current-reservation")
    public List<RoomDTO> getAllRoomsWithCurrReservation() {
        var rooms = roomService.getAllRooms();

        var roomsDtos = rooms.stream().map(room -> {
            var currReservation = reservationService.getCurrentReservationByRoomId(room.getId());
            RoomDTO roomDto = new RoomDTO(room.getId(), room.getName(), room.getType(),
                    room.getPricePerHour(),
                    room.isAvailable(), null, currReservation);

            return roomDto;
        }).toList();
        return roomsDtos;
    }

    @GetMapping
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    @PostMapping
    public Room createRoom(@RequestBody Room room) {
        return roomService.createRoom(room);
    }

    @GetMapping("/{id}")
    public Room getRoomById(@PathVariable Long id) {
        return roomService.getRoomById(id);
    }

    @GetMapping("/{id}/with-current-reservation")
    public RoomDTO getRoomByIdWithCurrReservation(@PathVariable Long id) {
        Room room = roomService.getRoomById(id);
        var currReservation = reservationService.getCurrentReservationByRoomId(room.getId());
        RoomDTO roomDto = new RoomDTO(room.getId(), room.getName(), room.getType(),
                room.getPricePerHour(),
                room.isAvailable(), null, currReservation);
        return roomDto;
    }

    @PutMapping("/{id}")
    public Room updateRoom(@PathVariable Long id, @RequestBody Room room) {
        return roomService.updateRoom(id, room);
    }

    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
    }
}
