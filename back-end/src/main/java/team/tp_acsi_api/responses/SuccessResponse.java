package team.tp_acsi_api.responses;


import lombok.Getter;

@Getter
public class SuccessResponse {
    private final Boolean success = true;
    private String message;
    private Object data = null;

    public SuccessResponse(String message) {
        this.message = message;
    }

    public SuccessResponse(String message, Object data) {
        this.message = message;
        this.data = data;
    }

}
