
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateDeviceCertificateComponent } from './create.component';
import { DeviceCertificateService } from '../../../services/DeviceCertificate.service';
import { Router } from '@angular/router';

describe('CreateDeviceCertificateComponent', () => {
  let component: CreateDeviceCertificateComponent;
  let fixture: ComponentFixture<CreateDeviceCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateDeviceCertificateComponent
      ],
      providers: [
        DeviceCertificateService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDeviceCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});