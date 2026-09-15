
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAlertRuleComponent } from './create.component';
import { AlertRuleService } from '../../../services/AlertRule.service';
import { Router } from '@angular/router';

describe('CreateAlertRuleComponent', () => {
  let component: CreateAlertRuleComponent;
  let fixture: ComponentFixture<CreateAlertRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateAlertRuleComponent
      ],
      providers: [
        AlertRuleService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAlertRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});