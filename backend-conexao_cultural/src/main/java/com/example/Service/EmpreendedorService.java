package com.example.Service;

import java.util.ArrayList;
import java.util.List;

import com.example.Entity.EmpreendedorEntity;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

public class EmpreendedorService {

    private final Firestore db;

    public EmpreendedorService(){
        this.db = FirestoreClient.getFirestore();
    }
    
    @SuppressWarnings("UseSpecificCatch")
    public EmpreendedorEntity salvarEmpreendedor (EmpreendedorEntity empreendedor){
        try {
            var docRef = db.collection("empreendedores").document();
            empreendedor.setId(docRef.getId());
            docRef.set(empreendedor).get();
            return empreendedor;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao salvar empreendedor", e);
        }       
    }
    
    @SuppressWarnings("UseSpecificCatch")
    public EmpreendedorEntity findById(String id){
        try {
            DocumentSnapshot doc = db.collection("empreendedores").document(id).get().get();
            if (!doc.exists()) {
                return null;
            }

            EmpreendedorEntity empreendedor= doc.toObject(EmpreendedorEntity.class);
            empreendedor.setId(doc.getId());

            return empreendedor; 

        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar empreendedor por ID", e);
        }
    }

    @SuppressWarnings("UseSpecificCatch")
    public EmpreendedorEntity atualizarEmpreendedor(EmpreendedorEntity empreendedor, 
        String id){
            try {
            var docRef = db.collection("empreendedores").document(id);

            DocumentSnapshot doc = docRef.get().get();
            if (!doc.exists()) {
                return null;
            }

            empreendedor.setId(id);
            docRef.set(empreendedor).get();

            return empreendedor;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar empreendedor", e);
        }
    }
    
    @SuppressWarnings("UseSpecificCatch")
    public boolean deletarEmpreendedor(String id){
        try {
            var docRef = db.collection("empreendedores").document(id);

            DocumentSnapshot doc = docRef.get().get();
            if (!doc.exists()) {
                return false;
            }

            docRef.delete().get();
            return true;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao deletar empreendedor", e);
        }
    }

    @SuppressWarnings("null")
    public List<EmpreendedorEntity> listarTodos(){
        try {
            List<EmpreendedorEntity> lista = new ArrayList<>();
            var querySnapshot = db.collection("empreendedores").get().get();

            for (DocumentSnapshot doc : querySnapshot.getDocuments()) {
                EmpreendedorEntity empreendedor = doc.toObject(EmpreendedorEntity.class);
                empreendedor.setId(doc.getId());
                lista.add(empreendedor);
            }

            return lista;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao listar empreendedor", e);
        }
    }

}
