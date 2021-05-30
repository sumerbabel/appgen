import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextModelComponent } from './text-model.component';

describe('TextComponent', () => {
  let component: TextModelComponent;
  let fixture: ComponentFixture<TextModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
