import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginExpiredTokenComponent } from './login-expired-token.component';

describe('LoginExpiredTokenComponent', () => {
  let component: LoginExpiredTokenComponent;
  let fixture: ComponentFixture<LoginExpiredTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginExpiredTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginExpiredTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
