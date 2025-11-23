/**
 * VAPI SDK Types
 * Type definitions for VAPI integration
 */

export interface VapiVariables {
  name: string;
  email: string;
  company: string;
  role: string;
  phone: string;
  callSource: string;
}

export interface VapiAssistantOverrides {
  variableValues: VapiVariables;
}

export interface VapiCallStartMessage {
  type: 'call-started';
  call?: {
    id: string;
  };
}

export type VapiEventType =
  | 'call-start'
  | 'call-end'
  | 'speech-start'
  | 'speech-end'
  | 'message'
  | 'error';

export interface VapiEventHandlers {
  onCallStart?: () => void;
  onCallEnd?: () => void;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onMessage?: (message: any) => void;
  onError?: (error: Error) => void;
}
