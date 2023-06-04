package team.tp_acsi_api.responses.payloads;
import java.util.List;

import lombok.AllArgsConstructor;
import team.tp_acsi_api.models.Maladie;

@AllArgsConstructor
public class ListMaladiesPayload {
    public List<Maladie> maladies;
}
