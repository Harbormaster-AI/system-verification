
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexSensorInstanceComponent } from './index.component';
import { SensorInstanceService } from '../../../services/SensorInstance.service';

describe('IndexSensorInstanceComponent', () => {
  let component: IndexSensorInstanceComponent;
  let fixture: ComponentFixture<IndexSensorInstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexSensorInstanceComponent
      ],
      providers: [
        SensorInstanceService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexSensorInstanceComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});