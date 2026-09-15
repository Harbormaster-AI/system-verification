
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexDeviceVendorComponent } from './index.component';
import { DeviceVendorService } from '../../../services/DeviceVendor.service';

describe('IndexDeviceVendorComponent', () => {
  let component: IndexDeviceVendorComponent;
  let fixture: ComponentFixture<IndexDeviceVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexDeviceVendorComponent
      ],
      providers: [
        DeviceVendorService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexDeviceVendorComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});