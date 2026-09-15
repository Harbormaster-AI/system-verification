
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexMessagingEndpointComponent } from './index.component';
import { MessagingEndpointService } from '../../../services/MessagingEndpoint.service';

describe('IndexMessagingEndpointComponent', () => {
  let component: IndexMessagingEndpointComponent;
  let fixture: ComponentFixture<IndexMessagingEndpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexMessagingEndpointComponent
      ],
      providers: [
        MessagingEndpointService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexMessagingEndpointComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});