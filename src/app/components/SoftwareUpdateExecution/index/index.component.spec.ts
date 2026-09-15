
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexSoftwareUpdateExecutionComponent } from './index.component';
import { SoftwareUpdateExecutionService } from '../../../services/SoftwareUpdateExecution.service';

describe('IndexSoftwareUpdateExecutionComponent', () => {
  let component: IndexSoftwareUpdateExecutionComponent;
  let fixture: ComponentFixture<IndexSoftwareUpdateExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexSoftwareUpdateExecutionComponent
      ],
      providers: [
        SoftwareUpdateExecutionService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexSoftwareUpdateExecutionComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});