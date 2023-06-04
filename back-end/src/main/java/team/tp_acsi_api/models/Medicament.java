package team.tp_acsi_api.models;

import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mongodb.lang.NonNull;

import lombok.Data;
import lombok.NoArgsConstructor;
import team.tp_acsi_api.serializers.ObjectIdSerializer;

@Document(collection="medicaments")
@Data
@NoArgsConstructor
public class Medicament {
    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;
    
    @NonNull
    @Indexed(unique = true)
    private String code;

    @NonNull
    private String nom;

    @NonNull
    private String description;

    @NonNull
    private String forme;

    @NonNull
    private String fabricant;

    @NonNull
    private Set<String> photos;

    @NonNull
    private float prix;

    @NonNull
    private int quantite;


    public boolean isEqual(ObjectId id) {
        return this.id.toHexString().equals(id.toHexString());
    }
}
