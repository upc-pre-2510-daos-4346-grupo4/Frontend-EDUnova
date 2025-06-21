import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ProfileService } from '../../services/profile.service';
import { CertificateListCreateAndEditComponent } from '../../components/certificate-list-create-and-edit/certificate-list-create-and-edit.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    CertificateListCreateAndEditComponent  // ✅ importado aquí
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  profile: any = {};
  userId: number = 1;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getUserProfile(this.userId).subscribe({
      next: data => this.profile = data,
      error: err => console.error('Error al cargar el perfil', err)
    });
  }

  guardarCambios(): void {
    this.profileService.updateUserProfile(this.userId, this.profile).subscribe({
      next: () => alert('Cambios guardados correctamente.'),
      error: err => {
        console.error('Error al guardar los cambios', err);
        alert('Hubo un error al guardar los cambios.');
      }
    });
  }
}
