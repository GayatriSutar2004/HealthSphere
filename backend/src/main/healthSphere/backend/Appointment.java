package com.codeyk.full.stack.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Data                     // Lombok: Getter, Setter, toString, equals, hashCode
@NoArgsConstructor         // Lombok: No-args constructor
@AllArgsConstructor        // Lombok: All-args constructor
@Builder                   // Lombok: Builder pattern support
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientName;
    private String doctorName;
    private LocalDateTime appointmentDateTime;
    private String status;
}
