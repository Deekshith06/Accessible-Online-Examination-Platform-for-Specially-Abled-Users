package com.accessexam.dto;

import com.accessexam.entity.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** Request body for POST /api/auth/register */
public class RegisterRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    private User.DisabilityType disabilityType = User.DisabilityType.NONE;

    private User.Role role = User.Role.STUDENT;

    public RegisterRequest() {}
    public String getName(){ return name; }
    public String getEmail(){ return email; }
    public String getPassword(){ return password; }
    public User.DisabilityType getDisabilityType(){ return disabilityType; }
    public User.Role getRole(){ return role; }

    public void setName(String v){ this.name = v; }
    public void setEmail(String v){ this.email = v; }
    public void setPassword(String v){ this.password = v; }
    public void setDisabilityType(User.DisabilityType v){ this.disabilityType = v; }
    public void setRole(User.Role v){ this.role = v; }
}
