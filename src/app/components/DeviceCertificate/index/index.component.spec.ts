
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexDeviceCertificateComponent } from './index.component';
import { DeviceCertificateService } from '../../../services/DeviceCertificate.service';

describe('IndexDeviceCertificateComponent', () => {
  let component: IndexDeviceCertificateComponent;
  let fixture: ComponentFixture<IndexDeviceCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexDeviceCertificateComponent
      ],
      providers: [
        DeviceCertificateService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexDeviceCertificateComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});