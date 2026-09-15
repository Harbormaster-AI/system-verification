
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditTwinChangeEventComponent } from './edit.component';
import { TwinChangeEventService } from '../../../services/TwinChangeEvent.service';

describe('EditTwinChangeEventComponent', () => {
  let component: EditTwinChangeEventComponent;
  let fixture: ComponentFixture<EditTwinChangeEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        EditTwinChangeEventComponent
      ],
      providers: [
        TwinChangeEventService,
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

    fixture = TestBed.createComponent(EditTwinChangeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});