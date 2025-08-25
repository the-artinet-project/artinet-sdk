export interface message {
  role: "user" | "assistant" | "system";
  content: string;
}

export type session = message[];

export interface connectAPIRequest {
  identifier: string;
  session: session;
  preferredEndpoint: string;
  options: {
    isAuthRequired: boolean;
    isFallbackAllowed: boolean;
    params?: {
      [key: string]: any;
    };
  };
}

export interface connectAPIResponse {
  agentResponse: string;
  systemMessage?: string;
  error?: any;
}

export async function apiConnect(request: connectAPIRequest): Promise<string> {
  try {
    const restResponse: any = await fetch(`https://api.artinet.io/connect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(request),
    });

    if (!restResponse.ok) {
      throw new Error("Failed to fetch agent response");
    }

    const bodyJson = await restResponse.json();
    const innerResponse = JSON.parse(bodyJson.body);
    const agentResponseArray = JSON.parse(innerResponse.agentResponse);
    return agentResponseArray[0]?.generated_text;
  } catch (error: any) {
    console.error("Error fetching agent response:", error);
    return `client-error: unfortunately, this agent is currently experiencing issues. please try again later.`;
  }
}
