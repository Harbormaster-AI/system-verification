
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexDeviceGroupComponent } from './index.component';
import { DeviceGroupService } from '../../../services/DeviceGroup.service';

describe('IndexDeviceGroupComponent', () => {
  let component: IndexDeviceGroupComponent;
  let fixture: ComponentFixture<IndexDeviceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexDeviceGroupComponent
      ],
      providers: [
        DeviceGroupService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexDeviceGroupComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});