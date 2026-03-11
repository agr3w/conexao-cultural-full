package com.example.Entity;

public class FeedPostEntity {

    private String id;
    // Autor duplicado para melhor performance no firebase
    private int autorId;
    private String nomeAutor;
    private String fotoAutor;
    private String conteudo;
    private String imagemPost;
    private int curtidasCont;
    private int comentariosCont;
    private long createdAt;

    public FeedPostEntity(){

    }

    public FeedPostEntity(String id, int autorId, String nomeAutor, String fotoAutor,
        String conteudo, String imagemPost){

            this.id = id;
            this.autorId = autorId;
            this.nomeAutor = nomeAutor;
            this.fotoAutor = fotoAutor;
            this.conteudo = conteudo;
            this.imagemPost = imagemPost;
            this.createdAt = System.currentTimeMillis();
            this.curtidasCont = 0;
            this.comentariosCont = 0;

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getAutorId() {
        return autorId;
    }

    public void setAutorId(int autorId) {
        this.autorId = autorId;
    }

    public String getNomeAutor() {
        return nomeAutor;
    }

    public void setNomeAutor(String nomeAutor) {
        this.nomeAutor = nomeAutor;
    }

    public String getFotoAutor() {
        return fotoAutor;
    }

    public void setFotoAutor(String fotoAutor) {
        this.fotoAutor = fotoAutor;
    }

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public String getImagemPost() {
        return imagemPost;
    }

    public void setImagemPost(String imagemPost) {
        this.imagemPost = imagemPost;
    }

    public int getCurtidasCont() {
        return curtidasCont;
    }

    public void setCurtidasCont(int curtidasCont) {
        this.curtidasCont = curtidasCont;
    }

    public int getComentariosCont() {
        return comentariosCont;
    }

    public void setComentariosCont(int comentariosCont) {
        this.comentariosCont = comentariosCont;
    }

    public long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(long createdAt) {
        this.createdAt = createdAt;
    }


}
