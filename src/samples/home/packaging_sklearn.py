import flama
from sklearn.neural_network import MLPClassifier

model = MLPClassifier(activation="tanh", hidden_layer_sizes=(10,))

# Training

flama.dump(model, "model.flm")
