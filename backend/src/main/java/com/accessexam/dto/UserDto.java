package com.accessexam.dto;

import com.accessexam.entity.User;
/** User profile DTO — used in GET /api/users/me and the admin user list */
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private User.Role role;
    private User.DisabilityType disabilityType;
    private int extraTimeMinutes;
    private String accessibilityPrefs;

    public UserDto() {}

    public UserDto(Long id, String name, String email, User.Role role, User.DisabilityType disabilityType,
                   int extraTimeMinutes, String accessibilityPrefs){
        this.id = id; this.name = name; this.email = email; this.role = role;
        this.disabilityType = disabilityType; this.extraTimeMinutes = extraTimeMinutes; this.accessibilityPrefs = accessibilityPrefs;
    }

    // getters and setters
    public Long getId(){ return id; }
    public String getName(){ return name; }
    public String getEmail(){ return email; }
    public User.Role getRole(){ return role; }
    public User.DisabilityType getDisabilityType(){ return disabilityType; }
    public int getExtraTimeMinutes(){ return extraTimeMinutes; }
    public String getAccessibilityPrefs(){ return accessibilityPrefs; }

    public void setId(Long id){ this.id = id; }
    public void setName(String name){ this.name = name; }
    public void setEmail(String email){ this.email = email; }
    public void setRole(User.Role role){ this.role = role; }
    public void setDisabilityType(User.DisabilityType dt){ this.disabilityType = dt; }
    public void setExtraTimeMinutes(int m){ this.extraTimeMinutes = m; }
    public void setAccessibilityPrefs(String p){ this.accessibilityPrefs = p; }

    // Simple builder
    public static Builder builder(){ return new Builder(); }
    public static class Builder{
        private UserDto d = new UserDto();
        public Builder id(Long id){ d.setId(id); return this; }
        public Builder name(String n){ d.setName(n); return this; }
        public Builder email(String e){ d.setEmail(e); return this; }
        public Builder role(User.Role r){ d.setRole(r); return this; }
        public Builder disabilityType(User.DisabilityType dt){ d.setDisabilityType(dt); return this; }
        public Builder extraTimeMinutes(int m){ d.setExtraTimeMinutes(m); return this; }
        public Builder accessibilityPrefs(String p){ d.setAccessibilityPrefs(p); return this; }
        public UserDto build(){ return d; }
    }
}
