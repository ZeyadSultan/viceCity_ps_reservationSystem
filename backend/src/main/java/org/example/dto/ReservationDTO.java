package org.example.dto;

import lombok.Data;

import java.util.Date;

import org.example.model.Room;

@Data
public class ReservationDTO {
    private Long id;

    private String reserverName;

    private String phoneNumber;

    private Date startTime;

    private Date endTime;

    private double cost;

    private boolean multi;

    private Room room;
}
