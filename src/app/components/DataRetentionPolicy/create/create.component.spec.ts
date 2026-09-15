
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateDataRetentionPolicyComponent } from './create.component';
import { DataRetentionPolicyService } from '../../../services/DataRetentionPolicy.service';
import { Router } from '@angular/router';

describe('CreateDataRetentionPolicyComponent', () => {
  let component: CreateDataRetentionPolicyComponent;
  let fixture: ComponentFixture<CreateDataRetentionPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateDataRetentionPolicyComponent
      ],
      providers: [
        DataRetentionPolicyService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDataRetentionPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});