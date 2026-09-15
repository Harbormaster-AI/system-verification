
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditDataRetentionPolicyComponent } from './edit.component';
import { DataRetentionPolicyService } from '../../../services/DataRetentionPolicy.service';

describe('EditDataRetentionPolicyComponent', () => {
  let component: EditDataRetentionPolicyComponent;
  let fixture: ComponentFixture<EditDataRetentionPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        EditDataRetentionPolicyComponent
      ],
      providers: [
        DataRetentionPolicyService,
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

    fixture = TestBed.createComponent(EditDataRetentionPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});