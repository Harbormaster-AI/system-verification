
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexDeviceModelComponent } from './index.component';
import { DeviceModelService } from '../../../services/DeviceModel.service';

describe('IndexDeviceModelComponent', () => {
  let component: IndexDeviceModelComponent;
  let fixture: ComponentFixture<IndexDeviceModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexDeviceModelComponent
      ],
      providers: [
        DeviceModelService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexDeviceModelComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});