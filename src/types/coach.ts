
export interface Coach {
  name: string;
  subtitle: string;
  assistantId: string; // Dies wird intern verwendet
  agent_id: string; // Dies entspricht dem "agent_id" in der V2 API
  avatarUrl: string;
}
