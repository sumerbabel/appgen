import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaModelComponent } from './text-area-model.component';

describe('TextAreaModelComponent', () => {
  let component: TextAreaModelComponent;
  let fixture: ComponentFixture<TextAreaModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextAreaModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
