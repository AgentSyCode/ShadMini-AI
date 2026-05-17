import { NextRequest } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const SUPPORTED_MODELS = [
  'gpt-4o-mini',
  'deepseek-r1',
  'Llama-3.3-70B-Instruct',
  'Mistral-Large-2411',
  'Phi-4',
  'Codestral-2501',
  'gemini-2.0-flash-001',
  'o1-mini',
  'cohere-command-r-plus',
];

export async function POST(req: NextRequest) {
  try {
    const { model, messages } = await req.json();

    if (!GITHUB_TOKEN) {
      return new Response(JSON.stringify({ error: 'Missing GITHUB_TOKEN' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!model || !SUPPORTED_MODELS.includes(model)) {
      return new Response(JSON.stringify({ error: 'Invalid model' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiUrl = 'https://models.inference.ai.azure.com/chat/completions?api-version=2024-05-01-preview';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        max_tokens: 2048,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return new Response(JSON.stringify({ error }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
