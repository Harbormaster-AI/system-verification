
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateSoftwareUpdateCampaignComponent } from './create.component';
import { SoftwareUpdateCampaignService } from '../../../services/SoftwareUpdateCampaign.service';
import { Router } from '@angular/router';

describe('CreateSoftwareUpdateCampaignComponent', () => {
  let component: CreateSoftwareUpdateCampaignComponent;
  let fixture: ComponentFixture<CreateSoftwareUpdateCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateSoftwareUpdateCampaignComponent
      ],
      providers: [
        SoftwareUpdateCampaignService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSoftwareUpdateCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});