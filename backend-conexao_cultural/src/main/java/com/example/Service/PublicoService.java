package com.example.Service;

import java.util.ArrayList;
import java.util.List;

import com.example.Entity.PublicoEntity;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

public class PublicoService {
 
    private final Firestore db;

    public PublicoService(){
        this.db = FirestoreClient.getFirestore();
    }
    
    // salvar usuario do tipo artista
    @SuppressWarnings("UseSpecificCatch")
    public PublicoEntity salvarPublico(PublicoEntity publico) {
        try {
            var docRef = db.collection("publicos").document();
            publico.setId(docRef.getId());
            docRef.set(publico).get();
            return publico;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao salvar publico", e);
        }
    }

    // buscar o usuario por id
    @SuppressWarnings("UseSpecificCatch")
    public PublicoEntity findById(String id) {
            try {
            DocumentSnapshot doc = db.collection("publicos").document(id).get().get();
            if (!doc.exists()) {
                return null;
            }

            PublicoEntity publico = doc.toObject(PublicoEntity.class);
            publico.setId(doc.getId());

            return publico;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar publico por ID", e);
        }
    }

    // atualizar usuario
    @SuppressWarnings("UseSpecificCatch")
    public PublicoEntity atualizarPublico(PublicoEntity publico, String id) {
            try {
            var docRef = db.collection("publicos").document(id);

            DocumentSnapshot doc = docRef.get().get();
            if (!doc.exists()) {
                return null;
            }

            publico.setId(id);
            docRef.set(publico).get();

            return publico;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar publico", e);
        }

    }
    
    // excluir usuario
    @SuppressWarnings("UseSpecificCatch")
    public boolean deletarPublico(String id) {
        try {
            var docRef = db.collection("publicos").document(id);

            DocumentSnapshot doc = docRef.get().get();
            if (!doc.exists()) {
                return false;
            }

            docRef.delete().get();
            return true;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao deletar publico", e);
        }
    }

    // Listar usuarios
    @SuppressWarnings("UseSpecificCatch")
    public List<PublicoEntity> listarTodos() {
        try {
            List<PublicoEntity> lista = new ArrayList<>();
            var querySnapshot = db.collection("publicos").get().get();

            for (DocumentSnapshot doc : querySnapshot.getDocuments()) {
                PublicoEntity publico = doc.toObject(PublicoEntity.class);
                publico.setId(doc.getId());
                lista.add(publico);
            }

            return lista;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao listar publico", e);
        }
    }


}
