
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateMaintenanceTicketComponent } from './create.component';
import { MaintenanceTicketService } from '../../../services/MaintenanceTicket.service';
import { Router } from '@angular/router';

describe('CreateMaintenanceTicketComponent', () => {
  let component: CreateMaintenanceTicketComponent;
  let fixture: ComponentFixture<CreateMaintenanceTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateMaintenanceTicketComponent
      ],
      providers: [
        MaintenanceTicketService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMaintenanceTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});