
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTenantComponent } from './create.component';
import { TenantService } from '../../../services/Tenant.service';
import { Router } from '@angular/router';

describe('CreateTenantComponent', () => {
  let component: CreateTenantComponent;
  let fixture: ComponentFixture<CreateTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateTenantComponent
      ],
      providers: [
        TenantService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});