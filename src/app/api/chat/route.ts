import Anthropic from '@anthropic-ai/sdk';
import { SCHOOL_SYSTEM_PROMPT } from '@/lib/school-data';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequestBody {
  messages: ChatMessage[];
}

export async function POST(request: Request): Promise<Response> {
  // Validate API key
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  // Parse and validate request body
  let body: ChatRequestBody;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    );
  }

  if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return Response.json(
      { error: 'Messages array is required and must not be empty' },
      { status: 400 }
    );
  }

  // Validate each message has required fields
  for (const msg of body.messages) {
    if (!msg.role || !msg.content || typeof msg.content !== 'string') {
      return Response.json(
        { error: 'Each message must have a valid role and content string' },
        { status: 400 }
      );
    }
    if (msg.role !== 'user' && msg.role !== 'assistant') {
      return Response.json(
        { error: 'Message role must be "user" or "assistant"' },
        { status: 400 }
      );
    }
  }

  // Limit to last 10 messages to manage context window
  const validatedMessages = body.messages.slice(-10);

  const client = new Anthropic();

  const stream = client.messages.stream({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 600,
    system: SCHOOL_SYSTEM_PROMPT,
    messages: validatedMessages,
  });

  const encoder = new TextEncoder();

  const readableStream = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
            );
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Stream failed';
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ error: errorMessage })}\n\n`
          )
        );
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      }
    },
  });

  return new Response(readableStream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
