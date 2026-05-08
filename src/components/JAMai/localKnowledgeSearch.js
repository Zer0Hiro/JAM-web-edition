/**
 * JAMai Local Knowledge Search
 * 
 * Builds a searchable knowledge base from:
 * - English lessons (src/lessons/)
 * - Hebrew lessons (src/lessons/he/)
 * - Local JAMai knowledge chunks (music, synthesis, DSL, electronics, troubleshooting)
 * 
 * Supports different data shapes:
 * - lesson objects with id, title, goal, concepts, steps, code, challenges, etc.
 * - knowledge arrays of chunks with id, title, content, snippets, etc.
 * - flexible field handling (doesn't crash if a field is missing)
 */

import { lessons as lessonsEn } from '../../lessons/index.js'
import { lessons as lessonsHe } from '../../lessons/he/index.js'
import { jamaiKnowledgeChunks } from '../../lessons/index.js'

/**
 * Safely convert any value to a string for searching.
 * Handles: strings, numbers, arrays, objects, null, undefined.
 */
function valueToString(val) {
  if (val === null || val === undefined) return ''
  if (typeof val === 'string') return val
  if (typeof val === 'number') return String(val)
  if (Array.isArray(val)) {
    return val
      .map(v => valueToString(v))
      .filter(s => s.length > 0)
      .join(' ')
  }
  if (typeof val === 'object') {
    return Object.values(val)
      .map(v => valueToString(v))
      .filter(s => s.length > 0)
      .join(' ')
  }
  return ''
}

/**
 * Build a searchable text block from a lesson.
 * Extracts: title, subtitle, goal, concepts, steps (content + title), code, challenges.
 */
function lessonToChunks(lesson, lang = 'en') {
  if (!lesson || typeof lesson !== 'object') return []

  const chunks = []
  const {
    id,
    slug,
    title,
    subtitle,
    goal,
    concepts,
    estimatedMinutes,
    steps,
    code,
    challenges,
    funFact,
  } = lesson

  // Main lesson chunk
  const mainText = [
    title || '',
    subtitle || '',
    goal || '',
    valueToString(concepts),
  ]
    .filter(s => s && s.trim())
    .join(' | ')

  if (mainText.trim()) {
    chunks.push({
      id: `lesson-${id}-main-${lang}`,
      type: 'lesson',
      language: lang,
      title: title || 'Untitled lesson',
      lessonId: id,
      slug: slug,
      text: mainText,
      snippet: `${title}: ${goal || subtitle || ''}`.substring(0, 200),
      concepts: concepts || [],
      goal: goal || '',
    })
  }

  // Steps chunks
  if (Array.isArray(steps)) {
    steps.forEach((step, idx) => {
      if (step && typeof step === 'object') {
        const stepText = [step.title || '', step.content || '']
          .filter(s => s && s.trim())
          .join(' ')

        if (stepText.trim()) {
          chunks.push({
            id: `lesson-${id}-step-${idx}-${lang}`,
            type: 'lesson-step',
            language: lang,
            title: step.title || `Step ${idx + 1}`,
            lessonId: id,
            text: stepText,
            snippet: stepText.substring(0, 200),
          })
        }
      }
    })
  }

  // Code chunk (with JEM examples)
  if (code && typeof code === 'string' && code.trim()) {
    chunks.push({
      id: `lesson-${id}-code-${lang}`,
      type: 'lesson-code',
      language: lang,
      title: `${title} - Example code`,
      lessonId: id,
      text: `Code: ${code}`,
      snippet: code.substring(0, 200),
    })
  }

  // Challenges chunks
  if (Array.isArray(challenges)) {
    challenges.forEach((challenge, idx) => {
      const challengeText = valueToString(challenge)
      if (challengeText.trim()) {
        chunks.push({
          id: `lesson-${id}-challenge-${idx}-${lang}`,
          type: 'lesson-challenge',
          language: lang,
          title: `${title} - Challenge ${idx + 1}`,
          lessonId: id,
          text: challengeText,
          snippet: challengeText.substring(0, 200),
        })
      }
    })
  }

  // Fun fact
  if (funFact && typeof funFact === 'string' && funFact.trim()) {
    chunks.push({
      id: `lesson-${id}-funfact-${lang}`,
      type: 'lesson-funfact',
      language: lang,
      title: `${title} - Fun fact`,
      lessonId: id,
      text: funFact,
      snippet: funFact.substring(0, 200),
    })
  }

  return chunks
}

/**
 * Build searchable chunks from knowledge arrays/objects.
 * Handles different knowledge shapes: arrays of objects, single objects, nested structures.
 */
