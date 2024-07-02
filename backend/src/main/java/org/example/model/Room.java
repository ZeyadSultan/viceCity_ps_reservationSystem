package org.example.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "rooms")
@Data
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private RoomType type;

    @Column(name = "price_per_hour")
    private double pricePerHour;

    private boolean available;

    @OneToMany(mappedBy = "room")
    private List<Reservation> reservations;
}

