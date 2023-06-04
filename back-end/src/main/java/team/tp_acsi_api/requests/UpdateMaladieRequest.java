package team.tp_acsi_api.requests;

import java.util.Set;

import org.bson.types.ObjectId;

import lombok.Data;


@Data
public class UpdateMaladieRequest {
    private ObjectId id;
    private String nom;
    private String description;
    private Set<String> symptomes;
    private Set<String> causes;
    private Set<String> photos;
}
