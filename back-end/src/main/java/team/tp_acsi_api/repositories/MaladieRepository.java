package team.tp_acsi_api.repositories;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import team.tp_acsi_api.models.Maladie;


@Repository
public interface MaladieRepository extends MongoRepository<Maladie, ObjectId> {
    Maladie findMaladieByNomContainingIgnoreCase(String name);
    Optional<Maladie> findMaladieById(ObjectId id);
}