function knowledgeToChunks(knowledge) {
  if (!knowledge) return []

  const chunks = []

  // If it's an array of knowledge items, process each one
  if (Array.isArray(knowledge)) {
    knowledge.forEach((item, idx) => {
      if (item && typeof item === 'object') {
        const { id, title, tags, level, summary, content, text, snippet, ...rest } = item

        // Build searchable text from all non-field properties
        const textParts = [
          title || '',
          summary || content || text || '',
          valueToString(tags),
          valueToString(rest),
        ]
          .filter(s => s && s.trim())
          .join(' ')

        if (textParts.trim()) {
          chunks.push({
            id: id || `knowledge-${idx}`,
            type: 'knowledge',
            title: title || `Knowledge item ${idx}`,
            text: textParts,
            snippet: (snippet || summary || text || content || '').substring(0, 200),
            tags: tags || [],
            level: level || 'intermediate',
          })
        }
      }
    })
  } else if (typeof knowledge === 'object') {
    // Single knowledge object
    const { id, title, tags, level, summary, content, text, ...rest } = knowledge
    const textParts = [
      title || '',
      summary || content || text || '',
      valueToString(tags),
      valueToString(rest),
    ]
      .filter(s => s && s.trim())
      .join(' ')

    if (textParts.trim()) {
      chunks.push({
        id: id || 'knowledge-single',
        type: 'knowledge',
        title: title || 'Knowledge item',
        text: textParts,
        snippet: (summary || text || content || '').substring(0, 200),
        tags: tags || [],
        level: level || 'intermediate',
      })
    }
  }

  return chunks
}

/**
 * Build the complete searchable knowledge base.
 * Returns an array of all chunks from:
 * - English lessons
 * - Hebrew lessons
 * - Local knowledge chunks
 */
export function buildKnowledgeBase() {
  const allChunks = []

  // Add English lessons
  if (Array.isArray(lessonsEn)) {
    lessonsEn.forEach(lesson => {
      allChunks.push(...lessonToChunks(lesson, 'en'))
    })
  }

  // Add Hebrew lessons
  if (Array.isArray(lessonsHe)) {
    lessonsHe.forEach(lesson => {
      allChunks.push(...lessonToChunks(lesson, 'he'))
    })
  }

  // Add knowledge chunks
  if (Array.isArray(jamaiKnowledgeChunks)) {
    allChunks.push(...knowledgeToChunks(jamaiKnowledgeChunks))
  }

  return allChunks
}

/**
 * Simple keyword search against knowledge base.
 * Splits query into keywords and finds chunks matching any keyword.
 * Returns chunks sorted by relevance (number of keyword matches).
 */
function simpleKeywordSearch(chunks, query, topK = 5) {
  if (!query || query.trim().length === 0) return []

  const queryLower = query.toLowerCase()
  const keywords = queryLower
    .split(/\s+/)
    .filter(k => k.length > 2) // ignore very short words
    .slice(0, 10) // limit to 10 keywords to avoid explosion

  const scored = chunks.map(chunk => {
    const textLower = (chunk.text || '').toLowerCase()
    const titleLower = (chunk.title || '').toLowerCase()

    // Count keyword matches in title (higher weight) and text
    let score = 0
    keywords.forEach(keyword => {
      if (titleLower.includes(keyword)) score += 3
      if (textLower.includes(keyword)) score += 1
    })

    return { chunk, score }
  })

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(({ chunk }) => chunk)
}

/**
 * Search the knowledge base and return relevant chunks.
 * 
 * @param {string} query - Search query (e.g., "How do I connect the potentiometer?")
 * @param {number} topK - Number of top results to return (default 5)
 * @returns {Array} Array of relevant knowledge chunks
 */
export function searchLocalKnowledge(query, topK = 5) {
  try {
    const knowledgeBase = buildKnowledgeBase()
    return simpleKeywordSearch(knowledgeBase, query, topK)
  } catch (error) {
    console.warn('Error searching local knowledge:', error)
    return []
  }
}

/**
 * Generate a conversational answer from retrieved chunks.
 * Extracts key information and creates a helpful response.
 * Properly formats code examples and key concepts.
 * 
 * @param {Array} chunks - Search result chunks
 * @param {string} query - Original user query (for context)
 * @returns {string} Generated answer as markdown
 */
