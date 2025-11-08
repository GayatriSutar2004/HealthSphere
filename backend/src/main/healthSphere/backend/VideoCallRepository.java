package com.codeyk.full.stack.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.codeyk.full.stack.model.VideoCall;
public interface VideoCallRepository extends JpaRepository<VideoCall, Long> {
}
