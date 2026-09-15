
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexActuatorInstanceComponent } from './index.component';
import { ActuatorInstanceService } from '../../../services/ActuatorInstance.service';

describe('IndexActuatorInstanceComponent', () => {
  let component: IndexActuatorInstanceComponent;
  let fixture: ComponentFixture<IndexActuatorInstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexActuatorInstanceComponent
      ],
      providers: [
        ActuatorInstanceService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexActuatorInstanceComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});