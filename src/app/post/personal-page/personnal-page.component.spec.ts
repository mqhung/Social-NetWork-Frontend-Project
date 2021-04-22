import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnalPageComponent } from './personnal-page.component';

describe('PersonnalPageComponent', () => {
  let component: PersonnalPageComponent;
  let fixture: ComponentFixture<PersonnalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnalPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
