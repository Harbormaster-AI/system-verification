
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexAlertRuleComponent } from './index.component';
import { AlertRuleService } from '../../../services/AlertRule.service';

describe('IndexAlertRuleComponent', () => {
  let component: IndexAlertRuleComponent;
  let fixture: ComponentFixture<IndexAlertRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexAlertRuleComponent
      ],
      providers: [
        AlertRuleService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexAlertRuleComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});