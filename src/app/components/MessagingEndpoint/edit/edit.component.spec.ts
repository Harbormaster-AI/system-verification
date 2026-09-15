
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditMessagingEndpointComponent } from './edit.component';
import { MessagingEndpointService } from '../../../services/MessagingEndpoint.service';

describe('EditMessagingEndpointComponent', () => {
  let component: EditMessagingEndpointComponent;
  let fixture: ComponentFixture<EditMessagingEndpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        EditMessagingEndpointComponent
      ],
      providers: [
        MessagingEndpointService,
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

    fixture = TestBed.createComponent(EditMessagingEndpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});