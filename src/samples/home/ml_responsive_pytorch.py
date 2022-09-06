import flama
import torch

class Model(torch.nn.Module):
    def forward(self, x):
        return x + 10

model = Model()
model.train()

with open("pytorch_model.flm", "wb") as f:
    flama.dump("pytorch", model, f)
