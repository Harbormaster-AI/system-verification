
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexApiKeyComponent } from './index.component';
import { ApiKeyService } from '../../../services/ApiKey.service';

describe('IndexApiKeyComponent', () => {
  let component: IndexApiKeyComponent;
  let fixture: ComponentFixture<IndexApiKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexApiKeyComponent
      ],
      providers: [
        ApiKeyService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexApiKeyComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});