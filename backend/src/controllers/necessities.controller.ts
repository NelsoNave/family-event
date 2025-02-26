import { Request, Response } from "express";
import eventModel from "../models/event.model";
import necessitiesModel from "../models/necessities.model";

type Necessity = { id?: number | null; item: string };

const getNecessities = async (
  req: Request<{ event_id: string }>,
  res: Response,
) => {
  try {
    const eventId = Number(req.params.event_id);

    const necessitiesInfo = await necessitiesModel.fetchNecessities(eventId);
    const necessities = necessitiesInfo.necessities;
    const noteForNecessities =
      necessitiesInfo.noteForNecessities?.noteForNecessities;

    res.status(200).json({ data: { necessities, noteForNecessities } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to get Necessities" });
  }
};

const addNewNecessitiesInfo = async (
  req: Request<{ event_id: string }>,
  res: Response,
) => {
  try {
    const eventId = Number(req.params.event_id);
    const newNecessitiesList = req.body.necessities;
    const newNote = req.body.noteForNecessities;

    const result = await eventModel.createNewNecessitiesInfo(
      eventId,
      newNecessitiesList,
      newNote,
    );

    const necessities = result.necessities;
    const noteForNecessities = result.updatedNote?.noteForNecessities;

    res.status(200).json({ data: { necessities, noteForNecessities } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to create Necessities" });
  }
};

const updateNecessities = async (
  req: Request<{ event_id: string }>,
  res: Response,
) => {
  try {
    //lock

    const eventId = Number(req.params.event_id);
    const necessitiesList = req.body.necessities;

    const newNecessitiesList = necessitiesList.filter(
      (necessity: Necessity) => !necessity.id,
    );
    const updateOrDeleteList = necessitiesList.filter(
      (necessity: Necessity) => necessity.id,
    );

    const existingNecessitiesList = (
      await necessitiesModel.fetchNecessities(eventId)
    ).necessities;

    const updateNecessitiesList = updateOrDeleteList.filter(
      (necessity: Necessity) =>
        existingNecessitiesList.some(
          (exNecessity: Necessity) => exNecessity.id === necessity.id,
        ),
    );

    const deleteNecessitiesList = existingNecessitiesList.filter(
      (necessity: Necessity) =>
        updateOrDeleteList.some(
          (newNecessity: Necessity) => newNecessity.id !== necessity.id,
        ),
    );

    console.log(newNecessitiesList);
    console.log(updateNecessitiesList);
    console.log(deleteNecessitiesList);

    res.status(200).json({});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to create Necessities" });
  }
};

export default {
  getNecessities,
  addNewNecessitiesInfo,
  updateNecessities,
};
