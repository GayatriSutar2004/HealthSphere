package com.codeyk.full.stack.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.codeyk.full.stack.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
