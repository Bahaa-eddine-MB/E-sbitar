package team.tp_acsi_api.requests;

import java.util.Set;

import org.bson.types.ObjectId;

import lombok.Data;


@Data
public class UpdateMedicamentRequest  {  
    private ObjectId id;  
    private String code;
    private String nom;
    private String forme;
    private String description;
    private String fabricant;
    private Set<String> photos;
    private float prix;
    private int quantite;
}
