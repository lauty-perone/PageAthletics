import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSeriesComponent } from './create-series.component';

describe('CreateSeriesComponent', () => {
  let component: CreateSeriesComponent;
  let fixture: ComponentFixture<CreateSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSeriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
