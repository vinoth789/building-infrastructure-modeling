import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrscannerbimComponent } from './qrscannerbim.component';

describe('QrscannerbimComponent', () => {
  let component: QrscannerbimComponent;
  let fixture: ComponentFixture<QrscannerbimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrscannerbimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrscannerbimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
