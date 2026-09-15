
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditTelemetryStreamComponent } from './edit.component';
import { TelemetryStreamService } from '../../../services/TelemetryStream.service';

describe('EditTelemetryStreamComponent', () => {
  let component: EditTelemetryStreamComponent;
  let fixture: ComponentFixture<EditTelemetryStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        EditTelemetryStreamComponent
      ],
      providers: [
        TelemetryStreamService,
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

    fixture = TestBed.createComponent(EditTelemetryStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});