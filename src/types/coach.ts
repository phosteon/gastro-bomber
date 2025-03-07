
export interface Coach {
  name: string;
  subtitle: string;
  assistantId: string; // Dies wird intern verwendet
  agent_id: string; // Dies entspricht dem "agent_id" in der V2 API
  avatarUrl: string;
  packages: {
    community: CoachPackage;
    premium: CoachPackage;
  };
}

export interface CoachPackage {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}
