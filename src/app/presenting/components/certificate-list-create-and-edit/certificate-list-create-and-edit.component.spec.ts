import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateListCreateAndEditComponent } from './certificate-list-create-and-edit.component';

describe('CertificateListCreateAndEditComponent', () => {
  let component: CertificateListCreateAndEditComponent;
  let fixture: ComponentFixture<CertificateListCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificateListCreateAndEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateListCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
