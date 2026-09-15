
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateConnectivityPlanComponent } from './create.component';
import { ConnectivityPlanService } from '../../../services/ConnectivityPlan.service';
import { Router } from '@angular/router';

describe('CreateConnectivityPlanComponent', () => {
  let component: CreateConnectivityPlanComponent;
  let fixture: ComponentFixture<CreateConnectivityPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateConnectivityPlanComponent
      ],
      providers: [
        ConnectivityPlanService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateConnectivityPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});