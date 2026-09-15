
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditConnectivityPlanComponent } from './edit.component';
import { ConnectivityPlanService } from '../../../services/ConnectivityPlan.service';

describe('EditConnectivityPlanComponent', () => {
  let component: EditConnectivityPlanComponent;
  let fixture: ComponentFixture<EditConnectivityPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        EditConnectivityPlanComponent
      ],
      providers: [
        ConnectivityPlanService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' })
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditConnectivityPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});