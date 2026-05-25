package com.accessexam.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/** Request body for POST /api/auth/login */
public class LoginRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    public LoginRequest() {}
    public String getEmail(){ return email; }
    public String getPassword(){ return password; }
    public void setEmail(String e){ this.email = e; }
    public void setPassword(String p){ this.password = p; }
}
