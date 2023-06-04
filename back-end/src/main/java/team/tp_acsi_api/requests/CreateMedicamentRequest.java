package team.tp_acsi_api.requests;

import java.util.Set;

import lombok.Data;


@Data
public class CreateMedicamentRequest {    
    private String code;
    private String nom;
    private String description;
    private String forme;
    private String fabricant;
    private Set<String> photos;
    private float prix;
    private int quantite;
}
