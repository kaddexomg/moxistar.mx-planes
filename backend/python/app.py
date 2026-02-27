from flask import Flask, jsonify, request

app = Flask(__name__)

PLANS = [
    {"id": "pro8", "name": "Pro 8", "gb": 8, "price": 199},
    {"id": "pro20", "name": "Pro 20", "gb": 20, "price": 299},
    {"id": "pro40", "name": "Pro 40", "gb": 40, "price": 429},
]


@app.get('/api/plans')
def list_plans():
    return jsonify({"plans": PLANS, "engine": "python-catalog-v1"})


@app.post('/api/recommend')
def recommend_plan():
    payload = request.get_json(force=True)
    usage_gb = int(payload.get('usage_gb', 0))
    roaming = bool(payload.get('roaming', False))

    selected = next((plan for plan in PLANS if plan['gb'] >= usage_gb), PLANS[-1])
    if roaming and selected['id'] != 'pro40':
        selected = PLANS[-1]

    return jsonify({
        'recommended_plan': selected,
        'reason': f'Consumo detectado {usage_gb} GB. Roaming={roaming}.',
        'engine': 'python-rules-v3'
    })


@app.post('/api/assistant')
def assistant():
    text = request.get_json(force=True).get('message', '').lower()
    if 'portabilidad' in text:
        answer = 'Solicita tu NIP al 051 y comparte tu número para iniciar la portabilidad.'
    elif 'recarga' in text:
        answer = 'Puedes recargar desde $100 MXN con tarjeta o transferencia.'
    else:
        answer = 'Puedo ayudarte con planes, equipos, recargas y cobertura Movistar.'

    return jsonify({'answer': answer, 'model': 'movistar-assistant-lite'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
