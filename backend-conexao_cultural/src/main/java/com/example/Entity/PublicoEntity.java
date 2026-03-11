package com.example.Entity;

public class PublicoEntity {

    private String id;
    private String nome;
    private String email;
    private short idade;
    private String celular;
    private String interesses;
    private String cep;
    private String bio;
    private String imgPerfil;
    // timestamp de criação da conta
    private long createdAt;

    public PublicoEntity(){

    }

    public PublicoEntity(String id, String nome, String email, short idade, String celular,
        String interesses, String cep, String bio, String imgPerfil){

            this.id = id;
            this.nome = nome;
            this.email = email;
            this.idade = idade;
            this.celular = celular;
            this.interesses = interesses;
            this.cep = cep;
            this.bio = bio;
            this.imgPerfil = imgPerfil;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public short getIdade() {
        return idade;
    }

    public void setIdade(short idade) {
        this.idade = idade;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getInteresses() {
        return interesses;
    }

    public void setInteresses(String interesses) {
        this.interesses = interesses;
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

    public long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(long createdAt) {
        this.createdAt = createdAt;
    }
    

}
