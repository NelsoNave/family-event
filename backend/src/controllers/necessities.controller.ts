import { Request, Response } from "express";
import eventModel from "../models/event.model";
import necessitiesModel from "../models/necessities.model";

const getNessities = async (
  req: Request<{ event_id: string }>,
  res: Response,
) => {
  try {
    const eventId = Number(req.params.event_id);

    const nessitiesInfo = await necessitiesModel.fetchNecessities(eventId);
    const nessities = nessitiesInfo.necessities;
    const noteForNecessities =
      nessitiesInfo.noteForNecessities?.noteForNecessities;

    res.status(200).json({ data: { nessities, noteForNecessities } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to get Nessities" });
  }
};

const addNewNessitiesInfo = async (
  req: Request<{ event_id: string }>,
  res: Response,
) => {
  try {
    const eventId = Number(req.params.event_id);
    const newNessitiesList = req.body.necessities;
    const newNote = req.body.noteForNecessities;

    const result = await eventModel.createNewNecessitiesInfo(
      eventId,
      newNessitiesList,
      newNote,
    );

    const nessities = result.necessities;
    const noteForNecessities = result.updatedNote?.noteForNecessities;

    res.status(200).json({ data: { nessities, noteForNecessities } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to create Nessities" });
  }
};

export default {
  getNessities,
  addNewNessitiesInfo,
};
