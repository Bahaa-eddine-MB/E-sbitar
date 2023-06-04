package team.tp_acsi_api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import team.tp_acsi_api.models.ERole;
import team.tp_acsi_api.models.Role;
import team.tp_acsi_api.models.User;
import team.tp_acsi_api.repositories.RoleRepository;
import team.tp_acsi_api.repositories.UserRepository;
import team.tp_acsi_api.requests.RegisterRequest;
import team.tp_acsi_api.responses.payloads.AuthResponsePayload;

import java.util.Date;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private UserRepository userRepository;
    private RoleRepository roleRepository; // Add RoleRepository
    private JwtService jwtService;
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       JwtService jwtService,
                       BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository; // Initialize roleRepository
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email not found"));
    }

    public AuthResponsePayload loginUser(String email, String password) throws Exception {
        Optional<User> user = this.userRepository.findUserByEmail(email);
        //check is user credentials are correct
        if (!user.isPresent() || !passwordEncoder.matches(password, user.get().getPassword())) {
            throw new Exception("Wrong credentials");
        }
        String jwt = this.jwtService.generateToken(email);
        return new AuthResponsePayload(jwt, user.get());
    }

    public AuthResponsePayload registerUser(RegisterRequest request) throws Exception {
        String email = request.getEmail();
        String username = request.getUsername();
        String password = request.getPassword();
        String photo_url = request.getPhoto_url();
        String nom = request.getNom();
        String prenom = request.getPrenom();
        String adresse = request.getAdresse();
        String birth_place = request.getBirth_place();
        Date birthday = request.getBirthday();
        String confirm_password = request.getConfirm_password();

        if (!password.equals(confirm_password)) {
            throw new Exception("Passwords doesn't match");
        }
        if (this.userRepository.findUserByEmail(email).isPresent()) {
            throw new Exception("Email already used");
        }
        //Check if username already exists
        if (this.userRepository.findUserByUsername(username).isPresent()) {
            throw new Exception("Username already used");
        }
        //Create new user
        Role patientRole = roleRepository.findRoleByName(ERole.PATIENT);
        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setAdresse(adresse);
        user.setNom(nom);
        user.setPrenom(prenom);
        user.setPhoto_url(photo_url);
        user.setBirth_place(birth_place);
        user.setBirthday(birthday);
        user.setRole(patientRole);
        user.setPassword(passwordEncoder.encode(password));
        this.userRepository.save(user);
        
        // Generate a JWT
        String jwt = this.jwtService.generateToken(email);
        return new AuthResponsePayload(jwt, user);
    }

    public Optional<User> verifyToken(HttpServletRequest req) throws Exception{
        final String jwt = req.getHeader("Authorization");
        if(jwt==null) {
            throw new Exception("Unauthorized");
        }
        try {
            String email = jwtService.getUsernameFromToken(jwt);
            Optional<User> user = userRepository.findUserByEmail(email);
            return user;

        } catch (Exception e) {
            throw new Exception("Unauthorized");
        }
    }

    public Optional<User> isPrestataire(HttpServletRequest req) throws Exception {
        final String jwt = req.getHeader("Authorization");
        if (jwt == null) {
            throw new Exception("Unauthorized");
        }
        try {
            String email = jwtService.getUsernameFromToken(jwt);
            Optional<User> user = userRepository.findUserByEmail(email);
            if (user.isPresent()) {
                User currentUser = user.get();
                Role userRole = currentUser.getRole();
                if (userRole != null && userRole.getName() == ERole.PRESTATAIRE) {
                    return user;
                }
            }
            throw new Exception("Unauthorized");
        } catch (Exception e) {
            throw new Exception("Unauthorized");
        }
    }
}
