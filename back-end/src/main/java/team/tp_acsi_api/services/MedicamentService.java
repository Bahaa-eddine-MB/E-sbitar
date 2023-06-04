package team.tp_acsi_api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team.tp_acsi_api.models.Medicament;
import team.tp_acsi_api.repositories.MedicamentRepository;
import team.tp_acsi_api.requests.CreateMedicamentRequest;
import team.tp_acsi_api.requests.DeleteMedicamentRequest;
import team.tp_acsi_api.requests.GetMedicamentRequest;
import team.tp_acsi_api.requests.UpdateMedicamentRequest;
import team.tp_acsi_api.responses.payloads.ListMedicamentsPayload;
import team.tp_acsi_api.responses.payloads.OneMedicamentPayload;

import java.util.List;
import java.util.Optional;

@Service
public class MedicamentService {
    private MedicamentRepository medicamentRepository;

    @Autowired
    public MedicamentService(MedicamentRepository medicamentRepository) {
        this.medicamentRepository = medicamentRepository;
    }

    public ListMedicamentsPayload getAll() throws Exception {
        List<Medicament> data = this.medicamentRepository.findAll();
        return new ListMedicamentsPayload(data);
    }

    public OneMedicamentPayload getOne(GetMedicamentRequest request) throws Exception {
        Optional<Medicament> opt = this.medicamentRepository.findMedicamentById(request.getId());
        if (opt.isEmpty()){
            throw new Exception("Medicament non trouve");
        }
        return new OneMedicamentPayload(opt.get());
    }

     public OneMedicamentPayload createOne(CreateMedicamentRequest request) throws Exception {
        Optional<Medicament> opt = this.medicamentRepository.findMedicamentByCode(request.getCode());
        if (opt.isPresent()){
            throw new Exception("Medicament avec meme code trouve");
        }
        Medicament medicament = new Medicament();
        medicament.setNom(request.getNom());
        medicament.setDescription(request.getDescription());
        medicament.setCode(request.getCode());
        medicament.setForme(request.getForme());
        medicament.setFabricant(request.getFabricant());
        medicament.setPrix(request.getPrix());
        medicament.setQuantite(request.getQuantite());
        medicament.setPhotos(request.getPhotos());
        this.medicamentRepository.save(medicament);
        return new OneMedicamentPayload(medicament);
    }

    public OneMedicamentPayload updateOne(UpdateMedicamentRequest request) throws Exception {
        Optional<Medicament> med = this.medicamentRepository.findMedicamentById(request.getId());
        if (med.isEmpty()){
            throw new Exception("Medicament non trouvee");
        }
        Optional<Medicament> opt = this.medicamentRepository.findMedicamentByCode(request.getCode());
        if (opt.isPresent() && !opt.get().isEqual(med.get().getId())){
            throw new Exception("Medicament avec meme code trouve");
        }
        Medicament medicament = med.get();
        medicament.setNom(request.getNom());
        medicament.setForme(request.getForme());
        medicament.setDescription(request.getDescription());
        medicament.setCode(request.getCode());
        medicament.setFabricant(request.getFabricant());
        medicament.setPrix(request.getPrix());
        medicament.setQuantite(request.getQuantite());
        medicament.setPhotos(request.getPhotos());
        this.medicamentRepository.save(medicament);
        return new OneMedicamentPayload(medicament);
    }

    public OneMedicamentPayload deleteOne(DeleteMedicamentRequest request) throws Exception {
        Optional<Medicament> opt = this.medicamentRepository.findMedicamentById(request.getId());
        if (opt.isEmpty()){
            throw new Exception("Medicament non trouvee");
        }
        Medicament medicament = opt.get();
        this.medicamentRepository.delete(medicament);
        return new OneMedicamentPayload(medicament);
    }
}
