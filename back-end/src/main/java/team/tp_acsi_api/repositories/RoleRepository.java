package team.tp_acsi_api.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import team.tp_acsi_api.models.ERole;
import team.tp_acsi_api.models.Role;


@Repository
public interface RoleRepository extends MongoRepository<Role, ObjectId> {
    Role findRoleByName(ERole name);
}
