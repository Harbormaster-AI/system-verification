
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditTelemetrySchemaComponent } from './edit.component';
import { TelemetrySchemaService } from '../../../services/TelemetrySchema.service';

describe('EditTelemetrySchemaComponent', () => {
  let component: EditTelemetrySchemaComponent;
  let fixture: ComponentFixture<EditTelemetrySchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        EditTelemetrySchemaComponent
      ],
      providers: [
        TelemetrySchemaService,
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

    fixture = TestBed.createComponent(EditTelemetrySchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});