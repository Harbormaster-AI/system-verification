
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditDigitalTwinComponent } from './edit.component';
import { DigitalTwinService } from '../../../services/DigitalTwin.service';

describe('EditDigitalTwinComponent', () => {
  let component: EditDigitalTwinComponent;
  let fixture: ComponentFixture<EditDigitalTwinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        EditDigitalTwinComponent
      ],
      providers: [
        DigitalTwinService,
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

    fixture = TestBed.createComponent(EditDigitalTwinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});