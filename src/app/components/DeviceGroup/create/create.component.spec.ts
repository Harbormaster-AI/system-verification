
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateDeviceGroupComponent } from './create.component';
import { DeviceGroupService } from '../../../services/DeviceGroup.service';
import { Router } from '@angular/router';

describe('CreateDeviceGroupComponent', () => {
  let component: CreateDeviceGroupComponent;
  let fixture: ComponentFixture<CreateDeviceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateDeviceGroupComponent
      ],
      providers: [
        DeviceGroupService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDeviceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});