
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditMaintenanceTicketComponent } from './edit.component';
import { MaintenanceTicketService } from '../../../services/MaintenanceTicket.service';

describe('EditMaintenanceTicketComponent', () => {
  let component: EditMaintenanceTicketComponent;
  let fixture: ComponentFixture<EditMaintenanceTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        EditMaintenanceTicketComponent
      ],
      providers: [
        MaintenanceTicketService,
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

    fixture = TestBed.createComponent(EditMaintenanceTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});