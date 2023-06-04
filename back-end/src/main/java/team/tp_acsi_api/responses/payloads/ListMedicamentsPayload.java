package team.tp_acsi_api.responses.payloads;

import java.util.List;

import lombok.AllArgsConstructor;
import team.tp_acsi_api.models.Medicament;

@AllArgsConstructor
public class ListMedicamentsPayload {
    public List<Medicament> medicaments;
}
