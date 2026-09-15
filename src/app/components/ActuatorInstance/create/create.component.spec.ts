
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateActuatorInstanceComponent } from './create.component';
import { ActuatorInstanceService } from '../../../services/ActuatorInstance.service';
import { Router } from '@angular/router';

describe('CreateActuatorInstanceComponent', () => {
  let component: CreateActuatorInstanceComponent;
  let fixture: ComponentFixture<CreateActuatorInstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateActuatorInstanceComponent
      ],
      providers: [
        ActuatorInstanceService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateActuatorInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});