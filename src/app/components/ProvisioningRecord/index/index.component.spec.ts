
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexProvisioningRecordComponent } from './index.component';
import { ProvisioningRecordService } from '../../../services/ProvisioningRecord.service';

describe('IndexProvisioningRecordComponent', () => {
  let component: IndexProvisioningRecordComponent;
  let fixture: ComponentFixture<IndexProvisioningRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexProvisioningRecordComponent
      ],
      providers: [
        ProvisioningRecordService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexProvisioningRecordComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});