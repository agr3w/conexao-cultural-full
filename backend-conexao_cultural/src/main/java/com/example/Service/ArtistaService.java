package com.example.Service;

import java.util.ArrayList;
import java.util.List;

import com.example.Entity.ArtistaEntity;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

public class ArtistaService {

    private final Firestore db;

    public ArtistaService(){
        this.db = FirestoreClient.getFirestore();
    }
    
    // salvar usuario do tipo artista
    @SuppressWarnings("UseSpecificCatch")
    public ArtistaEntity salvarArtista(ArtistaEntity artista) {
        try {
            var docRef = db.collection("artistas").document();
            artista.setId(docRef.getId());
            docRef.set(artista).get();
            return artista;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao salvar artista", e);
        }
    }

    // buscar o usuario por id
    @SuppressWarnings("UseSpecificCatch")
    public ArtistaEntity findById(String id) {
            try {
            DocumentSnapshot doc = db.collection("artistas").document(id).get().get();
            if (!doc.exists()) {
                return null;
            }

            ArtistaEntity artista = doc.toObject(ArtistaEntity.class);
            artista.setId(doc.getId());

            return artista;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar artista por ID", e);
        }
    }

    // atualizar usuario
    @SuppressWarnings("UseSpecificCatch")
    public ArtistaEntity atualizarArtista(ArtistaEntity artista, String id) {
            try {
            var docRef = db.collection("artistas").document(id);

            DocumentSnapshot doc = docRef.get().get();
            if (!doc.exists()) {
                return null;
            }

            artista.setId(id);
            docRef.set(artista).get();

            return artista;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar artista", e);
        }

    }
    
    // excluir usuario
    @SuppressWarnings("UseSpecificCatch")
    public boolean deletarArtista(String id) {
        try {
            var docRef = db.collection("artistas").document(id);

            DocumentSnapshot doc = docRef.get().get();
            if (!doc.exists()) {
                return false;
            }

            docRef.delete().get();
            return true;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao deletar artista", e);
        }
    }

    // Listar usuarios
    @SuppressWarnings("UseSpecificCatch")
    public List<ArtistaEntity> listarTodos() {
        try {
            List<ArtistaEntity> lista = new ArrayList<>();
            var querySnapshot = db.collection("artistas").get().get();

            for (DocumentSnapshot doc : querySnapshot.getDocuments()) {
                ArtistaEntity artista = doc.toObject(ArtistaEntity.class);
                artista.setId(doc.getId());
                lista.add(artista);
            }

            return lista;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao listar artistas", e);
        }
    }

}
