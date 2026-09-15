
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTenantUserComponent } from './create.component';
import { TenantUserService } from '../../../services/TenantUser.service';
import { Router } from '@angular/router';

describe('CreateTenantUserComponent', () => {
  let component: CreateTenantUserComponent;
  let fixture: ComponentFixture<CreateTenantUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateTenantUserComponent
      ],
      providers: [
        TenantUserService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTenantUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});