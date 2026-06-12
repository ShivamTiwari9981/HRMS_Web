import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskQuery } from './ask-query';

describe('AskQuery', () => {
  let component: AskQuery;
  let fixture: ComponentFixture<AskQuery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskQuery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskQuery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
