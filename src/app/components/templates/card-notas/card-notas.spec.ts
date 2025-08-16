import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNotas } from './card-notas';

describe('CardNotas', () => {
  let component: CardNotas;
  let fixture: ComponentFixture<CardNotas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNotas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNotas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
