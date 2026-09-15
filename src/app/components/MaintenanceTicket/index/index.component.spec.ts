
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexMaintenanceTicketComponent } from './index.component';
import { MaintenanceTicketService } from '../../../services/MaintenanceTicket.service';

describe('IndexMaintenanceTicketComponent', () => {
  let component: IndexMaintenanceTicketComponent;
  let fixture: ComponentFixture<IndexMaintenanceTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexMaintenanceTicketComponent
      ],
      providers: [
        MaintenanceTicketService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexMaintenanceTicketComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});