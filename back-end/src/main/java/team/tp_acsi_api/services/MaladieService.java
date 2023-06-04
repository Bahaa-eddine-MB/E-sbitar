package team.tp_acsi_api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team.tp_acsi_api.models.Maladie;
import team.tp_acsi_api.repositories.MaladieRepository;
import team.tp_acsi_api.requests.CreateMaladieRequest;
import team.tp_acsi_api.requests.DeleteMaladieRequest;
import team.tp_acsi_api.requests.GetMaladieRequest;
import team.tp_acsi_api.requests.UpdateMaladieRequest;
import team.tp_acsi_api.responses.payloads.ListMaladiesPayload;
import team.tp_acsi_api.responses.payloads.OneMaladiePayload;

import java.util.List;
import java.util.Optional;

@Service
public class MaladieService {
    private MaladieRepository maladieRepository;

    @Autowired
    public MaladieService(MaladieRepository maladieRepository) {
        this.maladieRepository = maladieRepository;
    }

    public ListMaladiesPayload getAll() throws Exception {
        List<Maladie> data = this.maladieRepository.findAll();
        return new ListMaladiesPayload(data);
    }

    public OneMaladiePayload getOne(GetMaladieRequest request) throws Exception {
        Optional<Maladie> opt = this.maladieRepository.findMaladieById(request.getId());
        if (opt.isEmpty()){
            throw new Exception("Maladie non trouvee");
        }
        return new OneMaladiePayload(opt.get());
    }

     public OneMaladiePayload createOne(CreateMaladieRequest request) throws Exception {
        Maladie maladie = new Maladie();
        maladie.setNom(request.getNom());
        maladie.setDescription(request.getDescription());
        maladie.setCauses(request.getCauses());
        maladie.setSymptomes(request.getSymptomes());
        maladie.setPhotos(request.getPhotos());
        this.maladieRepository.save(maladie);
        return new OneMaladiePayload(maladie);
    }

    public OneMaladiePayload updateOne(UpdateMaladieRequest request) throws Exception {
        Optional<Maladie> opt = this.maladieRepository.findMaladieById(request.getId());
        if (opt.isEmpty()){
            throw new Exception("Maladie non trouvee");
        }
        Maladie maladie = opt.get();
        maladie.setNom(request.getNom());
        maladie.setDescription(request.getDescription());
        maladie.setCauses(request.getCauses());
        maladie.setSymptomes(request.getSymptomes());
        maladie.setPhotos(request.getPhotos());
        this.maladieRepository.save(maladie);
        return new OneMaladiePayload(maladie);
    }

    public OneMaladiePayload deleteOne(DeleteMaladieRequest request) throws Exception {
        Optional<Maladie> opt = this.maladieRepository.findMaladieById(request.getId());
        if (opt.isEmpty()){
            throw new Exception("Maladie non trouvee");
        }
        Maladie maladie = opt.get();
        this.maladieRepository.delete(maladie);
        return new OneMaladiePayload(maladie);
    }
}
