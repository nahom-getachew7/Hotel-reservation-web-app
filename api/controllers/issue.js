import TrackingIssue from "../models/Issue.js";


  // Create a new issue
export const createIssue= async (req, res) => {
    try {
      const { assignedTo, description, status, priority } =
        req.body;

      const newTrackingIssue = new TrackingIssue({
        assignedTo,
        description,
        status,
        priority,
    });

      const savedIssue = await newTrackingIssue.save();
      res.status(201).json(savedIssue);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Get all issues
export const getAllIssues= async (req, res) => {
    try {
      const trackingIssues = await TrackingIssue.find();
      res.status(200).json(trackingIssues);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Get by id
export const getIssueById= async (req, res) => {
    try {
      const { id } = req.params;
      const trackingIssue = await TrackingIssue.findById(id);

      if (!trackingIssue) {
        return res.status(404).json({ error: "Tracking issue not found" });
      }

      res.status(200).json(trackingIssue);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Update by id
export const updateIssueById= async (req, res) => {
    try {
      const { id } = req.params;
      const { assignedTo, description, status, priority } =
        req.body;
      const updatedIssue = await TrackingIssue.findByIdAndUpdate(
        id,
        { assignedTo, description, status, priority },
        { new: true }
      );

      if (!updatedIssue) {
        return res.status(404).json({ error: "Tracking issue not found" });
      }

      res.status(200).json(updatedIssue);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Delete by id
export const deleteIssueById= async (req, res) => {
    try {
      const { id } = req.params;
      const deletedIssue = await TrackingIssue.findByIdAndDelete(id);

      if (!deletedIssue) {
        return res.status(404).json({ error: "Tracking issue not found" });
      }

      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }

};

module.exports = trackingIssueController;
