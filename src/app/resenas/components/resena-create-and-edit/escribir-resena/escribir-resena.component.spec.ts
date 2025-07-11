import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscribirResenaComponent } from './escribir-resena.component';

describe('EscribirResenaComponent', () => {
  let component: EscribirResenaComponent;
  let fixture: ComponentFixture<EscribirResenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscribirResenaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscribirResenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
