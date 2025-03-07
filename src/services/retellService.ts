
// Diese Datei wird für die Kommunikation mit der RetellAI API verwendet
// Da wir einen Backend-Endpunkt für den Access Token benötigen, 
// simulieren wir diesen hier für Demo-Zwecke
// In einer Produktionsumgebung sollte dies auf einem sicheren Server erfolgen

// Retell API Key
const RETELL_API_KEY = "key_89e10c9fd4840038a07e4ad3e477";

// Simulierte Backend-Funktion, die einen Token zurückgibt
// In der Produktion sollte dies ein tatsächlicher API-Aufruf zu Ihrem Backend sein
export const createWebCall = async (assistantId: string) => {
  try {
    console.log(`Creating web call for assistant ID: ${assistantId}`);
    
    // In einer echten Implementierung würde hier ein API-Aufruf zum Backend erfolgen
    // Da wir dies direkt im Frontend für Demo-Zwecke tun, rufen wir die API direkt auf
    
    // Korrigierte URL mit /v1/ im Pfad
    const response = await fetch('https://api.retellai.com/v1/create-web-call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RETELL_API_KEY}`
      },
      body: JSON.stringify({
        llm_websocket_url: "wss://api.retellai.com/llm-websocket",
        assistant_id: assistantId,
      })
    });
    
    if (!response.ok) {
      // Verbesserte Fehlerprotokollierung
      console.error(`API Fehler: ${response.status} ${response.statusText}`);
      
      try {
        const errorData = await response.json();
        console.error("API Fehlerdetails:", errorData);
        throw new Error(`Retell API error: ${errorData.message || response.statusText}`);
      } catch (parseError) {
        // Falls die Antwort kein gültiges JSON ist
        const errorText = await response.text();
        console.error("API Fehlerantwort:", errorText);
        throw new Error(`Retell API error: ${response.statusText} - ${errorText.substring(0, 100)}...`);
      }
    }
    
    const data = await response.json();
    console.log("Call erfolgreich erstellt:", data.call_id);
    return {
      access_token: data.access_token,
      call_id: data.call_id
    };
  } catch (error) {
    console.error("Error creating web call:", error);
    throw error;
  }
};
