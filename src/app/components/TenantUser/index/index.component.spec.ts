
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexTenantUserComponent } from './index.component';
import { TenantUserService } from '../../../services/TenantUser.service';

describe('IndexTenantUserComponent', () => {
  let component: IndexTenantUserComponent;
  let fixture: ComponentFixture<IndexTenantUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexTenantUserComponent
      ],
      providers: [
        TenantUserService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexTenantUserComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});