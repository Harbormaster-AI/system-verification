
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexCommandDefinitionComponent } from './index.component';
import { CommandDefinitionService } from '../../../services/CommandDefinition.service';

describe('IndexCommandDefinitionComponent', () => {
  let component: IndexCommandDefinitionComponent;
  let fixture: ComponentFixture<IndexCommandDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexCommandDefinitionComponent
      ],
      providers: [
        CommandDefinitionService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexCommandDefinitionComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});