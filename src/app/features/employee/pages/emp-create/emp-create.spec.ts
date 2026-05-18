import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpCreate } from './emp-create';

describe('EmpCreate', () => {
  let component: EmpCreate;
  let fixture: ComponentFixture<EmpCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
