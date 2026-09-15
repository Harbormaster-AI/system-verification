
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateDigitalTwinComponent } from './create.component';
import { DigitalTwinService } from '../../../services/DigitalTwin.service';
import { Router } from '@angular/router';

describe('CreateDigitalTwinComponent', () => {
  let component: CreateDigitalTwinComponent;
  let fixture: ComponentFixture<CreateDigitalTwinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateDigitalTwinComponent
      ],
      providers: [
        DigitalTwinService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDigitalTwinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});