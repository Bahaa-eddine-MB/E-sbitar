package team.tp_acsi_api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import team.tp_acsi_api.requests.CreateMedicamentRequest;
import team.tp_acsi_api.requests.DeleteMedicamentRequest;
import team.tp_acsi_api.requests.GetMedicamentRequest;
import team.tp_acsi_api.requests.UpdateMedicamentRequest;
import team.tp_acsi_api.responses.payloads.ListMedicamentsPayload;
import team.tp_acsi_api.responses.payloads.OneMedicamentPayload;
import team.tp_acsi_api.responses.FailedResponse;
import team.tp_acsi_api.responses.SuccessResponse;
import team.tp_acsi_api.services.MedicamentService;
import team.tp_acsi_api.services.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RequestMapping("/medicaments")
@RestController
public class MedicamentController {
    private UserService userService;
    private MedicamentService medicamentService;

    @Autowired
    public MedicamentController(UserService userService, MedicamentService medicamentService) {
        this.userService = userService;
        this.medicamentService = medicamentService;
    }

    @GetMapping("/")
    private ResponseEntity<?> index(HttpServletRequest request) {
        try {
            this.userService.verifyToken(request);
            ListMedicamentsPayload res = this.medicamentService.getAll();
            return new ResponseEntity<SuccessResponse>(new SuccessResponse("Medicaments recuperes avec success", res), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<FailedResponse>(new FailedResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/one")
    private ResponseEntity<?> show(HttpServletRequest req, @Valid @RequestBody GetMedicamentRequest request) {
        try {
            this.userService.verifyToken(req);
            OneMedicamentPayload res = this.medicamentService.getOne(request);
            return new ResponseEntity<SuccessResponse>(new SuccessResponse("Medicament recupere avec success", res), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<FailedResponse>(new FailedResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        }
    }

    @PutMapping("/")
    private ResponseEntity<?> edit(HttpServletRequest req, @Valid @RequestBody UpdateMedicamentRequest request) {
        try {
            this.userService.isPrestataire(req);
            OneMedicamentPayload res = this.medicamentService.updateOne(request);
            return new ResponseEntity<SuccessResponse>(new SuccessResponse("Medicament modifie avec success", res), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<FailedResponse>(new FailedResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/")
    private ResponseEntity<?> store(HttpServletRequest req, @Valid @RequestBody CreateMedicamentRequest request) {
        try {
            this.userService.isPrestataire(req);
            OneMedicamentPayload res = this.medicamentService.createOne(request);
            return new ResponseEntity<SuccessResponse>(new SuccessResponse("Medicament cree avec success", res), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<FailedResponse>(new FailedResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/delete")
    private ResponseEntity<?> delete(HttpServletRequest req, @Valid @RequestBody DeleteMedicamentRequest request) {
        try {
            this.userService.isPrestataire(req);
            OneMedicamentPayload res = this.medicamentService.deleteOne(request);
            return new ResponseEntity<SuccessResponse>(new SuccessResponse("Medicament supprime avec success", res), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<FailedResponse>(new FailedResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        }
    }
}
