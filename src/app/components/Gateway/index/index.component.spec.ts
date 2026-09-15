
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexGatewayComponent } from './index.component';
import { GatewayService } from '../../../services/Gateway.service';

describe('IndexGatewayComponent', () => {
  let component: IndexGatewayComponent;
  let fixture: ComponentFixture<IndexGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndexGatewayComponent
      ],
      providers: [
        GatewayService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexGatewayComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});