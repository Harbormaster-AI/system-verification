
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexBuildingComponent } from './index.component';
import { BuildingService } from '../../../services/Building.service';

describe('IndexBuildingComponent', () => {
  let component: IndexBuildingComponent;
  let fixture: ComponentFixture<IndexBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexBuildingComponent
      ],
      providers: [
        BuildingService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexBuildingComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});