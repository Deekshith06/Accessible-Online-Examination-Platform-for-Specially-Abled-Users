package com.accessexam.dto;

import com.accessexam.entity.User;

/** Response body for POST /api/auth/login — contains JWT token and user info */
public class LoginResponse {
    private String token;
    private Long userId;
    private String name;
    private String email;
    private User.Role role;
    private User.DisabilityType disabilityType;
    private int extraTimeMinutes;
    private String accessibilityPrefs;
    private String message;

    public LoginResponse() {}

    // getters/setters
    public String getToken(){ return token; }
    public Long getUserId(){ return userId; }
    public String getName(){ return name; }
    public String getEmail(){ return email; }
    public User.Role getRole(){ return role; }
    public User.DisabilityType getDisabilityType(){ return disabilityType; }
    public int getExtraTimeMinutes(){ return extraTimeMinutes; }
    public String getAccessibilityPrefs(){ return accessibilityPrefs; }
    public String getMessage(){ return message; }

    public void setToken(String t){ this.token = t; }
    public void setUserId(Long id){ this.userId = id; }
    public void setName(String n){ this.name = n; }
    public void setEmail(String e){ this.email = e; }
    public void setRole(User.Role r){ this.role = r; }
    public void setDisabilityType(User.DisabilityType d){ this.disabilityType = d; }
    public void setExtraTimeMinutes(int m){ this.extraTimeMinutes = m; }
    public void setAccessibilityPrefs(String p){ this.accessibilityPrefs = p; }
    public void setMessage(String m){ this.message = m; }

    // builder
    public static Builder builder(){ return new Builder(); }
    public static class Builder{
        private LoginResponse l = new LoginResponse();
        public Builder token(String t){ l.setToken(t); return this; }
        public Builder userId(Long id){ l.setUserId(id); return this; }
        public Builder name(String n){ l.setName(n); return this; }
        public Builder email(String e){ l.setEmail(e); return this; }
        public Builder role(User.Role r){ l.setRole(r); return this; }
        public Builder disabilityType(User.DisabilityType d){ l.setDisabilityType(d); return this; }
        public Builder extraTimeMinutes(int m){ l.setExtraTimeMinutes(m); return this; }
        public Builder accessibilityPrefs(String p){ l.setAccessibilityPrefs(p); return this; }
        public Builder message(String m){ l.setMessage(m); return this; }
        public LoginResponse build(){ return l; }
    }
}
