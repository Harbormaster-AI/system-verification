
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTwinTemplateComponent } from './create.component';
import { TwinTemplateService } from '../../../services/TwinTemplate.service';
import { Router } from '@angular/router';

describe('CreateTwinTemplateComponent', () => {
  let component: CreateTwinTemplateComponent;
  let fixture: ComponentFixture<CreateTwinTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateTwinTemplateComponent
      ],
      providers: [
        TwinTemplateService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTwinTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});