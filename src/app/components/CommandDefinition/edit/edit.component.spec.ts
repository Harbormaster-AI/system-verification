
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditCommandDefinitionComponent } from './edit.component';
import { CommandDefinitionService } from '../../../services/CommandDefinition.service';

describe('EditCommandDefinitionComponent', () => {
  let component: EditCommandDefinitionComponent;
  let fixture: ComponentFixture<EditCommandDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        EditCommandDefinitionComponent
      ],
      providers: [
        CommandDefinitionService,
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

    fixture = TestBed.createComponent(EditCommandDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});