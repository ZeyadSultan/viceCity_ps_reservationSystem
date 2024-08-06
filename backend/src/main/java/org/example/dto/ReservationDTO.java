package org.example.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Data
public class ReservationDTO {
    private Long id;

    private String reserverName;

    private String phoneNumber;

    private Date startTime;

    private Date endTime;

    private double cost;

    private boolean multi;

    private Long roomId;
}
