
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditDeviceCertificateComponent } from './edit.component';
import { DeviceCertificateService } from '../../../services/DeviceCertificate.service';

describe('EditDeviceCertificateComponent', () => {
  let component: EditDeviceCertificateComponent;
  let fixture: ComponentFixture<EditDeviceCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        EditDeviceCertificateComponent
      ],
      providers: [
        DeviceCertificateService,
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

    fixture = TestBed.createComponent(EditDeviceCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});