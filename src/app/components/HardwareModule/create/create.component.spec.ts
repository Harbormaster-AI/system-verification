
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateHardwareModuleComponent } from './create.component';
import { HardwareModuleService } from '../../../services/HardwareModule.service';
import { Router } from '@angular/router';

describe('CreateHardwareModuleComponent', () => {
  let component: CreateHardwareModuleComponent;
  let fixture: ComponentFixture<CreateHardwareModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateHardwareModuleComponent
      ],
      providers: [
        HardwareModuleService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateHardwareModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});