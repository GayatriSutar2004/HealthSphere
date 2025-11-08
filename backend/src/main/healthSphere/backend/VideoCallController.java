package com.codeyk.full.stack.controller;

import com.codeyk.full.stack.model.VideoCall;
import com.codeyk.full.stack.repository.VideoCallRepository;
import com.codeyk.full.stack.dto.VideoCallRequest;
import com.codeyk.full.stack.service.VideoCallService; // ✅ missing import fixed

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videocalls")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class VideoCallController {

    private final VideoCallRepository videoCallRepository;
    private final VideoCallService videoCallService; // ✅ properly injected via constructor (Lombok)

    // ✅ 1️⃣ Get all video calls
    @GetMapping
    public List<VideoCall> getAllVideoCalls() {
        return videoCallRepository.findAll();
    }

    // ✅ 2️⃣ Create a new video call (manual entry)
    @PostMapping
    public ResponseEntity<VideoCall> createVideoCall(@RequestBody VideoCall call) {
        return ResponseEntity.ok(videoCallRepository.save(call));
    }

    // ✅ 3️⃣ Start a live video call (via Twilio / Jitsi)
    @PostMapping("/start")
    public ResponseEntity<?> startVideoCall(@RequestBody VideoCallRequest request) {
        String link = videoCallService.startCall(request);
        return ResponseEntity.ok(link);
    }

    // ✅ 4️⃣ Update video call details
    @PutMapping("/{id}")
    public ResponseEntity<VideoCall> updateVideoCall(@PathVariable Long id, @RequestBody VideoCall updatedCall) {
        return videoCallRepository.findById(id)
                .map(call -> {
                    call.setDoctorName(updatedCall.getDoctorName());
                    call.setPatientName(updatedCall.getPatientName());
                    call.setCallLink(updatedCall.getCallLink());
                    call.setDateTime(updatedCall.getDateTime());
                    return ResponseEntity.ok(videoCallRepository.save(call));
                })
                .orElseThrow(() -> new RuntimeException("VideoCall not found with ID: " + id));
    }

    // ✅ 5️⃣ Delete a video call by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVideoCall(@PathVariable Long id) {
        if (!videoCallRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        videoCallRepository.deleteById(id);
        return ResponseEntity.ok("Video call deleted successfully!");
    }
}
