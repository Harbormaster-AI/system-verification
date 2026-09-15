
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEdgeApplicationComponent } from './create.component';
import { EdgeApplicationService } from '../../../services/EdgeApplication.service';
import { Router } from '@angular/router';

describe('CreateEdgeApplicationComponent', () => {
  let component: CreateEdgeApplicationComponent;
  let fixture: ComponentFixture<CreateEdgeApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateEdgeApplicationComponent
      ],
      providers: [
        EdgeApplicationService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEdgeApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});