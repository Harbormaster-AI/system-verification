
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexDigitalTwinComponent } from './index.component';
import { DigitalTwinService } from '../../../services/DigitalTwin.service';

describe('IndexDigitalTwinComponent', () => {
  let component: IndexDigitalTwinComponent;
  let fixture: ComponentFixture<IndexDigitalTwinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexDigitalTwinComponent
      ],
      providers: [
        DigitalTwinService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexDigitalTwinComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});