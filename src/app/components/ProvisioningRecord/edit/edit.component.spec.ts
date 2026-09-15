
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditProvisioningRecordComponent } from './edit.component';
import { ProvisioningRecordService } from '../../../services/ProvisioningRecord.service';

describe('EditProvisioningRecordComponent', () => {
  let component: EditProvisioningRecordComponent;
  let fixture: ComponentFixture<EditProvisioningRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        EditProvisioningRecordComponent
      ],
      providers: [
        ProvisioningRecordService,
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

    fixture = TestBed.createComponent(EditProvisioningRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});