import flama
import tensorflow as tf

model = tf.keras.models.Sequential(
    [
        tf.keras.layers.Dense(10, activation="tanh", input_shape=(2,)),
        tf.keras.layers.Dense(1, activation="sigmoid"),
    ]
)
model.compile(optimizer="adam", loss="mse")

# Training

flama.dump(model, "model.flm")
