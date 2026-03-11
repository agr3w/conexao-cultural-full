package com.example;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import java.io.InputStream;

public class FirebaseConfig {

    // Evita inicializar mais de uma vez
    private static boolean inicializado = false;

    public static void inicializar() {

        // Se já existe um app Firebase, não inicializa de novo
        if (inicializado || !FirebaseApp.getApps().isEmpty()) {
            return;
        }

        try {
            // Carrega o JSON a partir do resources
            InputStream serviceAccount =
                    FirebaseConfig.class
                            .getClassLoader()
                            .getResourceAsStream("firebase-service-account.json");

            if (serviceAccount == null) {
                throw new RuntimeException(
                        "Arquivo firebase-service-account.json não encontrado em src/main/resources"
                );
            }

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            FirebaseApp.initializeApp(options);

            inicializado = true;

            System.out.println(" Firebase inicializado com sucesso");

        } catch (Exception e) {
            throw new RuntimeException(" Erro ao inicializar o Firebase", e);
        }
    }
}