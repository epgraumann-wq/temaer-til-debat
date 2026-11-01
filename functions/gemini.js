export async function onRequestPost(context) {

  const apiKey = context.env.OPENROUTER_API_KEY;

  const body = await context.request.json();

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: body.messages || []
      })
    }
  );

  const data = await response.json();

  return Response.json({
    reply:
      data?.choices?.[0]?.message?.content ||
      data?.error?.message ||
      "Intet svar"
  });

}
