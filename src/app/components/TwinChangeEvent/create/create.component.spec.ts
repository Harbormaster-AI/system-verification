
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTwinChangeEventComponent } from './create.component';
import { TwinChangeEventService } from '../../../services/TwinChangeEvent.service';
import { Router } from '@angular/router';

describe('CreateTwinChangeEventComponent', () => {
  let component: CreateTwinChangeEventComponent;
  let fixture: ComponentFixture<CreateTwinChangeEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateTwinChangeEventComponent
      ],
      providers: [
        TwinChangeEventService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTwinChangeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});