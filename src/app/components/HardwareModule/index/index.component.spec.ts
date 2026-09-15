
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexHardwareModuleComponent } from './index.component';
import { HardwareModuleService } from '../../../services/HardwareModule.service';

describe('IndexHardwareModuleComponent', () => {
  let component: IndexHardwareModuleComponent;
  let fixture: ComponentFixture<IndexHardwareModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexHardwareModuleComponent
      ],
      providers: [
        HardwareModuleService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexHardwareModuleComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});