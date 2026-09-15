
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateSensorInstanceComponent } from './create.component';
import { SensorInstanceService } from '../../../services/SensorInstance.service';
import { Router } from '@angular/router';

describe('CreateSensorInstanceComponent', () => {
  let component: CreateSensorInstanceComponent;
  let fixture: ComponentFixture<CreateSensorInstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateSensorInstanceComponent
      ],
      providers: [
        SensorInstanceService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSensorInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});