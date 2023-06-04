package team.tp_acsi_api.requests;

import java.util.Date;

import lombok.Data;


@Data
public class RegisterRequest {
    private String email;
    private String password;
    private String adresse;
    private String confirm_password;
    private String username;
    private String photo_url;
    private String birth_place;
    private Date birthday;
    private String nom;
    private String prenom;
}
