package team.tp_acsi_api.requests;

import lombok.Data;


@Data
public class LoginRequest  {
    private String email;
    private String password;
}
