
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateIoTDeviceComponent } from './create.component';
import { IoTDeviceService } from '../../../services/IoTDevice.service';
import { Router } from '@angular/router';

describe('CreateIoTDeviceComponent', () => {
  let component: CreateIoTDeviceComponent;
  let fixture: ComponentFixture<CreateIoTDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateIoTDeviceComponent
      ],
      providers: [
        IoTDeviceService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateIoTDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});