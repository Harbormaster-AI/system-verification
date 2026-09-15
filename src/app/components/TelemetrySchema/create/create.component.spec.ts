
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTelemetrySchemaComponent } from './create.component';
import { TelemetrySchemaService } from '../../../services/TelemetrySchema.service';
import { Router } from '@angular/router';

describe('CreateTelemetrySchemaComponent', () => {
  let component: CreateTelemetrySchemaComponent;
  let fixture: ComponentFixture<CreateTelemetrySchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateTelemetrySchemaComponent
      ],
      providers: [
        TelemetrySchemaService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTelemetrySchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});