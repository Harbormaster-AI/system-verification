
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexTwinChangeEventComponent } from './index.component';
import { TwinChangeEventService } from '../../../services/TwinChangeEvent.service';

describe('IndexTwinChangeEventComponent', () => {
  let component: IndexTwinChangeEventComponent;
  let fixture: ComponentFixture<IndexTwinChangeEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexTwinChangeEventComponent
      ],
      providers: [
        TwinChangeEventService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexTwinChangeEventComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});