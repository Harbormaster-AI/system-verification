
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexTelemetryStreamComponent } from './index.component';
import { TelemetryStreamService } from '../../../services/TelemetryStream.service';

describe('IndexTelemetryStreamComponent', () => {
  let component: IndexTelemetryStreamComponent;
  let fixture: ComponentFixture<IndexTelemetryStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexTelemetryStreamComponent
      ],
      providers: [
        TelemetryStreamService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexTelemetryStreamComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});