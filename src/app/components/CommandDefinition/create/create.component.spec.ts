
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCommandDefinitionComponent } from './create.component';
import { CommandDefinitionService } from '../../../services/CommandDefinition.service';
import { Router } from '@angular/router';

describe('CreateCommandDefinitionComponent', () => {
  let component: CreateCommandDefinitionComponent;
  let fixture: ComponentFixture<CreateCommandDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateCommandDefinitionComponent
      ],
      providers: [
        CommandDefinitionService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCommandDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});