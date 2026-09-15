
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateMessagingEndpointComponent } from './create.component';
import { MessagingEndpointService } from '../../../services/MessagingEndpoint.service';
import { Router } from '@angular/router';

describe('CreateMessagingEndpointComponent', () => {
  let component: CreateMessagingEndpointComponent;
  let fixture: ComponentFixture<CreateMessagingEndpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateMessagingEndpointComponent
      ],
      providers: [
        MessagingEndpointService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMessagingEndpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});