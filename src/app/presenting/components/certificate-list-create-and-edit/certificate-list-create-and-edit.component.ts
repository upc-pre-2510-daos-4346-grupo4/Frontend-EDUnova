import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CertificateService } from '../../services/certificate.service';
import { Certificate } from '../../model/certificate.model';

@Component({
  selector: 'app-certificate-list-create-and-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './certificate-list-create-and-edit.component.html',
  styleUrls: ['./certificate-list-create-and-edit.component.css']
})
export class CertificateListCreateAndEditComponent implements OnInit {
  certificates: Certificate[] = [];
  certificate: Certificate = this.getEmptyCertificate();
  isEditing = false;

  constructor(private certificateService: CertificateService) {}

  ngOnInit(): void {
    this.loadCertificates();
  }

  loadCertificates(): void {
    this.certificateService.getAll().subscribe({
      next: (data) => this.certificates = data,
      error: (err) => console.error('Error al cargar certificados:', err)
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      const updatedCertificate = {
        ...this.certificate,
        id: this.certificate.id,
        userId: this.certificate.userId
      };

      this.certificateService.update(this.certificate.id, updatedCertificate).subscribe({
        next: () => {
          this.loadCertificates();
          this.cancelEdit();
        },
        error: (err) => console.error('Error al actualizar certificado:', err)
      });
    } else {
      this.certificateService.getAll().subscribe(allCertificates => {
        const maxId = Math.max(...allCertificates.map(c => c.id), 0);
        const maxUserId = Math.max(...allCertificates.map(c => c.userId), 0);

        const newCertificate: Certificate = {
          id: maxId + 1,
          userId: maxUserId + 1,
          title: this.certificate.title,
          issuer: this.certificate.issuer,
          description: this.certificate.description
        };

        this.certificateService.create(newCertificate).subscribe(() => {
          this.loadCertificates();
          this.certificate = this.getEmptyCertificate();
        });
      });
    }
  }

  edit(cert: Certificate): void {
    this.certificate = { ...cert };
    this.isEditing = true;
  }

  delete(id: number): void {
    this.certificateService.delete(id).subscribe(() => this.loadCertificates());
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.certificate = this.getEmptyCertificate();
  }

  private getEmptyCertificate(): Certificate {
    return {
      id: 0,
      userId: 0,
      title: '',
      issuer: '',
      description: ''
    };
  }
}
