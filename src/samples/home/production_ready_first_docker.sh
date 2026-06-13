docker run -d \
  --name flama \
  -p 8000:8000 \
  -v /path/to/model.flm:/models/model \
  vortico/flama
