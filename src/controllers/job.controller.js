const Job = require("../models/job.model");

exports.create = (req, res) => {
  const { name } =
    req.body;
  const newJob = new Job({
    name
  });
  newJob
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
