import { TestBed } from "@angular/core/testing";
import { CallInterfaceComponent } from "../modules/call-interface/call-interface.component";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

describe('CallInterfaceComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CallInterfaceComponent], // Ensure the component is standalone or its module is imported
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              params: of({ id: '123' }),
            },
          },
        ],
      }).compileComponents();
      
    });
  
    it('should toggle micEnabled whenn toggleMic is called', () => {
      const fixture = TestBed.createComponent(CallInterfaceComponent);
      const component = fixture.componentInstance;
  
      expect(component['micEnabled']).toBe(false);
  
      component.toggleMic();
  
      expect(component['micEnabled']).toBe(true);
    });
  
   
  it('should call hangUp and update micEnabled', () => {
    const fixture = TestBed.createComponent(CallInterfaceComponent);
    const component = fixture.componentInstance;

    // Call the hangUp method directly
    component.hangUp();

    // Check the expected side effects of calling hangUp
    expect(component['micEnabled']).toBe(false); // Check if micEnabled has been set to false
  });
  
    // Add more test cases as needed
  });
  