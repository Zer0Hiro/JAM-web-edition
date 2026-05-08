import { getLocalContextChunks, generateAnswerFromChunks, getLocalContext } from './localKnowledgeSearch.js'

export async function sendJAMaiChatMessage({
  message,
  lessonId = null,
  code = null,
}) {
  // Search local knowledge base for relevant chunks
  let localChunks = []
  let localAnswer = ''
  let localKnowledgeContext = ''
  
  try {
    localChunks = getLocalContextChunks(message, 3)
    
    // Generate a direct answer from local chunks
    if (localChunks.length > 0) {
      localAnswer = generateAnswerFromChunks(localChunks, message)
      localKnowledgeContext = getLocalContext(message, 3)
    }
  } catch (error) {
    console.warn('Failed to retrieve local knowledge context:', error)
    // Continue without local context if search fails
  }

  const response = await fetch('/api/jamai/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      lessonId,
      code,
      localKnowledgeContext,
      localAnswer, // Send the generated answer from frontend
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || 'JAMai chat request failed')
  }

  return response.json()
}
