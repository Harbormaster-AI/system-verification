
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexEdgeApplicationComponent } from './index.component';
import { EdgeApplicationService } from '../../../services/EdgeApplication.service';

describe('IndexEdgeApplicationComponent', () => {
  let component: IndexEdgeApplicationComponent;
  let fixture: ComponentFixture<IndexEdgeApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexEdgeApplicationComponent
      ],
      providers: [
        EdgeApplicationService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexEdgeApplicationComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});