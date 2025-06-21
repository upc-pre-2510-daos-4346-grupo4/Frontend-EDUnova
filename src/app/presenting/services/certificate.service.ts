import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Certificate } from '../model/certificate.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private baseUrl = 'http://localhost:3000/certificates';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.baseUrl);
  }

  create(certificate: Certificate): Observable<Certificate> {
    return this.http.post<Certificate>(this.baseUrl, certificate);
  }

  update(id: number, certificate: Certificate): Observable<Certificate> {
    return this.http.put<Certificate>(`${this.baseUrl}/${id}`, certificate);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
