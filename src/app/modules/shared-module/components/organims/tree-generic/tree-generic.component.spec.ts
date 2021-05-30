import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeGenericComponent } from './tree-generic.component';

describe('TreeGenericComponent', () => {
  let component: TreeGenericComponent;
  let fixture: ComponentFixture<TreeGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeGenericComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
