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

    res.status(200).json({
      success: true,
      message: "added necessities successfully!",
      data: { necessities, noteForNecessities },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to create Necessities" });
  }
};

const updateNecessitiesInfo = async (
  req: Request<{ event_id: string }>,
  res: Response,
) => {
  try {
    const eventId = Number(req.params.event_id);
    const necessitiesList = req.body.necessities;
    const newNote = req.body.noteForNecessities;

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

    const result = await eventModel.updateNewNecessities(
      eventId,
      newNote,
      newNecessitiesList,
      updateNecessitiesList,
      deleteNecessitiesList,
    );

    const necessities = result.necessities;
    const noteForNecessities = result.note;

    res.status(200).json({
      success: true,
      message: "updated necessities successfully!",
      data: { necessities, noteForNecessities },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to update Necessities" });
  }
};

export default {
  getNecessities,
  addNewNecessitiesInfo,
  updateNecessitiesInfo,
};
