package team.tp_acsi_api.controllers;


import java.util.Optional;

import team.tp_acsi_api.models.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import team.tp_acsi_api.requests.LoginRequest;
import team.tp_acsi_api.requests.RegisterRequest;
import team.tp_acsi_api.responses.payloads.AuthResponsePayload;
import team.tp_acsi_api.responses.FailedResponse;
import team.tp_acsi_api.responses.SuccessResponse;
import team.tp_acsi_api.services.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RequestMapping("")
@RestController
public class AuthController {
    private UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    private ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            AuthResponsePayload res = this.userService.registerUser(request);
            return new ResponseEntity<SuccessResponse>(new SuccessResponse("Register success", res), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<FailedResponse>(new FailedResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/login")
    private ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();
        try {
            AuthResponsePayload res = this.userService.loginUser(email, password);
            return new ResponseEntity<SuccessResponse>(new SuccessResponse("Login success", res), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<FailedResponse>(new FailedResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/verify")
    private ResponseEntity<?> home(HttpServletRequest request) {
        try {
            Optional<User> res = this.userService.verifyToken(request);
            return new ResponseEntity<SuccessResponse>(new SuccessResponse("Token verified", res), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<FailedResponse>(new FailedResponse(e.getMessage()), HttpStatus.UNAUTHORIZED);
        }
    }
}
