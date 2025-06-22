import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly API = 'https://685250f80594059b23ccf92a.mockapi.io';

  constructor(private http: HttpClient) {}

  getUserProfile(userId: number = 1): Observable<any> {
    return this.http.get<any[]>(`${this.API}/profiles?userId=${userId}`).pipe(
      map(profiles => profiles[0]),
      switchMap(profile =>
        this.http.get<any>(`${this.API}/users/${userId}`).pipe(
          map(user => ({
            ...profile,
            email: user.email,
            username: user.username
          }))
        )
      )
    );
  }

  updateUserProfile(userId: number, updatedData: any): Observable<any> {
    // Dividir los datos en parte de users y parte de profiles
    const updatedUser = {
      username: updatedData.username,
      email: updatedData.email
    };

    const updatedProfile = {
      name: updatedData.name,
      lastname: updatedData.lastname,
      gender: updatedData.gender,
      imageProfile: updatedData.imageProfile,
      isPremium: updatedData.isPremium,
      dateExpiration: updatedData.dateExpiration,
      userId: userId
    };

    // Buscar el ID del perfil (para no depender de updatedData.id)
    return this.http.get<any[]>(`${this.API}/profiles?userId=${userId}`).pipe(
      map(profiles => profiles[0]),
      switchMap(profile =>
        forkJoin({
          user: this.http.put(`${this.API}/users/${userId}`, updatedUser),
          profile: this.http.put(`${this.API}/profiles/${profile.id}`, updatedProfile)
        })
      )
    );
  }
}
