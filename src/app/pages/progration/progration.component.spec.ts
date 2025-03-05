import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrationComponent } from './progration.component';

describe('ProgrationComponent', () => {
  let component: ProgrationComponent;
  let fixture: ComponentFixture<ProgrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
