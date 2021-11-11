from flask import Flask, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from base64 import b64decode
import uuid
import io
import re
from PIL import Image

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'upload_images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Database model
class User(db.Model):
  username = db.Column(db.String(200), primary_key=True)
  def __repr__(self):
    return '<User %r>' % self.username

@app.route('/register', methods=['POST'])
@cross_origin()
def signup():
  username = request.json['username']
  user = User.query.filter_by(username=username).first()
  if user == None:
    return jsonify({ 'user': username })
  else:
    return  jsonify({ 'user': '' })

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
  username = request.json['username']
  user = User.query.filter_by(username=username).first()
  if user == None:
    return jsonify({ 'user': '' })
  else:
    return jsonify({ 'user': username })

@app.route('/test-image', methods=['POST'])
def checkImage():
  message = request.get_json(force=True)
  encoded = message['image']  # image in base64 format
  user = message['username']
  image_data = re.sub('^data:image/.+;base64,', '', encoded)

  filename = f'{uuid.uuid4().hex}.jpeg'
  decoded = b64decode(image_data)
  image = Image.open(io.BytesIO(decoded))
  # conversion of image to byte image


if __name__ == '__main__':
  app.run(debug=True)