
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexAccessPolicyComponent } from './index.component';
import { AccessPolicyService } from '../../../services/AccessPolicy.service';

describe('IndexAccessPolicyComponent', () => {
  let component: IndexAccessPolicyComponent;
  let fixture: ComponentFixture<IndexAccessPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexAccessPolicyComponent
      ],
      providers: [
        AccessPolicyService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexAccessPolicyComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});