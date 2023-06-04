package team.tp_acsi_api.responses.payloads;

import lombok.AllArgsConstructor;
import team.tp_acsi_api.models.User;

@AllArgsConstructor
public class AuthResponsePayload {
    public String token;
    public User user;
}
