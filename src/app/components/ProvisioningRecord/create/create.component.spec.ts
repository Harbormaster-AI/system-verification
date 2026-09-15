
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateProvisioningRecordComponent } from './create.component';
import { ProvisioningRecordService } from '../../../services/ProvisioningRecord.service';
import { Router } from '@angular/router';

describe('CreateProvisioningRecordComponent', () => {
  let component: CreateProvisioningRecordComponent;
  let fixture: ComponentFixture<CreateProvisioningRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateProvisioningRecordComponent
      ],
      providers: [
        ProvisioningRecordService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProvisioningRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});