package com.codeyk.full.stack.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VideoCall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- Existing fields ---
    private String doctorName;
    private String patientName;
    private String callLink;
    private String dateTime;

    // --- Newly added fields ---
    private String date;
    private String time;
    private String duration;
    private String status;

    // --- Relation with Patient ---
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
}
