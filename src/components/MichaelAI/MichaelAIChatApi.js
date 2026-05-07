export async function sendMichaelAIChatMessage({
  message,
  lessonId = null,
  code = null,
}) {
  const response = await fetch('/api/michael-ai/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      lessonId,
      code,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || 'MichaelAI chat request failed')
  }

  return response.json()
}