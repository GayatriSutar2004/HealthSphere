package com.codeyk.full.stack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoCallRequest {
    private String doctorName;
    private String patientName;
    private String roomName;  // অথবা sessionId / meetingId
}

