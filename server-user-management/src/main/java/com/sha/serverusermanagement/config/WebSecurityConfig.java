package com.sha.serverusermanagement.config;

import com.sha.serverusermanagement.jwt.JwtAuthorizationFilter;
import com.sha.serverusermanagement.jwt.JwtTokenProvider;
import com.sha.serverusermanagement.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //Cross-origin-resource-sharing: Serve it from -> localhost: 8080, Request from -> localhost:4200 (permit/block with cors)
        http.cors().and()
                .authorizeRequests()
                //These are public pages.
                .antMatchers("/resources/**", "/error", "/api/user/**").permitAll()
                //These can be reachable for just admin role. In here, ADMIN means: ADMIN or ROLE_ADMIN;
                .antMatchers("/api/admin/**").hasRole("ADMIN")
                //all remaining paths should need authentication.
                .anyRequest().fullyAuthenticated()
                .and()
                //logout will log the user out by invalidate session.
                .logout().permitAll()
                .logoutRequestMatcher(new AntPathRequestMatcher("/api/user/logout", "POST")).and()
                //login form and path
                .formLogin().loginPage("/api/user/login").and()
                //Enable basic authentication. So our Authorization type is BasicAuthorization. bto(username:password)
                .httpBasic().and()
                //Cross side request forgery.
                .csrf().disable();

        http.addFilter(new JwtAuthorizationFilter(authenticationManager(), tokenProvider));
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    //Cross origin resource sharing.
    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                //Exp: addMapping("api/**").allowedOrigins("http://d1.com, http://d2.com").allowedMethods("GET, POST");
                registry.addMapping("/**").allowedOrigins("*").allowedMethods("*");
            }
        };
    }
}
