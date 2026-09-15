
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexDataRetentionPolicyComponent } from './index.component';
import { DataRetentionPolicyService } from '../../../services/DataRetentionPolicy.service';

describe('IndexDataRetentionPolicyComponent', () => {
  let component: IndexDataRetentionPolicyComponent;
  let fixture: ComponentFixture<IndexDataRetentionPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexDataRetentionPolicyComponent
      ],
      providers: [
        DataRetentionPolicyService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexDataRetentionPolicyComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});