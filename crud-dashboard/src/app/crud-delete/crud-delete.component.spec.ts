import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDeleteComponent } from './crud-delete.component';

describe('CrudDeleteComponent', () => {
  let component: CrudDeleteComponent;
  let fixture: ComponentFixture<CrudDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
