
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexUsageRecordComponent } from './index.component';
import { UsageRecordService } from '../../../services/UsageRecord.service';

describe('IndexUsageRecordComponent', () => {
  let component: IndexUsageRecordComponent;
  let fixture: ComponentFixture<IndexUsageRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexUsageRecordComponent
      ],
      providers: [
        UsageRecordService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexUsageRecordComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});