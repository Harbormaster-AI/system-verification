
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditSoftwareUpdateExecutionComponent } from './edit.component';
import { SoftwareUpdateExecutionService } from '../../../services/SoftwareUpdateExecution.service';

describe('EditSoftwareUpdateExecutionComponent', () => {
  let component: EditSoftwareUpdateExecutionComponent;
  let fixture: ComponentFixture<EditSoftwareUpdateExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        EditSoftwareUpdateExecutionComponent
      ],
      providers: [
        SoftwareUpdateExecutionService,
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

    fixture = TestBed.createComponent(EditSoftwareUpdateExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});