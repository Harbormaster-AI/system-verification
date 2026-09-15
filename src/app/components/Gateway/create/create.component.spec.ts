
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateGatewayComponent } from './create.component';
import { GatewayService } from '../../../services/Gateway.service';
import { Router } from '@angular/router';

describe('CreateGatewayComponent', () => {
  let component: CreateGatewayComponent;
  let fixture: ComponentFixture<CreateGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateGatewayComponent
      ],
      providers: [
        GatewayService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});