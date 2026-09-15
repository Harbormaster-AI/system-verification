
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateDeviceVendorComponent } from './create.component';
import { DeviceVendorService } from '../../../services/DeviceVendor.service';
import { Router } from '@angular/router';

describe('CreateDeviceVendorComponent', () => {
  let component: CreateDeviceVendorComponent;
  let fixture: ComponentFixture<CreateDeviceVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateDeviceVendorComponent
      ],
      providers: [
        DeviceVendorService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDeviceVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});