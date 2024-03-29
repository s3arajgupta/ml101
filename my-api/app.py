from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
import numpy as np

app = Flask(__name__)
CORS(app)

# Load Iris dataset and train a simple model
iris = load_iris()
model = RandomForestClassifier()
model.fit(iris.data, iris.target)

def model_inference(input_data):
    # Convert input data to NumPy array for model prediction
    input_array = np.array(input_data).reshape(1, -1)
    prediction = model.predict(input_array)
    return iris.target_names[prediction][0]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    input_data = data.get("input")
    
    if not input_data or len(input_data) != 4:
        return jsonify({"error": "Invalid input"}), 400

    # Model prediction
    result = model_inference(input_data)
    return jsonify({"prediction": result})

if __name__ == '__main__':
    app.run(debug=True)
