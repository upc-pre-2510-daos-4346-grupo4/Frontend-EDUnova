import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaResenaComponent } from './tarjeta-resena.component';

describe('TarjetaResenaComponent', () => {
  let component: TarjetaResenaComponent;
  let fixture: ComponentFixture<TarjetaResenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaResenaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaResenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
