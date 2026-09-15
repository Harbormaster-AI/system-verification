
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateFloorComponent } from './create.component';
import { FloorService } from '../../../services/Floor.service';
import { Router } from '@angular/router';

describe('CreateFloorComponent', () => {
  let component: CreateFloorComponent;
  let fixture: ComponentFixture<CreateFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateFloorComponent
      ],
      providers: [
        FloorService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});