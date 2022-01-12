import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());

app.use('/admin', (req, res) => {
    res.send({
      token: 'You are logged in!'
    });
  });

  app.listen(8080, () => console.log('API is running on http://localhost:8080/admin'));