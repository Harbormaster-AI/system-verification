
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateSoftwareUpdateExecutionComponent } from './create.component';
import { SoftwareUpdateExecutionService } from '../../../services/SoftwareUpdateExecution.service';
import { Router } from '@angular/router';

describe('CreateSoftwareUpdateExecutionComponent', () => {
  let component: CreateSoftwareUpdateExecutionComponent;
  let fixture: ComponentFixture<CreateSoftwareUpdateExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateSoftwareUpdateExecutionComponent
      ],
      providers: [
        SoftwareUpdateExecutionService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSoftwareUpdateExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});