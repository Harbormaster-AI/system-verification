
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexFirmwareReleaseComponent } from './index.component';
import { FirmwareReleaseService } from '../../../services/FirmwareRelease.service';

describe('IndexFirmwareReleaseComponent', () => {
  let component: IndexFirmwareReleaseComponent;
  let fixture: ComponentFixture<IndexFirmwareReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexFirmwareReleaseComponent
      ],
      providers: [
        FirmwareReleaseService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexFirmwareReleaseComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});