
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUsageRecordComponent } from './create.component';
import { UsageRecordService } from '../../../services/UsageRecord.service';
import { Router } from '@angular/router';

describe('CreateUsageRecordComponent', () => {
  let component: CreateUsageRecordComponent;
  let fixture: ComponentFixture<CreateUsageRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateUsageRecordComponent
      ],
      providers: [
        UsageRecordService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUsageRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});