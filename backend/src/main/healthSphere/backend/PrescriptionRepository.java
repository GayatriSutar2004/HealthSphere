package com.codeyk.full.stack.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.codeyk.full.stack.model.Prescription;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
}
