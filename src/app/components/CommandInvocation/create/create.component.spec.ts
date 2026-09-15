
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCommandInvocationComponent } from './create.component';
import { CommandInvocationService } from '../../../services/CommandInvocation.service';
import { Router } from '@angular/router';

describe('CreateCommandInvocationComponent', () => {
  let component: CreateCommandInvocationComponent;
  let fixture: ComponentFixture<CreateCommandInvocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateCommandInvocationComponent
      ],
      providers: [
        CommandInvocationService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCommandInvocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});