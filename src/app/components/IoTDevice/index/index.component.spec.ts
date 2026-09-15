
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexIoTDeviceComponent } from './index.component';
import { IoTDeviceService } from '../../../services/IoTDevice.service';

describe('IndexIoTDeviceComponent', () => {
  let component: IndexIoTDeviceComponent;
  let fixture: ComponentFixture<IndexIoTDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexIoTDeviceComponent
      ],
      providers: [
        IoTDeviceService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexIoTDeviceComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});