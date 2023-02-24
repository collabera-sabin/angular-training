import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudReadComponent } from './crud-read.component';

describe('CrudReadComponent', () => {
  let component: CrudReadComponent;
  let fixture: ComponentFixture<CrudReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
