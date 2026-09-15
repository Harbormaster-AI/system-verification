
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAccessPolicyComponent } from './create.component';
import { AccessPolicyService } from '../../../services/AccessPolicy.service';
import { Router } from '@angular/router';

describe('CreateAccessPolicyComponent', () => {
  let component: CreateAccessPolicyComponent;
  let fixture: ComponentFixture<CreateAccessPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateAccessPolicyComponent
      ],
      providers: [
        AccessPolicyService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAccessPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});