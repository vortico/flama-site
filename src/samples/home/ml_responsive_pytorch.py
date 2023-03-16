import flama
import torch

class Model(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.l1 = torch.nn.Linear(2, 10)
        self.l2 = torch.nn.Linear(10, 1)

    def forward(self, x):
        x = torch.tanh(self.l1(x))
        x = torch.sigmoid(self.l2(x))
        return x

model = Model()
model.train()

flama.dump(model, "torch_model.flm")
