package team.tp_acsi_api.models;

import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mongodb.lang.NonNull;

import lombok.Data;
import lombok.NoArgsConstructor;
import team.tp_acsi_api.serializers.ObjectIdSerializer;

@Document(collection="maladies")
@Data
@NoArgsConstructor
public class Maladie {
    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;
    
    @NonNull
    private String nom;

    @NonNull
    private String description;

    @NonNull
    private Set<String> symptomes;
    
    @NonNull
    private Set<String> causes;

    @NonNull
    private Set<String> photos;
}
