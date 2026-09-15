
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexConnectivityPlanComponent } from './index.component';
import { ConnectivityPlanService } from '../../../services/ConnectivityPlan.service';

describe('IndexConnectivityPlanComponent', () => {
  let component: IndexConnectivityPlanComponent;
  let fixture: ComponentFixture<IndexConnectivityPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexConnectivityPlanComponent
      ],
      providers: [
        ConnectivityPlanService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexConnectivityPlanComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});