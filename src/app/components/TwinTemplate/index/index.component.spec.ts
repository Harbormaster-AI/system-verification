
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexTwinTemplateComponent } from './index.component';
import { TwinTemplateService } from '../../../services/TwinTemplate.service';

describe('IndexTwinTemplateComponent', () => {
  let component: IndexTwinTemplateComponent;
  let fixture: ComponentFixture<IndexTwinTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexTwinTemplateComponent
      ],
      providers: [
        TwinTemplateService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexTwinTemplateComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});