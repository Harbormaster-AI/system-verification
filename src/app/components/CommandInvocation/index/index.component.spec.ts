
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexCommandInvocationComponent } from './index.component';
import { CommandInvocationService } from '../../../services/CommandInvocation.service';

describe('IndexCommandInvocationComponent', () => {
  let component: IndexCommandInvocationComponent;
  let fixture: ComponentFixture<IndexCommandInvocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexCommandInvocationComponent
      ],
      providers: [
        CommandInvocationService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexCommandInvocationComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});