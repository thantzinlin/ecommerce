import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsImgSliderComponent } from './product-details-img-slider.component';

describe('ProductDetailsImgSliderComponent', () => {
  let component: ProductDetailsImgSliderComponent;
  let fixture: ComponentFixture<ProductDetailsImgSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsImgSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductDetailsImgSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
