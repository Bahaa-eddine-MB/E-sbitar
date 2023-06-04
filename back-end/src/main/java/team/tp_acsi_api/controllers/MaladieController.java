package team.tp_acsi_api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import team.tp_acsi_api.requests.CreateMaladieRequest;
import team.tp_acsi_api.requests.DeleteMaladieRequest;
import team.tp_acsi_api.requests.GetMaladieRequest;
import team.tp_acsi_api.requests.UpdateMaladieRequest;
import team.tp_acsi_api.responses.payloads.ListMaladiesPayload;
import team.tp_acsi_api.responses.payloads.OneMaladiePayload;
import team.tp_acsi_api.responses.FailedResponse;
import team.tp_acsi_api.responses.SuccessResponse;
import team.tp_acsi_api.services.MaladieService;
import team.tp_acsi_api.services.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RequestMapping("/maladies")
@RestController
public class MaladieController {
    private UserService userService;
    private MaladieService maladieService;

    @Autowired
    public MaladieController(UserService userService, MaladieService maladieService) {
        this.userService = userService;
        this.maladieService = maladieService;
    }

    @GetMapping("/")
    private ResponseEntity<?> index(HttpServletRequest request) {
        try {
            this.userService.verifyToken(request);
            ListMaladiesPayload res = this.maladieService.getAll();
            return new ResponseEntity<SuccessResponse>(new SuccessResponse("Maladies recuperees avec success", res), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<FailedResponse>(new FailedResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/one")
    private ResponseEntity<?> show(HttpServletRequest req, @Valid @RequestBody GetMaladieRequest request) {
        try {
            this.userService.verifyToken(req);
            OneMaladiePayload res = this.maladieService.getOne(request);
            return new ResponseEntity<SuccessResponse>(new SuccessResponse("Maladie recuperee avec success", res), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<FailedResponse>(new FailedResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        }
    }

    @PutMapping("/")
    private ResponseEntity<?> edit(HttpServletRequest req, @Valid @RequestBody UpdateMaladieRequest request) {
        try {
            this.userService.isPrestataire(req);
            OneMaladiePayload res = this.maladieService.updateOne(request);
            return new ResponseEntity<SuccessResponse>(new SuccessResponse("Maladie modifiee avec success", res), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<FailedResponse>(new FailedResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/")
    private ResponseEntity<?> store(HttpServletRequest req, @Valid @RequestBody CreateMaladieRequest request) {
        try {
            this.userService.isPrestataire(req);
            OneMaladiePayload res = this.maladieService.createOne(request);
            return new ResponseEntity<SuccessResponse>(new SuccessResponse("Maladie cree avec success", res), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<FailedResponse>(new FailedResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/delete")
    private ResponseEntity<?> delete(HttpServletRequest req, @Valid @RequestBody DeleteMaladieRequest request) {
        try {
            this.userService.isPrestataire(req);
            OneMaladiePayload res = this.maladieService.deleteOne(request);
            return new ResponseEntity<SuccessResponse>(new SuccessResponse("Maladie supprimee avec success", res), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<FailedResponse>(new FailedResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        }
    }
}
