package com.example.Service;

import java.util.ArrayList;
import java.util.List;

import com.example.Entity.FeedPostEntity;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.firebase.cloud.FirestoreClient;

public class FeedPostService {

    private final Firestore db;

    public FeedPostService() {
        this.db = FirestoreClient.getFirestore();
    }

    public FeedPostEntity criarPost(FeedPostEntity post) {
        try {
            var docRef = db.collection("feedPosts").document();
            post.setId(docRef.getId());
            docRef.set(post).get();
            return post;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao criar post", e);
        }
    }

    
    public FeedPostEntity findById(String id) {
        try {
            var doc = db.collection("feedPosts").document(id).get().get();

            if (!doc.exists()) return null;

            FeedPostEntity post = doc.toObject(FeedPostEntity.class);
            post.setId(doc.getId());
            return post;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar post", e);
        }
    }

    
    public List<FeedPostEntity> listarFeedGlobal() {
        try {
            List<FeedPostEntity> lista = new ArrayList<>();

            var query = db.collection("feedPosts")
                    .orderBy("createdAt", Query.Direction.DESCENDING)
                    .get().get();

            for (DocumentSnapshot doc : query.getDocuments()) {
                FeedPostEntity post = doc.toObject(FeedPostEntity.class);
                post.setId(doc.getId());
                lista.add(post);
            }

            return lista;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao listar feed", e);
        }
    }

    
    public List<FeedPostEntity> listarPorAutor(String autorId) {
        try {
            List<FeedPostEntity> lista = new ArrayList<>();

            var query = db.collection("feedPosts")
                    .whereEqualTo("autorId", autorId)
                    .get().get();

            for (DocumentSnapshot doc : query.getDocuments()) {
                FeedPostEntity post = doc.toObject(FeedPostEntity.class);
                post.setId(doc.getId());
                lista.add(post);
            }

            return lista;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao listar posts do autor", e);
        }
    }

    
    public boolean deletarPost(String id) {
        try {
            var docRef = db.collection("feedPosts").document(id);

            var doc = docRef.get().get();
            if (!doc.exists()) return false;

            docRef.delete().get();
            return true;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao deletar post", e);
        }
    }
}