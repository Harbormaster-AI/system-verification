
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexTelemetrySchemaComponent } from './index.component';
import { TelemetrySchemaService } from '../../../services/TelemetrySchema.service';

describe('IndexTelemetrySchemaComponent', () => {
  let component: IndexTelemetrySchemaComponent;
  let fixture: ComponentFixture<IndexTelemetrySchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexTelemetrySchemaComponent
      ],
      providers: [
        TelemetrySchemaService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexTelemetrySchemaComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});