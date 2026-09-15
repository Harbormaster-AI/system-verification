
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateBuildingComponent } from './create.component';
import { BuildingService } from '../../../services/Building.service';
import { Router } from '@angular/router';

describe('CreateBuildingComponent', () => {
  let component: CreateBuildingComponent;
  let fixture: ComponentFixture<CreateBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateBuildingComponent
      ],
      providers: [
        BuildingService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});