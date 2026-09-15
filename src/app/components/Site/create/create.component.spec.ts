
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateSiteComponent } from './create.component';
import { SiteService } from '../../../services/Site.service';
import { Router } from '@angular/router';

describe('CreateSiteComponent', () => {
  let component: CreateSiteComponent;
  let fixture: ComponentFixture<CreateSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateSiteComponent
      ],
      providers: [
        SiteService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});