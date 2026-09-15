
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateNetworkProfileComponent } from './create.component';
import { NetworkProfileService } from '../../../services/NetworkProfile.service';
import { Router } from '@angular/router';

describe('CreateNetworkProfileComponent', () => {
  let component: CreateNetworkProfileComponent;
  let fixture: ComponentFixture<CreateNetworkProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateNetworkProfileComponent
      ],
      providers: [
        NetworkProfileService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateNetworkProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});