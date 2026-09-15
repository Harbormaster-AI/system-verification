
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateDeviceModelComponent } from './create.component';
import { DeviceModelService } from '../../../services/DeviceModel.service';
import { Router } from '@angular/router';

describe('CreateDeviceModelComponent', () => {
  let component: CreateDeviceModelComponent;
  let fixture: ComponentFixture<CreateDeviceModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateDeviceModelComponent
      ],
      providers: [
        DeviceModelService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDeviceModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});