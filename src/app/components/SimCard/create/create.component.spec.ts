
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateSimCardComponent } from './create.component';
import { SimCardService } from '../../../services/SimCard.service';
import { Router } from '@angular/router';

describe('CreateSimCardComponent', () => {
  let component: CreateSimCardComponent;
  let fixture: ComponentFixture<CreateSimCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateSimCardComponent
      ],
      providers: [
        SimCardService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSimCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});