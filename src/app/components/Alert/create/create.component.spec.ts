
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAlertComponent } from './create.component';
import { AlertService } from '../../../services/Alert.service';
import { Router } from '@angular/router';

describe('CreateAlertComponent', () => {
  let component: CreateAlertComponent;
  let fixture: ComponentFixture<CreateAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateAlertComponent
      ],
      providers: [
        AlertService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});