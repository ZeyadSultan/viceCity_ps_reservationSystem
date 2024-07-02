package org.example.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
@Data
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reserver_name")
    private String reserverName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    private double cost;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;
}
