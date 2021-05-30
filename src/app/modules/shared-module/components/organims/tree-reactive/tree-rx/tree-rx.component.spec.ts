import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeRxComponent } from './tree-rx.component';

describe('TreeRxComponent', () => {
  let component: TreeRxComponent;
  let fixture: ComponentFixture<TreeRxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeRxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeRxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
