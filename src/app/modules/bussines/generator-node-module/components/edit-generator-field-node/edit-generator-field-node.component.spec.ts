import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGeneratorFieldNodeComponent } from './edit-generator-field-node.component';

describe('EditGeneratorFieldNodeComponent', () => {
  let component: EditGeneratorFieldNodeComponent;
  let fixture: ComponentFixture<EditGeneratorFieldNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGeneratorFieldNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGeneratorFieldNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
