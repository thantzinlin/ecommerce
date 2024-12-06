import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCancellationComponent } from './my-cancellation.component';

describe('MyCancellationComponent', () => {
  let component: MyCancellationComponent;
  let fixture: ComponentFixture<MyCancellationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCancellationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
