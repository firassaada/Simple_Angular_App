import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-call-interface',
  standalone: true,
  imports: [],
  templateUrl: './call-interface.component.html',
  styleUrl: './call-interface.component.scss'
})
export class CallInterfaceComponent implements OnInit {
  isCalling = false;
  micEnabled = false;
  agentName: string | null = null;
  phoneNumber: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Reliability Issue: No validation of params.get('name') and params.get('phone') could lead to null values.
    this.route.paramMap.subscribe(params => {
      this.agentName = params.get('name') || 'Unknown Agent';  // Reliability fix: Providing a default value if null
      this.phoneNumber = params.get('phone') || '';  // Reliability fix: Default empty string if no phone number provided
    });
  }

  async startCall() {
    try {
      // Security and Reliability Issue: No handling of rejected promises or checks for microphone permission
      await this.requestMicPermission();
      this.isCalling = true;
      this.micEnabled = true;
      // Logic for starting the call can be added here
    } catch (error) {
      console.error('Microphone permission denied', error);
      // Security Issue: Logging errors without proper error handling mechanism might leak sensitive info
      this.showError('Microphone permission denied. Please enable mic access to start the call.');
    }
  }

  hangUp() {
    this.isCalling = false;
    this.micEnabled = false;
    // Logic for hanging up the call can be added here
  }

  toggleMic() {
    this.micEnabled = !this.micEnabled;
    // Logic for enabling/disabling the mic can be added here
  }

  async requestMicPermission() {
    try {
      // Reliability Issue: Repeated code to request mic permissions in startCall and this method.
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the mic after permission is granted
    } catch (err) {
      throw new Error('Microphone permission denied');
    }
  }

  sanitizeImageSrc(): string {
    // Security Issue: Image source should be sanitized to avoid any XSS risk if user inputs image source
    return '';  // Sanitization logic should go here
  }

  // Duplication: Repeated logic for checking whether the user can start or hang up the call.
  canStartCall(): boolean {
    // Duplication Issue: The logic is overly simplistic; this could be improved by adding more real checks.
    return !this.isCalling;  // Returning simple check; could be enhanced to check other states (e.g., network status)
  }

  canHangUp(): boolean {
    // Duplication Issue: Similar to `canStartCall()`, this method could check if a hang-up action is allowed.
    return this.isCalling;  // Returning simple check; could include other considerations
  }

  // Security Issue: Avoid printing sensitive information or user data directly to the console
  showError(message: string) {
    // Add logic to display error messages to users in a UI-friendly way instead of logging to the console
    alert(message); // Display error in alert (better way could be used for UI-based alerts)
  }
}
