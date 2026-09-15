
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexSimCardComponent } from './index.component';
import { SimCardService } from '../../../services/SimCard.service';

describe('IndexSimCardComponent', () => {
  let component: IndexSimCardComponent;
  let fixture: ComponentFixture<IndexSimCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexSimCardComponent
      ],
      providers: [
        SimCardService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexSimCardComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});