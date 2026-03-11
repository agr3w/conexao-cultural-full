package com.example.Entity;


public class ArtistaEntity {

    private String id;
    private String nome;
    private String nicho;
    private String bio;
    private String imgPerfil;
    private String celular;
    private String email;
    // timestamp de criação da conta
    private long createdAt;


    public ArtistaEntity(){
    
    }

    public ArtistaEntity(String id, String nome, String nicho, String bio, String imgPerfil,
        String celular, String email){
        
        this.id = id;
        this.nome = nome;
        this.nicho = nicho;
        this.bio = bio;
        this.imgPerfil = imgPerfil;
        this.celular = celular;
        this.email = email;
        this.createdAt = System.currentTimeMillis();    

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNicho() {
        return nicho;
    }

    public void setNicho(String nicho) {
        this.nicho = nicho;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getImgPerfil() {
        return imgPerfil;
    }

    public void setImgPerfil(String imgPerfil) {
        this.imgPerfil = imgPerfil;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(long createdAt) {
        this.createdAt = createdAt;
    }


}
