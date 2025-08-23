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

//todo well formatted query and response objects
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
    // console.debug("restResponse: ", restResponse);

    if (!restResponse.ok) {
      throw new Error("Failed to fetch agent response");
    }

    const bodyJson = await restResponse.json();
    const innerResponse = JSON.parse(bodyJson.body);
    // console.debug("innerResponse:", innerResponse);

    // Now, parse the agentResponse string to get the array
    const agentResponseArray = JSON.parse(innerResponse.agentResponse);
    //console.debug("agentResponseArray:", agentResponseArray);

    // Finally, get the generated_text from the first item in the array
    const generatedText = agentResponseArray[0]?.generated_text;
    //console.debug("Generated text:", generatedText);
    return generatedText;
  } catch (error: any) {
    console.error("Error fetching agent response:", error);
    return `client-error: unfortunately, this agent is currently experiencing issues. please try again later.`;
  }
}
