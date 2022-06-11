import flama
from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(x_train, y_train)

with open("sk_model.flm", "wb") as f:
    flama.dump("sklearn", model, f)