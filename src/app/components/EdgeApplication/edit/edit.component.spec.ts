
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditEdgeApplicationComponent } from './edit.component';
import { EdgeApplicationService } from '../../../services/EdgeApplication.service';

describe('EditEdgeApplicationComponent', () => {
  let component: EditEdgeApplicationComponent;
  let fixture: ComponentFixture<EditEdgeApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        EditEdgeApplicationComponent
      ],
      providers: [
        EdgeApplicationService,
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

    fixture = TestBed.createComponent(EditEdgeApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});