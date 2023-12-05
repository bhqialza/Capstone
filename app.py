import os
from flask import Flask, request, jsonify
from keras.preprocessing.image import load_img, img_to_array
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['ALLOWED_EXTENSIONS'] = set(['png', 'jpg', 'jpeg'])
app.config['UPLOAD_FOLDER'] = 'static/upload/'
app.config['MODEL_FILE'] = './xcep_35.h5'
app.config['CLASS_NAME'] = 'nama_kelas.npy'

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in app.config['ALLOWED_EXTENSIONS']

model = tf.keras.models.load_model(app.config['MODEL_FILE'])
class_names = np.load('./nama_kelas.npy', allow_pickle=True)


@app.route('/')
def hello_world():
    return 'TRASHART API UP AND RUNNING!'


@app.route('/predict', methods=['POST'])
def predict():
    imgFile = request.files.get('imgFile')

    if imgFile and allowed_file(imgFile.filename):
        filename = secure_filename(imgFile.filename)    
        imgFile.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
        img_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)

        img = load_img(img_path, target_size=(299, 299))
        img = img_to_array(img) / 255.
        img = np.expand_dims(img, axis=0)

        prediction = model.predict(img)

        top_class = np.argmax(prediction)
        top_prob = prediction[0][top_class]

        return jsonify({
            "status": {
                "code": 200,
                "message": "Success predicting"
            },
            "result": {
                "class": class_names[top_class],
                "confidence": float(top_prob)
            }
        })

    return jsonify({
        "status": {
            "code": 400,
            "message": "No image uploaded"
        }
    })

