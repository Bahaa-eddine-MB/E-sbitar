package team.tp_acsi_api.responses;


import lombok.Getter;

@Getter
public class FailedResponse {
    private final Boolean success = false;
    private String message;
    private Object errors = null;

    public FailedResponse(String message) {
        this.message = message;
    }
    public FailedResponse(String message, Object errors) {
        this.message = message;
        this.errors = errors;
    }
}
