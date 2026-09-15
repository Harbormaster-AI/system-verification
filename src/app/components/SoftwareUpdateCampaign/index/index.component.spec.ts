
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexSoftwareUpdateCampaignComponent } from './index.component';
import { SoftwareUpdateCampaignService } from '../../../services/SoftwareUpdateCampaign.service';

describe('IndexSoftwareUpdateCampaignComponent', () => {
  let component: IndexSoftwareUpdateCampaignComponent;
  let fixture: ComponentFixture<IndexSoftwareUpdateCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexSoftwareUpdateCampaignComponent
      ],
      providers: [
        SoftwareUpdateCampaignService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexSoftwareUpdateCampaignComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});