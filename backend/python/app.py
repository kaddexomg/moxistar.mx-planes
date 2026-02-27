from flask import Flask, request, jsonify

app = Flask(__name__)

PLANS = [
    {"id": "pro-start", "gb": 10, "price": 199},
    {"id": "pro-vision", "gb": 20, "price": 299},
    {"id": "pro-elite", "gb": 40, "price": 429},
]


@app.post('/api/recommend')
def recommend_plan():
    payload = request.get_json(force=True)
    usage_gb = int(payload.get('usage_gb', 0))

    selected = next((plan for plan in PLANS if plan['gb'] >= usage_gb), PLANS[-1])
    return jsonify({
        'recommended_plan': selected,
        'reason': f'Plan con capacidad mínima para {usage_gb} GB',
        'engine': 'python-rules-v2'
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
