package team.tp_acsi_api.repositories;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import team.tp_acsi_api.models.Medicament;


@Repository
public interface MedicamentRepository extends MongoRepository<Medicament, ObjectId> {
    Optional<Medicament> findMedicamentById(ObjectId id);
    Optional<Medicament> findMedicamentByCode(String code);
}
