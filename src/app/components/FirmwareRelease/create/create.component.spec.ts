
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateFirmwareReleaseComponent } from './create.component';
import { FirmwareReleaseService } from '../../../services/FirmwareRelease.service';
import { Router } from '@angular/router';

describe('CreateFirmwareReleaseComponent', () => {
  let component: CreateFirmwareReleaseComponent;
  let fixture: ComponentFixture<CreateFirmwareReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateFirmwareReleaseComponent
      ],
      providers: [
        FirmwareReleaseService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFirmwareReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});