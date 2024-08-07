package org.example.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "reservations")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reserver_name")
    private String reserverName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "start_time")
    private Date startTime;

    @Column(name = "end_time")
    private Date endTime;

    private double cost;

    private boolean multi;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;
}
