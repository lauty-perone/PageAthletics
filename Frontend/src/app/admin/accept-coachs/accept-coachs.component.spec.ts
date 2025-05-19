import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptCoachsComponent } from './accept-coachs.component';

describe('AcceptCoachsComponent', () => {
  let component: AcceptCoachsComponent;
  let fixture: ComponentFixture<AcceptCoachsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptCoachsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptCoachsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
