import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComapnySetup } from './comapny-setup';

describe('ComapnySetup', () => {
  let component: ComapnySetup;
  let fixture: ComponentFixture<ComapnySetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComapnySetup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComapnySetup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
