import flama
import torch


class Model(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.l1 = torch.nn.Linear(2, 10)
        self.l2 = torch.nn.Linear(10, 1)

    def forward(self, x):
        x = torch.tanh(self.l1(x))
        return torch.sigmoid(self.l2(x))


model = Model()

# Training

flama.dump(model, "model.flm")