export function generateAnswerFromChunks(chunks, query = '') {
  if (!chunks || chunks.length === 0) return ''

  const answer = []
  const codeBlocks = new Set()
  const keyPoints = []
  const lessons = new Set()

  // Process chunks by type to extract all useful information
  chunks.forEach((chunk, idx) => {
    if (!chunk) return

    // Collect lesson titles for attribution
    if (chunk.type && chunk.type.startsWith('lesson')) {
      if (chunk.title && chunk.title.length > 0) {
        lessons.add(chunk.title)
      }
    }

    // Extract code examples separately for better formatting
    if (chunk.type === 'lesson-code' || (chunk.text && chunk.text.includes('BPM'))) {
      const codeText = chunk.text.replace(/^Code:\s*/i, '').trim()
      if (codeText && codeText.length > 0) {
        codeBlocks.add(codeText)
      }
    }

    // Extract all key information
    if (chunk.goal && chunk.goal.length > 0) {
      keyPoints.push(chunk.goal)
    }
    if (chunk.snippet && chunk.snippet.length > 0 && !keyPoints.includes(chunk.snippet)) {
      keyPoints.push(chunk.snippet)
    }

    // Add step/challenge/other content
    if (chunk.type === 'lesson-step' && chunk.text && chunk.text.length > 3) {
      keyPoints.push(chunk.text.substring(0, 150))
    }

    // Add knowledge content
    if (chunk.type === 'knowledge' && chunk.text && chunk.text.length > 3) {
      keyPoints.push(chunk.text.substring(0, 200))
    }

    // Add concept lists
    if (chunk.concepts && Array.isArray(chunk.concepts) && chunk.concepts.length > 0) {
      chunk.concepts.forEach(c => {
        if (c && typeof c === 'string' && c.length > 0) {
          keyPoints.push(c)
        }
      })
    }
  })

  // Build answer from collected information

  // 1. Start with the most relevant title or first chunk info
  const firstChunk = chunks[0]
  if (firstChunk && firstChunk.title) {
    answer.push(`**${firstChunk.title}**`)
  }

  // 2. Add goal/main concept
  if (firstChunk && firstChunk.goal) {
    answer.push(firstChunk.goal)
  }

  // 3. Add main points (deduplicated and limited)
  const uniquePoints = keyPoints
    .filter((p, idx, arr) => p && typeof p === 'string' && p.length > 5 && arr.indexOf(p) === idx)
    .slice(0, 4)

  if (uniquePoints.length > 0) {
    // If we have multiple points, format as a list; otherwise just add the text
    if (uniquePoints.length > 1) {
      answer.push('**Key points:**')
      uniquePoints.forEach(point => {
        answer.push(`- ${point}`)
      })
    } else {
      answer.push(uniquePoints[0])
    }
  }

  // 4. Add concepts summary if available
  if (firstChunk && firstChunk.concepts && Array.isArray(firstChunk.concepts) && firstChunk.concepts.length > 0) {
    const conceptList = firstChunk.concepts.join(', ')
    answer.push(`**Concepts:** ${conceptList}`)
  }

  // 5. Add code examples (properly formatted as JEM)
  if (codeBlocks.size > 0) {
    answer.push('**Example code:**')
    const codeArray = Array.from(codeBlocks)
    codeArray.slice(0, 1).forEach(code => {
      const truncated = code.length > 400 ? code.substring(0, 400) + '\n...' : code
      answer.push('```jem\n' + truncated + '\n```')
    })
  }

  // 6. Add lesson reference(s) for context
  if (lessons.size > 0) {
    const lessonList = Array.from(lessons).slice(0, 2).join(', ')
    answer.push(`**From:** ${lessonList}`)
  }

  // Build final answer, filtering out empty strings
  const finalAnswer = answer
    .filter(s => s && typeof s === 'string' && s.trim().length > 0)
    .join('\n\n')

  // Return the answer if it has meaningful content
  return finalAnswer || ''
}

/**
 * Format search results into a readable context string for the backend.
 * Also used as fallback when frontend answer generation is not sufficient.
 * 
 * @param {Array} chunks - Search result chunks
 * @returns {string} Formatted context text
 */
export function formatContextFromChunks(chunks) {
  if (!chunks || chunks.length === 0) return ''

  return chunks
    .map(chunk => {
      const parts = []
      if (chunk.title) parts.push(`**${chunk.title}**`)
      if (chunk.snippet) parts.push(chunk.snippet)
      if (chunk.concepts && Array.isArray(chunk.concepts) && chunk.concepts.length > 0) {
        parts.push(`Concepts: ${chunk.concepts.join(', ')}`)
      }
      if (chunk.goal) parts.push(`Goal: ${chunk.goal}`)
      return parts.filter(p => p).join('\n')
    })
    .join('\n\n')
}

/**
 * Perform a complete local RAG search and return raw chunks (for frontend answer generation).
 * 
 * @param {string} query - Search query
 * @param {number} topK - Number of top results
 * @returns {Array} Array of relevant chunks
 */
export function getLocalContextChunks(query, topK = 3) {
  return searchLocalKnowledge(query, topK)
}

/**
 * Perform a complete local RAG search and return formatted context.
 * Used as backend fallback when frontend answer generation is not sufficient.
 * 
 * @param {string} query - Search query
 * @param {number} topK - Number of top results
 * @returns {string} Formatted context string for backend
 */
export function getLocalContext(query, topK = 3) {
  const chunks = searchLocalKnowledge(query, topK)
  return formatContextFromChunks(chunks)
}

export default {
  buildKnowledgeBase,
  searchLocalKnowledge,
  getLocalContextChunks,
  generateAnswerFromChunks,
  formatContextFromChunks,
  getLocalContext,
}
