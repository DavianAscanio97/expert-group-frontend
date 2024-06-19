// auth-permissions.service.ts
import { Injectable } from '@angular/core';
import { openDB } from 'idb';

@Injectable({
    providedIn: 'root'
})
export class IndexDBService {

    constructor() { }

    async initDB() {
        const db = await openDB('AuthDB', 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains('authStore')) {
                    db.createObjectStore('authStore', { keyPath: 'id', autoIncrement: true });
                }
            },
        });
        return db;
    }

    // Método para cargar datos de autenticación desde IndexedDB
    async loadDataAuthDB(): Promise<any[]> {
        try {
            const db = await this.initDB();
            const tx = db.transaction('authStore', 'readonly');
            const store = tx.objectStore('authStore');
            const items = await store.getAll();
            return items; // Devuelve los datos obtenidos de IndexedDB
        } catch (error) {
            console.error('Error al cargar datos de autenticación desde IndexedDB:', error);
            throw error; // Propaga el error para manejarlo en el componente que llama a este método
        }
    }


    //Eliminar datos de autenticación de IndexedDB
    async deleteDataAuthDB() {
        try {
            const db = await this.initDB();
            const tx = db.transaction('authStore', 'readwrite');
            const store = tx.objectStore('authStore');
            store.clear();
            await tx.done;
        } catch (error) {
            console.error('Error al eliminar datos de autenticación desde IndexedDB:', error);
            throw error;
        }
    }

}
