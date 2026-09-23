export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { system, brief } = req.body || {};
  if (!brief || typeof brief !== 'string' || brief.length > 8000) {
    return res.status(400).json({ error: 'Datos de campaña inválidos' });
  }

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 1500,
        system: system,
        messages: [
          { role: 'user', content: '--- DATOS DE CAMPAÑA ---\n' + brief }
        ]
      })
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      return res.status(502).json({ error: 'Error de la API de Anthropic', detail: errText });
    }

    const data = await anthropicRes.json();
    const textBlock = (data.content || []).find(b => b.type === 'text');
    const raw = textBlock ? textBlock.text : '{}';
    const clean = raw.replace(/```json|```/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch (e) {
      return res.status(502).json({ error: 'La respuesta no vino en JSON válido', raw: clean });
    }

    return res.status(200).json(parsed);
  } catch (e) {
    return res.status(500).json({ error: 'Error interno', detail: String(e) });
  }
}
