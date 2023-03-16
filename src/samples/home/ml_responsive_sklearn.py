import flama
from sklearn.neural_network import MLPClassifier

model = MLPClassifier(activation="tanh", max_iter=2000, hidden_layer_sizes=(10,))
model.fit(
    np.array([[0, 0], [0, 1], [1, 0], [1, 1]]),
    np.array([0, 1, 1, 0]),
)

flama.dump(model, "sklearn_model.flm")