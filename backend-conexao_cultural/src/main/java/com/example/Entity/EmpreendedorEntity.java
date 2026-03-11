package com.example.Entity;

public class EmpreendedorEntity {
    
    private String id;
    private String nomeEmpresa;
    private String cnpj;
    private String cep;
    private String bio;
    private String imgPerfil;
    private String nicho;
    private String email;
    private String celular;
    // timestamp de criação da conta
    private long createdAt;

    public EmpreendedorEntity (){

    }

    public EmpreendedorEntity(String id, String nomeEmpresa, String cnpj, String cep,
        String bio, String imgPerfil, String nicho, String email, String celular){

            this.id = id;
            this.nomeEmpresa = nomeEmpresa;
            this.cnpj = cnpj;
            this.cep = cep;
            this.bio = bio;
            this.imgPerfil = imgPerfil;
            this.nicho = nicho;
            this.email = email;
            this.celular = celular;
            this.createdAt = System.currentTimeMillis();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNomeEmpresa() {
        return nomeEmpresa;
    }

    public void setNomeEmpresa(String nomeEmpresa) {
        this.nomeEmpresa = nomeEmpresa;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
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

    public String getNicho() {
        return nicho;
    }

    public void setNicho(String nicho) {
        this.nicho = nicho;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(long createdAt) {
        this.createdAt = createdAt;
    }
    

}
