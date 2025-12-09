package com.kaan.triviagame.controller;

import com.kaan.triviagame.dto.UpdateStatsRequest;
import com.kaan.triviagame.dto.UserStatsResponse;
import com.kaan.triviagame.model.User;
import com.kaan.triviagame.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "http://localhost:5173")
public class StatsController {

    private final UserRepository userRepository;

    public StatsController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateStats(@Valid @RequestBody UpdateStatsRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        int newTotalCorrect = user.getTotalCorrectAnswers() + request.getCorrectAnswers();
        int newTotalQuestions = user.getTotalQuestionsAnswered() + request.getTotalQuestions();

        user.setTotalCorrectAnswers(newTotalCorrect);
        user.setTotalQuestionsAnswered(newTotalQuestions);

        userRepository.save(user);

        UserStatsResponse response = new UserStatsResponse(
                user.getUsername(),
                user.getTotalCorrectAnswers(),
                user.getTotalQuestionsAnswered()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getStats(@PathVariable String username) {
        User user = userRepository.findByUsername(username)
                .orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        UserStatsResponse response = new UserStatsResponse(
                user.getUsername(),
                user.getTotalCorrectAnswers(),
                user.getTotalQuestionsAnswered()
        );

        return ResponseEntity.ok(response);
    }
}
