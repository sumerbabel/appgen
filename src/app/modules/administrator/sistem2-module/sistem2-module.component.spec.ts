import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sistem2ModuleComponent } from './sistem2-module.component';

describe('Sistem2ModuleComponent', () => {
  let component: Sistem2ModuleComponent;
  let fixture: ComponentFixture<Sistem2ModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sistem2ModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sistem2ModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
