import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalContactComponent } from './portal-contact.component';

describe('PortalContactComponent', () => {
  let component: PortalContactComponent;
  let fixture: ComponentFixture<PortalContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
