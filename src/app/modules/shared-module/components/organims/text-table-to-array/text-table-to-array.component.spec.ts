import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTableToArrayComponent } from './text-table-to-array.component';

describe('TextTableToArrayComponent', () => {
  let component: TextTableToArrayComponent;
  let fixture: ComponentFixture<TextTableToArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextTableToArrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextTableToArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
