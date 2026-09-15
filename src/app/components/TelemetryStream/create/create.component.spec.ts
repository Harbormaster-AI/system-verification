
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTelemetryStreamComponent } from './create.component';
import { TelemetryStreamService } from '../../../services/TelemetryStream.service';
import { Router } from '@angular/router';

describe('CreateTelemetryStreamComponent', () => {
  let component: CreateTelemetryStreamComponent;
  let fixture: ComponentFixture<CreateTelemetryStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateTelemetryStreamComponent
      ],
      providers: [
        TelemetryStreamService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTelemetryStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});