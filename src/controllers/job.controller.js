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

exports.delete = (req, res) => {
  Job.findByIdAndDelete(req.params.id).then((job) => {
    if(!job) {
      res.status(400).send({
        message: "Ce métier n'existe pas."
      })
    }
    res.send(job);
  });
};

exports.getAll = (_, res) => {
  Job.find().then((job) => {
    if(!job) {
      res.status(400).send({
        message: "Aucun métier existe."
      })
    }
    res.send(job);
  });
};

exports.update = (req, res) => {
  Job.findByIdAndUpdate(req.params.id, {name: req.body.name}).then((job) => {
    if (!job) {
      res.status(400).send({
        message: "Ce métier n'existe pas."
      })
    }
    res.send(job);
  })
}