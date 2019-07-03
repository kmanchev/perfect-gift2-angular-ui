import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/user';
import { Event } from '../_models/event';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAllEvents(id: number) {
        return this.http.get<Event[]>(`http://localhost:4000/users/${id}/events`);
    }

    getEvent(eventId: String) {
        return this.http.get(`http://localhost:4000/users/event/` + eventId);
    }

    createEvent(body: String, headers) {
        return this.http.post(`http://localhost:4000/users/createEvent`, body, { headers });
    }

    deleteEvent(id: number) {
        return this.http.delete(`http://localhost:4000/users/deleteEvent/${id}`);
    }

    getAll() {
        return this.http.get<User[]>(`http://localhost:4000/users/`);
    }

    getById(id: number) {
        return this.http.get(`http://localhost:4000/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`http://localhost:4000/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`http://localhost:4000/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`http://localhost:4000/users/${id}`);
    }

    inviteUserForEvent(body: String, headers) {
        return this.http.post(`http://localhost:4000/users/invite`, body, { headers });
    }

    uploadPhoto(fileToUpload: File, eventId) {

        const formData = new FormData();
        formData.append('productImage',
            fileToUpload,
            fileToUpload.name);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');

        return this.http.post(`http://localhost:4000/users/photoUpload/` + eventId, formData);
    }

    deletePhoto(uploaderId: String, eventId: String, name: String) {
        return this.http.delete('http://localhost:4000/users/deletePhoto/' + uploaderId + '/' + eventId + '/' + name);
    }
}