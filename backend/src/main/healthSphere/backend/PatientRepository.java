package com.codeyk.full.stack.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.codeyk.full.stack.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}

