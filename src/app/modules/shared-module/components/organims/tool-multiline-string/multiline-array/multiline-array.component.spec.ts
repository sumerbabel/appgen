import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilineArrayComponent } from "./MultilineArrayComponent";

describe('MultilineArrayComponent', () => {
  let component: MultilineArrayComponent;
  let fixture: ComponentFixture<MultilineArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultilineArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultilineArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
