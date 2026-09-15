
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateApiKeyComponent } from './create.component';
import { ApiKeyService } from '../../../services/ApiKey.service';
import { Router } from '@angular/router';

describe('CreateApiKeyComponent', () => {
  let component: CreateApiKeyComponent;
  let fixture: ComponentFixture<CreateApiKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateApiKeyComponent
      ],
      providers: [
        ApiKeyService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateApiKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});