
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditFirmwareReleaseComponent } from './edit.component';
import { FirmwareReleaseService } from '../../../services/FirmwareRelease.service';

describe('EditFirmwareReleaseComponent', () => {
  let component: EditFirmwareReleaseComponent;
  let fixture: ComponentFixture<EditFirmwareReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        EditFirmwareReleaseComponent
      ],
      providers: [
        FirmwareReleaseService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' })
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditFirmwareReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});