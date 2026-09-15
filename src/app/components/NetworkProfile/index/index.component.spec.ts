
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexNetworkProfileComponent } from './index.component';
import { NetworkProfileService } from '../../../services/NetworkProfile.service';

describe('IndexNetworkProfileComponent', () => {
  let component: IndexNetworkProfileComponent;
  let fixture: ComponentFixture<IndexNetworkProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexNetworkProfileComponent
      ],
      providers: [
        NetworkProfileService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexNetworkProfileComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});