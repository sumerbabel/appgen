import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDateComponent } from './text-date.component';

describe('TextDateComponent', () => {
  let component: TextDateComponent;
  let fixture: ComponentFixture<TextDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
