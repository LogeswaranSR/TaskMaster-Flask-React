from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI']='mysql://root:14061703@localhost:3306/test'

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Todo(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    content=db.Column(db.String(200),nullable=False)
    completed=db.Column(db.Integer, default=0)
    date_created=db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return '<Task %r>' % self.id
    
class ToDoSchema(ma.Schema):
    class Meta:
        fields = ('id', 'content', 'completed', 'date_created')

todoSchema = ToDoSchema()
todomanySchema = ToDoSchema(many=True)

@app.route("/")
def get_tasks():
    try:
        tasks=Todo.query.order_by(Todo.date_created).all()
        data = todomanySchema.dump(tasks)
        return jsonify(data)
    except:
        return jsonify({"Error":"There was an error in fetching the data"})


@app.route("/add", methods=['POST'])
def add_task():
    task_content=request.json["content"]

    newtask = Todo(content=task_content)
    db.session.add(newtask)
    db.session.commit()

    return todoSchema.jsonify(newtask)

@app.route('/get/<id>')
def send_task(id):
    task = Todo.query.get(id)
    return todoSchema.jsonify(task)

@app.route('/update/<id>', methods=["PUT"])
def update_task(id):
    task = Todo.query.get(id)
    task.content = request.json['content']

    db.session.commit()
    return todoSchema.jsonify(task)

@app.route('/delete/<id>', methods=['DELETE'])
def delete_task(id):
    task = Todo.query.get(id)
    db.session.delete(task)
    db.session.commit()

    return todoSchema.jsonify(task)

if __name__=="__main__":
    app.run(debug=True)