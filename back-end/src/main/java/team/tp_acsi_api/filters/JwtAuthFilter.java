package team.tp_acsi_api.filters;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@WebFilter
public class JwtAuthFilter extends OncePerRequestFilter {
    private String authHeader = "Authorization";
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
            final String jwt = request.getHeader(authHeader);
            if(jwt==null) {
                filterChain.doFilter(request, response);
                return;
            } 
    }
}
