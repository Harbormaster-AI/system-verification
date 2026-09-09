package com.harbormaster.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@ConditionalOnProperty(
    name = "hm.security.authentication",
    havingValue = "none")
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http)
            throws Exception {
                        // # bug: authentication=none must permitAll (authenticated() blocks /actuator/health and fails runtime verification)
                        http
                            .authorizeHttpRequests(auth -> auth
                            .anyRequest().permitAll())
                            .csrf(csrf -> csrf.disable());

        return http.build();
    }
}