package team.tp_acsi_api.requests;


import org.bson.types.ObjectId;

import lombok.Data;


@Data
public class GetMedicamentRequest {
    private ObjectId id;
}
