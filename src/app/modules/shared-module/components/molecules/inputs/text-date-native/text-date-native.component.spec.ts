import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDateNativeComponent } from './text-date-native.component';

describe('TextDateNativeComponent', () => {
  let component: TextDateNativeComponent;
  let fixture: ComponentFixture<TextDateNativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextDateNativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextDateNativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
