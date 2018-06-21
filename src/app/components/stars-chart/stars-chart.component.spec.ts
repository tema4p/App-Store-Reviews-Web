import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsChartComponent } from './stars-chart.component';

describe('StarsChartComponent', () => {
  let component: StarsChartComponent;
  let fixture: ComponentFixture<StarsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
