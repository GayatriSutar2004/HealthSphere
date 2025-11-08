package com.codeyk.full.stack.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.codeyk.full.stack.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}
