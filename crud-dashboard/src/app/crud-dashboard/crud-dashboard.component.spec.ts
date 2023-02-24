import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDashboardComponent } from './crud-dashboard.component';

describe('CrudDashboardComponent', () => {
  let component: CrudDashboardComponent;
  let fixture: ComponentFixture<CrudDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
