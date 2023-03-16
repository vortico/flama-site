import flama
import tensorflow as tf

model = tf.keras.models.Sequential(
    [
        tf.keras.layers.Flatten(input_shape=(2,)),
        tf.keras.layers.Dense(10, activation="tanh"),
        tf.keras.layers.Dense(1, activation="sigmoid"),
    ]
)

model.compile(optimizer="adam", loss="mse")
model.fit(
    np.array([[0, 0], [0, 1], [1, 0], [1, 1]]),
    np.array([[0], [1], [1], [0]]),
    epochs=2000,
    verbose=0,
)

flama.dump(model, "tensorflow_model.flm")