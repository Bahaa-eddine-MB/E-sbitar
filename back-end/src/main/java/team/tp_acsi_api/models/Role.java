package team.tp_acsi_api.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mongodb.lang.NonNull;

import lombok.Data;
import lombok.NoArgsConstructor;
import team.tp_acsi_api.serializers.ObjectIdSerializer;

@Document(collection="roles")
@Data
@NoArgsConstructor
public class Role {
    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;

    @NonNull
    private ERole name;

    public Role(ERole name) {
        this.name = name;
    }
}
