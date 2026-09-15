
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditActuatorInstanceComponent } from './edit.component';
import { ActuatorInstanceService } from '../../../services/ActuatorInstance.service';

describe('EditActuatorInstanceComponent', () => {
  let component: EditActuatorInstanceComponent;
  let fixture: ComponentFixture<EditActuatorInstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        EditActuatorInstanceComponent
      ],
      providers: [
        ActuatorInstanceService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' })
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditActuatorInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});