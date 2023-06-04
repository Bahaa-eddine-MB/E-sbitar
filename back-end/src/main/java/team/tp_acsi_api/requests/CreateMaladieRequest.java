package team.tp_acsi_api.requests;

import java.util.Set;

import lombok.Data;


@Data
public class CreateMaladieRequest {
    private String nom;
    private String description;
    private Set<String> symptomes;
    private Set<String> causes;
    private Set<String> photos;
}
